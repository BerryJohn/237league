import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { type JwtPayload } from './../interfaces/user.interface';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest();

    // The JWT guard sets the tokenPayload on the request
    // which contains the decoded JWT payload
    return request.tokenPayload;
  },
);
