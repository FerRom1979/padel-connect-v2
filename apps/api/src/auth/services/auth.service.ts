import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';
import { UserAuthSelect } from 'src/users/selects/user-auth.select';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from '../dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    const token = this.generateToken(user);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      accessToken: token,
    };
  }

  private async validateUser(email: string, password: string) {
    const user = await this.usersService.findAuthUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  private generateToken(user: UserAuthSelect) {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
