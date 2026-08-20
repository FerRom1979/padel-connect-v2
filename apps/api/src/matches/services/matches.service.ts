import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { resolveVenue } from '../../common/venue/resolve-venue';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMatchDto } from '../dto/create-match.dto';
import { UpdateMatchDto } from '../dto/update-match.dto';
import { MatchQueryDto } from '../dto/match-query.dto';
import { MATCH_SIZE, PAGE_SIZE } from '../matches.constants';
import { matchDetailSelect } from '../selects/match-detail.select';

@Injectable()
export class MatchesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(organizerId: string, dto: CreateMatchDto) {
    const playedAt = new Date(dto.playedAt);

    if (playedAt.getTime() <= Date.now()) {
      throw new BadRequestException('El partido tiene que ser a futuro');
    }

    // El organizador ocupa uno de los cuatro lugares.
    const venue = await resolveVenue(this.prisma, dto);

    return this.prisma.match.create({
      data: {
        ...dto,
        ...venue,
        playedAt,
        organizerId,
        players: { create: { userId: organizerId } },
      },
      select: matchDetailSelect,
    });
  }

  /** Partidos futuros no cancelados. */
  async findAll(query: MatchQueryDto, userId: string) {
    const now = new Date();

    const matches = await this.prisma.match.findMany({
      where: {
        playedAt: query.past ? { lte: now } : { gt: now },
        cityId: query.cityId,
        clubId: query.clubId,
        // Un partido cancelado desaparece para todos menos para los que estaban
        // anotados: si no, te quedás esperando un partido que ya no existe.
        OR: [{ cancelledAt: null }, { players: { some: { userId } } }],
      },
      // Los pasados se leen del más reciente hacia atrás.
      orderBy: { playedAt: query.past ? 'desc' : 'asc' },
      select: matchDetailSelect,
      take: PAGE_SIZE + 1,
    });

    // ponytail: "tiene lugar libre" es COUNT(players) < 4, que Prisma no filtra en el where.
    // Con 100 filas alcanza de sobra; si una ciudad supera ese volumen, pasar a SQL crudo.
    // El filtro es para descubrir partidos: uno donde ya estás anotado nunca se esconde,
    // si no, al sumarte la tarjeta desaparece de la pantalla sin explicación.
    const isPlaying = (match: (typeof matches)[number]) =>
      match.players.some((player) => player.user.id === userId);

    let visible = query.onlyAvailable
      ? matches.filter(
          (match) => match.players.length < MATCH_SIZE || isPlaying(match),
        )
      : matches;

    if (query.mine) {
      visible = visible.filter(isPlaying);
    }

    // Se pide uno de más para saber si quedó algo afuera, sin contar toda la tabla.
    return {
      items: visible.slice(0, PAGE_SIZE),
      hasMore: visible.length > PAGE_SIZE,
    };
  }

  async findOne(id: string) {
    const match = await this.prisma.match.findUnique({
      where: { id },
      select: matchDetailSelect,
    });

    if (!match) {
      throw new NotFoundException('Partido no encontrado');
    }

    return match;
  }

  /**
   * Serializable aborta las transacciones en conflicto (Postgres 40001 -> Prisma P2034).
   * Ese error es esperado y reintentable: sin esto, dos personas tocando "Sumarme" a la vez
   * reciben un 500 y el lugar queda libre.
   */
  private async retryOnConflict<T>(run: () => Promise<T>, attempts = 5) {
    for (let attempt = 1; ; attempt++) {
      try {
        return await run();
      } catch (error) {
        const isConflict =
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === 'P2034';

        if (!isConflict || attempt >= attempts) {
          throw error;
        }

        await new Promise((resolve) => setTimeout(resolve, 15 * attempt));
      }
    }
  }

  async update(id: string, userId: string, dto: UpdateMatchDto) {
    const match = await this.prisma.match.findUnique({
      where: { id },
      select: { organizerId: true, cancelledAt: true, playedAt: true },
    });

    if (!match) {
      throw new NotFoundException('Partido no encontrado');
    }

    if (match.organizerId !== userId) {
      throw new ForbiddenException('Solo el organizador puede editar');
    }

    if (match.cancelledAt) {
      throw new BadRequestException('El partido está cancelado');
    }

    if (match.playedAt.getTime() <= Date.now()) {
      throw new BadRequestException('El partido ya pasó');
    }

    const playedAt = dto.playedAt ? new Date(dto.playedAt) : undefined;

    if (playedAt && playedAt.getTime() <= Date.now()) {
      throw new BadRequestException('El partido tiene que ser a futuro');
    }

    // La sede solo se recalcula si el editor mandó algo de sede.
    const venue =
      dto.clubId || dto.venueName || dto.cityId
        ? await resolveVenue(this.prisma, dto)
        : {};

    return this.prisma.match.update({
      where: { id },
      data: { ...dto, ...venue, playedAt },
      select: matchDetailSelect,
    });
  }

  async join(id: string, userId: string) {
    return this.retryOnConflict(() =>
      this.prisma.$transaction(
        async (tx) => {
          const match = await tx.match.findUnique({
            where: { id },
            select: {
              cancelledAt: true,
              playedAt: true,
              _count: { select: { players: true } },
              players: { where: { userId }, select: { userId: true } },
            },
          });

          if (!match) {
            throw new NotFoundException('Partido no encontrado');
          }

          if (match.cancelledAt) {
            throw new BadRequestException('El partido está cancelado');
          }

          if (match.playedAt.getTime() <= Date.now()) {
            throw new BadRequestException('El partido ya pasó');
          }

          if (match.players.length > 0) {
            throw new BadRequestException('Ya estás anotado en este partido');
          }

          if (match._count.players >= MATCH_SIZE) {
            throw new BadRequestException('El partido está completo');
          }

          await tx.matchPlayer.create({ data: { matchId: id, userId } });

          return tx.match.findUniqueOrThrow({
            where: { id },
            select: matchDetailSelect,
          });
        },
        { isolationLevel: 'Serializable' },
      ),
    );
  }

  async leave(id: string, userId: string) {
    const match = await this.prisma.match.findUnique({
      where: { id },
      select: { organizerId: true },
    });

    if (!match) {
      throw new NotFoundException('Partido no encontrado');
    }

    if (match.organizerId === userId) {
      throw new BadRequestException(
        'El organizador no puede salirse. Cancelá el partido.',
      );
    }

    const removed = await this.prisma.matchPlayer.deleteMany({
      where: { matchId: id, userId },
    });

    if (removed.count === 0) {
      throw new BadRequestException('No estabas anotado en este partido');
    }

    return this.findOne(id);
  }

  async cancel(id: string, userId: string) {
    const match = await this.prisma.match.findUnique({
      where: { id },
      select: { organizerId: true, cancelledAt: true },
    });

    if (!match) {
      throw new NotFoundException('Partido no encontrado');
    }

    if (match.organizerId !== userId) {
      throw new ForbiddenException('Solo el organizador puede cancelar');
    }

    if (match.cancelledAt) {
      return this.findOne(id);
    }

    return this.prisma.match.update({
      where: { id },
      data: { cancelledAt: new Date() },
      select: matchDetailSelect,
    });
  }
}
