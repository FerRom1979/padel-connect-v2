import { AuthenticatedUserDto } from './authenticated-user.dto';

export class LoginResponseDto {
  accessToken: string;

  user: AuthenticatedUserDto;
}
