import { Prisma } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';

export function mapCreateUserData(
  dto: CreateUserDto,
  hashedPassword: string,
): Prisma.UserUncheckedCreateInput {
  return {
    firstName: dto.firstName,
    lastName: dto.lastName,
    email: dto.email,
    password: hashedPassword,
  };
}
