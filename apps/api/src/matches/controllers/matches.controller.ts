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
import { CreateMatchDto } from '../dto/create-match.dto';
import { UpdateMatchDto } from '../dto/update-match.dto';
import { MatchQueryDto } from '../dto/match-query.dto';
import { MatchesService } from '../services/matches.service';

@Controller('matches')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get()
  findAll(
    @Query() query: MatchQueryDto,
    @CurrentUser() user: UserAuthenticated,
  ) {
    return this.matchesService.findAll(query, user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matchesService.findOne(id);
  }

  @Post()
  create(@CurrentUser() user: UserAuthenticated, @Body() dto: CreateMatchDto) {
    return this.matchesService.create(user.id, dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @CurrentUser() user: UserAuthenticated,
    @Body() dto: UpdateMatchDto,
  ) {
    return this.matchesService.update(id, user.id, dto);
  }

  @Post(':id/players')
  join(@Param('id') id: string, @CurrentUser() user: UserAuthenticated) {
    return this.matchesService.join(id, user.id);
  }

  @Delete(':id/players')
  leave(@Param('id') id: string, @CurrentUser() user: UserAuthenticated) {
    return this.matchesService.leave(id, user.id);
  }

  @Patch(':id/cancel')
  cancel(@Param('id') id: string, @CurrentUser() user: UserAuthenticated) {
    return this.matchesService.cancel(id, user.id);
  }
}
