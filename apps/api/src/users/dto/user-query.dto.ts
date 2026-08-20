import { ApiPropertyOptional } from '@nestjs/swagger';
import { PlayerCategory, Position } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export class UserQueryDto {
  @ApiPropertyOptional({ description: 'Buscar por nombre o apellido' })
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  cityId?: number;

  @ApiPropertyOptional({ enum: PlayerCategory })
  @IsOptional()
  @IsEnum(PlayerCategory)
  category?: PlayerCategory;

  @ApiPropertyOptional({ enum: Position })
  @IsOptional()
  @IsEnum(Position)
  position?: Position;
}
