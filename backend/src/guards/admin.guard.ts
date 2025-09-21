import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from './../services/token.service';
import { AuthService } from './../routes/auth/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Get token from secure httpOnly cookies only
    const token = request.cookies?.accessToken;

    if (!token) {
      throw new UnauthorizedException('Access token not found in cookies');
    }

    try {
      const payload = this.tokenService.verifyAccessToken(token);
      if (!payload) {
        throw new UnauthorizedException('Invalid access token');
      }

      // Validate user still exists and get full user data
      const user = await this.authService.validateUser(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Check if user is admin
      if (!user.isAdmin) {
        throw new ForbiddenException('Admin access required');
      }

      // Add user to request object
      request.user = user;
      request.tokenPayload = payload;

      return true;
    } catch (error) {
      console.error('Admin Guard error:', error);

      // Re-throw specific exceptions
      if (
        error instanceof ForbiddenException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }

      // Generic error fallback
      throw new UnauthorizedException('Token validation failed');
    }
  }
}
