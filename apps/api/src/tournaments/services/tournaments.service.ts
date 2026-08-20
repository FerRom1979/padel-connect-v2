import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { resolveVenue } from '../../common/venue/resolve-venue';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTournamentDto } from '../dto/create-tournament.dto';
import { RegisterTournamentDto } from '../dto/register-tournament.dto';
import { TournamentQueryDto } from '../dto/tournament-query.dto';
import { UpdateTournamentDto } from '../dto/update-tournament.dto';
import { PAGE_SIZE } from '../tournaments.constants';
import { tournamentSelect } from '../selects/tournament.select';

@Injectable()
export class TournamentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(organizerId: string, dto: CreateTournamentDto) {
    const startDate = new Date(dto.startDate);
    const endDate = dto.endDate ? new Date(dto.endDate) : null;

    if (startDate.getTime() <= Date.now()) {
      throw new BadRequestException('El torneo tiene que ser a futuro');
    }

    if (endDate && endDate < startDate) {
      throw new BadRequestException(
        'El torneo no puede terminar antes de empezar',
      );
    }

    const venue = await resolveVenue(this.prisma, dto);

    return this.prisma.tournament.create({
      data: { ...dto, ...venue, startDate, endDate, organizerId },
      select: tournamentSelect,
    });
  }

  async findAll(query: TournamentQueryDto, userId: string) {
    const now = new Date();

    const tournaments = await this.prisma.tournament.findMany({
      where: {
        // Un torneo cancelado desaparece salvo para quien ya se anotó.
        OR: [{ cancelledAt: null }, { registrations: { some: { userId } } }],
        startDate: query.past ? { lte: now } : { gt: now },
        cityId: query.cityId,
        clubId: query.clubId,
      },
      orderBy: { startDate: query.past ? 'desc' : 'asc' },
      select: tournamentSelect,
      take: PAGE_SIZE + 1,
    });

    const visible = query.mine
      ? tournaments.filter((tournament) =>
          tournament.registrations.some((entry) => entry.user.id === userId),
        )
      : tournaments;

    return {
      items: visible.slice(0, PAGE_SIZE),
      hasMore: visible.length > PAGE_SIZE,
    };
  }

  async update(id: string, userId: string, dto: UpdateTournamentDto) {
    const tournament = await this.prisma.tournament.findUnique({
      where: { id },
      select: {
        organizerId: true,
        cancelledAt: true,
        startDate: true,
        _count: { select: { registrations: true } },
      },
    });

    if (!tournament) {
      throw new NotFoundException('Torneo no encontrado');
    }

    if (tournament.organizerId !== userId) {
      throw new ForbiddenException('Solo el organizador puede editar');
    }

    if (tournament.cancelledAt) {
      throw new BadRequestException('El torneo está cancelado');
    }

    if (tournament.startDate.getTime() <= Date.now()) {
      throw new BadRequestException('El torneo ya empezó');
    }

    const startDate = dto.startDate ? new Date(dto.startDate) : undefined;
    const endDate = dto.endDate ? new Date(dto.endDate) : undefined;

    if (startDate && startDate.getTime() <= Date.now()) {
      throw new BadRequestException('El torneo tiene que ser a futuro');
    }

    // Bajar el cupo por debajo de los ya anotados dejaría parejas colgadas.
    if (dto.maxTeams && dto.maxTeams < tournament._count.registrations) {
      throw new BadRequestException(
        `Ya hay ${tournament._count.registrations} parejas anotadas: el cupo no puede ser menor`,
      );
    }

    const venue =
      dto.clubId || dto.venueName || dto.cityId
        ? await resolveVenue(this.prisma, dto)
        : {};

    return this.prisma.tournament.update({
      where: { id },
      data: { ...dto, ...venue, startDate, endDate },
      select: tournamentSelect,
    });
  }

  async findOne(id: string) {
    const tournament = await this.prisma.tournament.findUnique({
      where: { id },
      select: tournamentSelect,
    });

    if (!tournament) {
      throw new NotFoundException('Torneo no encontrado');
    }

    return tournament;
  }

  async register(id: string, userId: string, dto: RegisterTournamentDto) {
    const tournament = await this.prisma.tournament.findUnique({
      where: { id },
      select: {
        cancelledAt: true,
        startDate: true,
        categories: true,
        maxTeams: true,
        _count: { select: { registrations: true } },
        registrations: { where: { userId }, select: { userId: true } },
      },
    });

    if (!tournament) {
      throw new NotFoundException('Torneo no encontrado');
    }

    if (tournament.cancelledAt) {
      throw new BadRequestException('El torneo está cancelado');
    }

    if (tournament.startDate.getTime() <= Date.now()) {
      throw new BadRequestException('Las inscripciones ya cerraron');
    }

    if (tournament.registrations.length > 0) {
      throw new BadRequestException('Ya estás anotado en este torneo');
    }

    if (!tournament.categories.includes(dto.category)) {
      throw new BadRequestException(
        'Ese torneo no tiene esa categoría. Elegí una de las que acepta.',
      );
    }

    if (
      tournament.maxTeams &&
      tournament._count.registrations >= tournament.maxTeams
    ) {
      throw new BadRequestException('El torneo llenó el cupo');
    }

    await this.prisma.tournamentRegistration.create({
      data: { tournamentId: id, userId, ...dto },
    });

    return this.findOne(id);
  }

  async unregister(id: string, userId: string) {
    const removed = await this.prisma.tournamentRegistration.deleteMany({
      where: { tournamentId: id, userId },
    });

    if (removed.count === 0) {
      throw new BadRequestException('No estabas anotado en este torneo');
    }

    return this.findOne(id);
  }

  async cancel(id: string, userId: string) {
    const tournament = await this.prisma.tournament.findUnique({
      where: { id },
      select: { organizerId: true, cancelledAt: true },
    });

    if (!tournament) {
      throw new NotFoundException('Torneo no encontrado');
    }

    if (tournament.organizerId !== userId) {
      throw new ForbiddenException('Solo el organizador puede cancelar');
    }

    if (tournament.cancelledAt) {
      return this.findOne(id);
    }

    return this.prisma.tournament.update({
      where: { id },
      data: { cancelledAt: new Date() },
      select: tournamentSelect,
    });
  }
}
