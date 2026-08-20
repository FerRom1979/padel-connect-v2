import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PlayerCategory } from '@prisma/client';
import {
  ArrayMaxSize,
  IsUUID,
  IsArray,
  IsEnum,
  IsInt,
  IsISO8601,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateMatchDto {
  @ApiPropertyOptional({
    description:
      'Nombre del lugar. Podés mandar esto o clubId, no hacen falta los dos.',
    example: 'Club Los Robles',
  })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  venueName?: string;

  @ApiPropertyOptional({ description: 'Club cargado en la app' })
  @IsOptional()
  @IsUUID()
  clubId?: string;

  @ApiPropertyOptional({
    description: 'No hace falta si mandás clubId: la ciudad sale del club.',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  cityId?: number;

  @ApiProperty({ example: '2026-09-02T20:00:00.000Z' })
  @IsISO8601()
  playedAt: string;

  @ApiPropertyOptional({ default: 90 })
  @IsOptional()
  @IsInt()
  @Min(30)
  @Max(240)
  durationMin?: number;

  @ApiPropertyOptional({
    description:
      'Categorías aceptadas. Vacío significa que juega cualquiera. ' +
      'Una lista en vez de un rango porque caballeros (C) y damas (D) ' +
      'son dos escalas distintas y un partido mixto acepta de las dos.',
    enum: PlayerCategory,
    isArray: true,
    example: ['C5', 'C6'],
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(15)
  @IsEnum(PlayerCategory, { each: true })
  categories?: PlayerCategory[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsLatitude()
  latitude?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsLongitude()
  longitude?: number;
}
