import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { ClubQueryDto } from '../dto/club-query.dto';
import { CreateClubDto } from '../dto/create-club.dto';
import { clubSelect } from '../selects/club.select';
import { PAGE_SIZE } from '../clubs.constants';

@Injectable()
export class ClubsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: ClubQueryDto) {
    const search = query.q?.trim();

    const clubs = await this.prisma.club.findMany({
      where: {
        cityId: query.cityId,
        ...(search ? { name: { contains: search, mode: 'insensitive' } } : {}),
      },
      orderBy: { name: 'asc' },
      select: clubSelect,
      take: PAGE_SIZE + 1,
    });

    return {
      items: clubs.slice(0, PAGE_SIZE),
      hasMore: clubs.length > PAGE_SIZE,
    };
  }

  async findOne(id: string) {
    const club = await this.prisma.club.findUnique({
      where: { id },
      select: clubSelect,
    });

    if (!club) {
      throw new NotFoundException('Club no encontrado');
    }

    return club;
  }

  async create(createdById: string, dto: CreateClubDto) {
    try {
      return await this.prisma.club.create({
        data: { ...dto, createdById },
        select: clubSelect,
      });
    } catch (error) {
      // @@unique([name, cityId]): el mismo club cargado dos veces.
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'Ya existe un club con ese nombre en esa ciudad',
        );
      }

      throw error;
    }
  }
}
