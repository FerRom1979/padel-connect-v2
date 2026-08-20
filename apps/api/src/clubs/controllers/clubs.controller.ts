import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import type { UserAuthenticated } from '../../users/selects/user-authenticated.select';
import { ClubQueryDto } from '../dto/club-query.dto';
import { CreateClubDto } from '../dto/create-club.dto';
import { ClubsService } from '../services/clubs.service';

@Controller('clubs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Get()
  findAll(@Query() query: ClubQueryDto) {
    return this.clubsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clubsService.findOne(id);
  }

  @Post()
  create(@CurrentUser() user: UserAuthenticated, @Body() dto: CreateClubDto) {
    return this.clubsService.create(user.id, dto);
  }
}
