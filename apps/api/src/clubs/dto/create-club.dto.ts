import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateClubDto {
  @ApiProperty({ example: 'Club Los Robles' })
  @IsString()
  @MaxLength(120)
  name: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  cityId: number;

  @ApiPropertyOptional({ example: 'Av. Meeks 1234' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  address?: string;

  @ApiPropertyOptional({ description: 'Cantidad de canchas', example: 4 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  courts?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(40)
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl({}, { message: 'El sitio web tiene que ser una URL válida' })
  website?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}
