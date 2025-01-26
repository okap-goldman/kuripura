/**
 * ユーザー関連のエンドツーエンドテスト
 * 主にプロフィール更新やアバター画像のアップロード機能をテスト
 */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../src/users/users.service';
import { WasabiService } from '../src/users/services/box.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/entities/user.entity';
import { Post } from '../src/posts/entities/post.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from '../src/users/users.controller';
import { JwtAuthGuard } from '../src/auth/guards/jwt-auth.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../src/auth/strategies/jwt.strategy';
import { MulterModule } from '@nestjs/platform-express';

describe('Users Controller (e2e)', () => {
  let app: INestApplication;
  let jwtService: JwtService;
  let usersService: UsersService;
  let WasabiService: WasabiService;

  // テスト用のモックユーザーデータ
  const mockUser = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
    password: 'hashedPassword',
  };

  // リポジトリのモック設定
  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
  };

  // Box APIサービスのモック設定
  // プロフィール画像のアップロードをシミュレート
  const mockBoxService = {
    uploadProfileImage: jest.fn().mockImplementation(async (fileBuffer: Buffer, fileName: string) => {
      return `https://example.com/avatar.jpg`;
    }),
  };

  // ユーザーサービスのモック設定
  // 各種ユーザー操作をシミュレート
  const mockUsersService = {
    findOne: jest.fn().mockResolvedValue(mockUser),
    updateProfile: jest.fn().mockResolvedValue(mockUser),
    uploadProfileImage: jest.fn().mockImplementation(async (userId: string, file: Express.Multer.File) => {
      return { url: 'https://example.com/avatar.jpg' };
    }),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env.test',
        }),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'kuripura_test',
          entities: [User, Post],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: 'test_secret_key',
          signOptions: { expiresIn: '1h' },
        }),
        MulterModule.register(),
      ],
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
        {
          provide: WasabiService,
          useValue: mockBoxService,
        },
        {
          provide: JwtStrategy,
          useValue: {
            validate: jest.fn().mockResolvedValue(mockUser),
          },
        },
      ],
    })
    .overrideGuard(JwtAuthGuard)
    .useValue({
      canActivate: (context) => {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return false;
        }
        
        request.user = mockUser;
        return true;
      },
    })
    .compile();

    app = moduleFixture.createNestApplication();
    jwtService = moduleFixture.get<JwtService>(JwtService);
    usersService = moduleFixture.get<UsersService>(UsersService);
    WasabiService = moduleFixture.get<WasabiService>(WasabiService);

    await app.init();

    // Reset mock calls before each test
    jest.clearAllMocks();
  }, 10000);

  afterEach(async () => {
    await app.close();
  });

  describe('/users/profile/avatar (POST)', () => {
    /**
     * プロフィール画像アップロードの正常系テスト
     * - 認証済みユーザーが画像をアップロードできることを確認
     * - アップロード後のURLが正しく返却されることを確認
     */
    it('should upload avatar successfully', async () => {
      const token = jwtService.sign({ sub: mockUser.id, email: mockUser.email });
      const buffer = Buffer.from('fake image data');
      const filename = 'test-avatar.jpg';

      const response = await request(app.getHttpServer())
        .post('/users/profile/avatar')
        .set('Authorization', `Bearer ${token}`)
        .attach('file', buffer, filename)
        .expect(201);

      expect(response.body).toHaveProperty('url');
      expect(response.body.url).toBe('https://example.com/avatar.jpg');
      expect(mockUsersService.uploadProfileImage).toHaveBeenCalled();
    });

    /**
     * プロフィール画像アップロードの異常系テスト：ファイル未指定
     * - 画像ファイルが添付されていない場合のエラー処理を確認
     */
    it('should return 400 when no file is provided', async () => {
      const token = jwtService.sign({ sub: mockUser.id, email: mockUser.email });

      const response = await request(app.getHttpServer())
        .post('/users/profile/avatar')
        .set('Authorization', `Bearer ${token}`)
        .expect(400);

      expect(response.body.message).toBe('画像ファイルが必要です');
    });

    /**
     * プロフィール画像アップロードの異常系テスト：未認証
     * - 認証トークンなしでのアクセスが拒否されることを確認
     */
    it('should return 403 when no token is provided', async () => {
      await request(app.getHttpServer())
        .post('/users/profile/avatar')
        .attach('file', Buffer.from('fake image data'), 'test-avatar.jpg')
        .expect(403);
    });
  });
}); 
