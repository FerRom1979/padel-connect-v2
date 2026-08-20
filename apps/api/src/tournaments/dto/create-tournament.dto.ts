import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PlayerCategory } from '@prisma/client';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsISO8601,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateTournamentDto {
  @ApiProperty({ example: 'Apertura de primavera' })
  @IsString()
  @MaxLength(120)
  name: string;

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

  @ApiProperty({ example: '2026-10-10T09:00:00.000Z' })
  @IsISO8601()
  startDate: string;

  @ApiPropertyOptional({ description: 'Si dura más de un día' })
  @IsOptional()
  @IsISO8601()
  endDate?: string;

  @ApiProperty({ enum: PlayerCategory, isArray: true, example: ['C5', 'C6'] })
  @IsArray()
  @ArrayMinSize(1, { message: 'Elegí al menos una categoría' })
  @ArrayMaxSize(15)
  @IsEnum(PlayerCategory, { each: true })
  categories: PlayerCategory[];

  @ApiPropertyOptional({ description: 'Cupo de parejas' })
  @IsOptional()
  @IsInt()
  @Min(2)
  maxTeams?: number;

  @ApiPropertyOptional({ description: 'Inscripción por pareja, en pesos' })
  @IsOptional()
  @IsInt()
  @Min(0)
  price?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;
}
