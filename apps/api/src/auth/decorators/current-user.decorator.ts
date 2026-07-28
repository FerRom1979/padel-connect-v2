import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserAuthenticated } from 'src/users/selects/user-authenticated.select';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{
      user: UserAuthenticated;
    }>();
    return request.user;
  },
);
