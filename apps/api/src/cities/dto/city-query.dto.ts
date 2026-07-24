import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CityQueryDto {
  @ApiPropertyOptional({
    description: 'Buscar ciudad por nombre',
    example: 'loma',
  })
  @IsOptional()
  @IsString()
  q?: string;
}
