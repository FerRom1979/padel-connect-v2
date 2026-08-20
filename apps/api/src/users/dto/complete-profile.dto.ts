import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

import {
  DominantHand,
  PlayerCategory,
  Position,
  PreferredMatchType,
} from '@prisma/client';

export class CompleteProfileDto {
  @IsInt()
  cityId: number;

  @IsOptional()
  @IsEnum(PlayerCategory)
  category?: PlayerCategory;

  @IsOptional()
  @IsEnum(Position)
  position?: Position;

  @IsOptional()
  @IsEnum(DominantHand)
  dominantHand?: DominantHand;

  @IsOptional()
  @IsEnum(PreferredMatchType)
  preferredMatchType?: PreferredMatchType;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  instagram?: string;

  @IsOptional()
  @IsString()
  whatsapp?: string;

  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsInt()
  travelDistanceKm?: number;
}
