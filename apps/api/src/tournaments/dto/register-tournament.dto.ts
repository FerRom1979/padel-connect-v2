import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PlayerCategory } from '@prisma/client';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

export class RegisterTournamentDto {
  @ApiProperty({ enum: PlayerCategory })
  @IsEnum(PlayerCategory)
  category: PlayerCategory;

  @ApiPropertyOptional({
    description: 'Nombre del compañero. No hace falta que tenga cuenta.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  partnerName?: string;
}
