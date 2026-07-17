import { Prisma } from '@prisma/client';
import { UpdateUserDto } from '../dto/update-user.dto';

export function mapUpdateUserData(dto: UpdateUserDto): Prisma.UserUncheckedUpdateInput {
  return {
    firstName: dto.firstName?.toUpperCase(),
    lastName: dto.lastName?.toUpperCase(),
    phone: dto.phone,
    bio: dto.bio,
    avatar: dto.avatar,
    level: dto.level,
    position: dto.position,
    dominantHand: dto.dominantHand,
    preferredMatchType: dto.preferredMatchType,
    instagram: dto.instagram,
    whatsapp: dto.whatsapp,
    latitude: dto.latitude,
    longitude: dto.longitude,
    travelDistanceKm: dto.travelDistanceKm,
  };
}
