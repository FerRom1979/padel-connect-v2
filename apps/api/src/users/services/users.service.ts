import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { hashPassword } from '../../common/utils/hash-password.util';
import { PrismaService } from '../../prisma/prisma.service';
import { CompleteProfileDto } from '../dto/complete-profile.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserQueryDto } from '../dto/user-query.dto';
import { PAGE_SIZE } from '../users.constants';
import { mapCreateUserData } from '../mappers/create-user.mapper';
import { userListSelect, type UserList } from '../selects/user-list.select';
import {
  userDetailSelect,
  type UserDetail,
} from '../selects/user-details.select';
import { userSelect, type UserPublic } from '../selects/user-public.select';
import { UserAuthSelect, userAuthSelect } from '../selects/user-auth.select';
import {
  UserAuthenticated,
  userAuthenticatedSelect,
} from '../selects/user-authenticated.select';
import { UserProfile, userProfileSelect } from '../selects/user-profile.select';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserPublic> {
    const hashedPassword = await hashPassword(createUserDto.password);
    const data = mapCreateUserData(createUserDto, hashedPassword);

    try {
      const user = await this.prisma.user.create({
        data,
        select: userSelect,
      });

      return user;
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already registered');
      }

      throw error;
    }
  }

  async findAll(query: UserQueryDto = {}) {
    const search = query.q?.trim();

    const users = await this.prisma.user.findMany({
      where: {
        isActive: true,
        // Sin perfil completo no hay nada útil que mostrar de un jugador.
        profileCompleted: true,
        cityId: query.cityId,
        category: query.category,
        position: query.position,
        ...(search
          ? {
              OR: [
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      select: userListSelect,
      orderBy: { createdAt: 'desc' },
      take: PAGE_SIZE + 1,
    });

    return {
      items: users.slice(0, PAGE_SIZE),
      hasMore: users.length > PAGE_SIZE,
    };
  }

  async findOne(id: string): Promise<UserDetail> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: userDetailSelect,
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async findAuthUserByEmail(email: string): Promise<UserAuthSelect | null> {
    return this.prisma.user.findUnique({
      where: { email },
      select: userAuthSelect,
    });
  }

  async findForAuthenticationById(
    id: string,
  ): Promise<UserAuthenticated | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: userAuthenticatedSelect,
    });
  }

  async completeProfile(
    id: string,
    dto: CompleteProfileDto,
  ): Promise<UserPublic> {
    const city = await this.prisma.city.findUnique({
      where: {
        id: dto.cityId,
      },
    });
    if (!city) {
      throw new NotFoundException(`City ${dto.cityId} not found`);
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        cityId: dto.cityId,
        category: dto.category,
        position: dto.position,
        dominantHand: dto.dominantHand,
        preferredMatchType: dto.preferredMatchType,
        bio: dto.bio,
        phone: dto.phone,
        instagram: dto.instagram,
        whatsapp: dto.whatsapp,
        latitude: dto.latitude,
        longitude: dto.longitude,
        travelDistanceKm: dto.travelDistanceKm,
        profileCompleted: true,
      },
      select: userSelect,
    });
  }

  async findProfile(id: string): Promise<UserProfile> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: userProfileSelect,
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }
}
