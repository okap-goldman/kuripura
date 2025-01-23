import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    console.log('JWT Guard handling request:', { hasError: !!err, hasUser: !!user, info });
    
    if (err) {
      console.error('JWT Guard error:', err);
      throw err;
    }
    
    if (!user) {
      throw new UnauthorizedException(info?.message || 'Unauthorized access');
    }
    
    return user;
  }
} 