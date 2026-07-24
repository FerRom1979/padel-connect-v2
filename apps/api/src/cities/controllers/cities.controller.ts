import { Controller, Get, Query } from '@nestjs/common';
import { CitiesService } from '../services/cities.service';
import { CityQueryDto } from '../dto/city-query.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { CityResponseDto } from '../dto/city-response.dto';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  @ApiOkResponse({
    type: CityResponseDto,
    isArray: true,
  })
  findAll(@Query() query: CityQueryDto) {
    return this.citiesService.findAll(query.q);
  }
}
