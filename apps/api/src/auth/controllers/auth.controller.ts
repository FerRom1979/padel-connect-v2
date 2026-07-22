import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import type { UserAuthenticated } from 'src/users/selects/user-authenticated.select';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CurrentUser } from '../decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getMe(@CurrentUser() user: UserAuthenticated) {
    return user;
  }
}
