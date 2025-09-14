import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenService } from '../services/token.service';
import { AuthService } from '../routes/auth/auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Get token from cookies or Authorization header
    let token = request.cookies?.accessToken;

    if (!token) {
      const authHeader = request.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      throw new UnauthorizedException('Access token not found');
    }

    try {
      const payload = this.tokenService.verifyAccessToken(token);
      if (!payload) {
        throw new UnauthorizedException('Invalid access token');
      }

      // Optional: Validate user still exists
      const user = await this.authService.validateUser(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Add user to request object
      request.user = user;
      request.tokenPayload = payload;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Token validation failed');
    }
  }
}
