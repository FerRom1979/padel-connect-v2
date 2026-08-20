import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsUUID } from 'class-validator';

export class MatchQueryDto {
  @ApiPropertyOptional({ description: 'Filtrar por ciudad' })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  cityId?: number;

  @ApiPropertyOptional({
    description: 'Solo partidos con lugares libres',
    default: false,
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  onlyAvailable?: boolean;

  @ApiPropertyOptional({
    description: 'Solo los partidos en los que estoy anotado',
    default: false,
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  mine?: boolean;

  @ApiPropertyOptional({ description: 'Partidos de un club' })
  @IsOptional()
  @IsUUID()
  clubId?: string;

  @ApiPropertyOptional({
    description: 'Los que ya se jugaron, del más reciente al más viejo',
    default: false,
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  past?: boolean;
}
