import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUser: Partial<User> = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    password: 'hashedPassword',
    comparePassword: jest.fn(),
  };

  const mockUsersService = {
    findByEmail: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    updateRefreshToken: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user without password if validation is successful', async () => {
      const email = 'test@example.com';
      const password = 'password';
      mockUsersService.findByEmail.mockResolvedValue(mockUser);
      (mockUser.comparePassword as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser(email, password);

      expect(result).toBeDefined();
      expect(result.password).toBeUndefined();
      expect(mockUsersService.findByEmail).toHaveBeenCalledWith(email);
    });

    it('should return null if user is not found', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      const result = await service.validateUser('test@example.com', 'password');

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return tokens and user data', async () => {
      const accessToken = 'access-token';
      const refreshToken = 'refresh-token';
      mockJwtService.signAsync
        .mockResolvedValueOnce(accessToken)
        .mockResolvedValueOnce(refreshToken);

      const result = await service.login(mockUser as User);

      expect(result).toEqual({
        accessToken,
        refreshToken,
        user: {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
        },
      });
      expect(mockUsersService.updateRefreshToken).toHaveBeenCalledWith(
        mockUser.id,
        refreshToken,
      );
    });
  });

  describe('refreshToken', () => {
    it('should throw UnauthorizedException if user is not found', async () => {
      mockUsersService.findOne.mockResolvedValue(null);

      await expect(
        service.refreshToken('user-id', 'refresh-token'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if refresh token does not match', async () => {
      mockUsersService.findOne.mockResolvedValue({
        ...mockUser,
        refreshToken: 'different-token',
      });

      await expect(
        service.refreshToken('user-id', 'refresh-token'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
}); 