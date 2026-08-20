import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CompleteProfileDto } from '../dto/complete-profile.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserQueryDto } from '../dto/user-query.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import type { UserAuthenticated } from '../selects/user-authenticated.select';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll(@Query() query: UserQueryDto) {
    return this.usersService.findAll(query);
  }
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getProfile(@CurrentUser() user: UserAuthenticated) {
    return this.usersService.findProfile(user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('me/profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  completeProfile(
    @CurrentUser() user: UserAuthenticated,
    @Body() dto: CompleteProfileDto,
  ) {
    return this.usersService.completeProfile(user.id, dto);
  }
}
