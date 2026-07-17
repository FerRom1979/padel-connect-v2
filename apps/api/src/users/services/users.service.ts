import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { hashPassword } from '../../common/utils/hash-password.util';
import { PrismaService } from '../../prisma/prisma.service';
import { CompleteProfileDto } from '../dto/complete-profile.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { mapCreateUserData } from '../mappers/create-user.mapper';
import { userListSelect, type UserList } from '../selects/user-list.select';
import { userDetailSelect, type UserDetail } from '../selects/user-details.select';
import { userSelect, type UserPublic } from '../selects/user-public.select';

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
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('Email already registered');
      }

      throw error;
    }
  }

  findAll(): Promise<UserList[]> {
    return this.prisma.user.findMany({
      select: userListSelect,
      orderBy: { createdAt: 'desc' },
    });
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

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserPublic> {
    await this.findOne(id);

    const { city, birthDate, ...rest } = updateUserDto;
    const data: Prisma.UserUncheckedUpdateInput = { ...rest };

    if (birthDate !== undefined) {
      data.birthDate = new Date(birthDate);
    }

    if (city !== undefined) {
      const existingCity = await this.prisma.city.findFirst({
        where: { name: city },
      });

      if (!existingCity) {
        throw new NotFoundException(`City ${city} not found`);
      }

      data.cityId = existingCity.id;
    }

    return this.prisma.user.update({
      where: { id },
      data,
      select: userSelect,
    });
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  async completeProfile(id: string, dto: CompleteProfileDto): Promise<UserPublic> {
    const city = await this.prisma.city.findFirst({
      where: {
        name: dto.city,
      },
    });

    if (!city) {
      throw new NotFoundException(`City ${dto.city} not found`);
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        cityId: city.id,
        level: dto.level,
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
}
