import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import type { UserAuthenticated } from '../../users/selects/user-authenticated.select';
import { CreateTournamentDto } from '../dto/create-tournament.dto';
import { RegisterTournamentDto } from '../dto/register-tournament.dto';
import { TournamentQueryDto } from '../dto/tournament-query.dto';
import { UpdateTournamentDto } from '../dto/update-tournament.dto';
import { TournamentsService } from '../services/tournaments.service';

@Controller('tournaments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Get()
  findAll(
    @Query() query: TournamentQueryDto,
    @CurrentUser() user: UserAuthenticated,
  ) {
    return this.tournamentsService.findAll(query, user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tournamentsService.findOne(id);
  }

  @Post()
  create(
    @CurrentUser() user: UserAuthenticated,
    @Body() dto: CreateTournamentDto,
  ) {
    return this.tournamentsService.create(user.id, dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @CurrentUser() user: UserAuthenticated,
    @Body() dto: UpdateTournamentDto,
  ) {
    return this.tournamentsService.update(id, user.id, dto);
  }

  @Post(':id/registrations')
  register(
    @Param('id') id: string,
    @CurrentUser() user: UserAuthenticated,
    @Body() dto: RegisterTournamentDto,
  ) {
    return this.tournamentsService.register(id, user.id, dto);
  }

  @Delete(':id/registrations')
  unregister(@Param('id') id: string, @CurrentUser() user: UserAuthenticated) {
    return this.tournamentsService.unregister(id, user.id);
  }

  @Patch(':id/cancel')
  cancel(@Param('id') id: string, @CurrentUser() user: UserAuthenticated) {
    return this.tournamentsService.cancel(id, user.id);
  }
}
