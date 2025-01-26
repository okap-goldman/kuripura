/**
 * 認証機能のエンドツーエンドテスト
 * - ユーザー登録
 * - ログイン認証
 * - 保護されたルートへのアクセス制御
 */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/users/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import databaseConfig from '../src/config/database.config';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { createReadStream } from 'fs';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let accessToken: string;
  let validToken: string;

  /**
   * テスト環境のセットアップ
   * - テスト用データベースの初期化
   * - アプリケーションの起動
   * - テスト用トークンの取得
   */
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [databaseConfig],
          envFilePath: '.env.test',
          ignoreEnvFile: false,
        }),
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
            type: 'postgres',
            host: configService.get('database.host'),
            port: configService.get('database.port'),
            username: configService.get('database.username'),
            password: configService.get('database.password'),
            database: 'kuripura_test',
            entities: [User],
            synchronize: true,
            dropSchema: true,
          }),
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    dataSource = app.get(DataSource);

    // ConfigServiceから環境変数を取得してログ出力
    const configService = app.get(ConfigService);
    console.log('JWT_SECRET:', configService.get('JWT_SECRET'));
    console.log('JWT_ACCESS_TOKEN_EXPIRES_IN:', configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN'));

    await app.init();

    // テスト開始時にデータベースをクリーンアップ
    await dataSource.synchronize(true);

    // テスト用のトークンを取得
    const loginRes = await request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'TestPass123!' });
    validToken = loginRes.body.token;
  });

  /**
   * テスト終了時の後処理
   * - テストデータベースの削除
   * - アプリケーションの終了
   */
  afterAll(async () => {
    await dataSource.dropDatabase();
    await app.close();
  });

  describe('Authentication', () => {
    // テスト用ユーザーデータ
    const testUser = {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
      isEmailVerified: true,
    };

    /**
     * ユーザー登録の正常系テスト
     * - 新規ユーザーが正常に登録できることを確認
     * - アクセストークンとリフレッシュトークンが発行されることを確認
     */
    it('should register a new user', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(201);

      expect(response.body.accessToken).toBeDefined();
      expect(response.body.refreshToken).toBeDefined();
      expect(response.body.user).toBeDefined();
      expect(response.body.user.email).toBe(testUser.email);
      expect(response.body.user.name).toBe(testUser.name);
      expect(response.body.user.password).toBeUndefined();

      accessToken = response.body.accessToken;
    });

    /**
     * ユーザー登録の異常系テスト：メールアドレス重複
     * - 既存のメールアドレスで登録できないことを確認
     */
    it('should not register a user with existing email', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(409);
    });

    /**
     * ログインの正常系テスト
     * - 正しい認証情報でログインできることを確認
     * - トークンが正しく発行されることを確認
     */
    it('should login with valid credentials', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(200);

      expect(response.body.accessToken).toBeDefined();
      expect(response.body.refreshToken).toBeDefined();
      accessToken = response.body.accessToken;
    });

    /**
     * ログインの異常系テスト：不正な認証情報
     * - 誤ったパスワードでログインできないことを確認
     */
    it('should not login with invalid credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword',
        })
        .expect(401);
    });

    /**
     * 保護されたルートへのアクセス制御テスト：正常系
     * - 有効なトークンで保護されたルートにアクセスできることを確認
     */
    it('should access protected route with valid token', async () => {
      expect(accessToken).toBeDefined();
      
      const response = await request(app.getHttpServer())
        .get('/users/profile')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body.email).toBe(testUser.email);
      expect(response.body.name).toBe(testUser.name);
    });

    /**
     * 保護されたルートへのアクセス制御テスト：異常系
     * - トークンなしで保護されたルートにアクセスできないことを確認
     */
    it('should not access protected route without token', () => {
      return request(app.getHttpServer())
        .get('/users/profile')
        .expect(401);
    });
  });

  /**
   * ユーザー登録の異常系テスト：重複メールアドレス
   * - 既存のメールアドレスで登録を試みた場合のエラー処理を確認
   */
  test('POST /auth/register 異常系: 重複メールアドレス', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ email: 'existing@example.com', password: 'ValidPass123!' });
    expect(res.statusCode).toEqual(409);
    expect(res.body).toHaveProperty('code', 'DUPLICATE_EMAIL');
  });

  /**
   * プロフィール画像アップロードの正常系テスト
   * - 認証済みユーザーがプロフィール画像を更新できることを確認
   */
  test('PATCH /users/profile/avatar 正常系: 画像アップロード', async () => {
    const mockFile = createReadStream('test/fixtures/valid-avatar.png');
    const res = await request(app)
      .patch('/users/profile/avatar')
      .set('Authorization', `Bearer ${validToken}`)
      .attach('avatar', mockFile);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('url');
  });
});