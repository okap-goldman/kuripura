import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { RegisterCredentials } from '@kuripura/shared';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await user.comparePassword(password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
      }),
    ]);

    await this.usersService.updateRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async register(credentials: RegisterCredentials) {
    const user = await this.usersService.create(credentials);
    return this.login(user);
  }

  async refreshToken(userId: string, refreshToken: string) {
    const user = await this.usersService.findOne(userId);
    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedException();
    }

    return this.login(user);
  }

  async logout(userId: string) {
    await this.usersService.updateRefreshToken(userId, null);
    return { message: 'Logged out successfully' };
  }
} 