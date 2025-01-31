/**
 * 認証機能のエンドツーエンドテスト
 * - ユーザー登録
 * - ログイン認証
 * - 保護されたルートへのアクセス制御
 */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { AppModule } from '../src/app.module';
import { 
  initializeTestDataSource, 
  cleanupTestDataSource, 
  setupTestDatabase 
} from './test-utils';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const testDb = await setupTestDatabase();
    app = testDb.app;
    dataSource = testDb.dataSource;
  });

  afterAll(async () => {
    await app.close();
    await cleanupTestDataSource(dataSource);
  });

  describe('/auth/register (POST)', () => {
    it('should register a new user', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'test@example.com',
          password: 'Test123!',
          username: 'testuser'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('access_token');
    }, 15000);

    it('should fail with invalid email', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'invalid-email',
          password: 'Test123!',
          username: 'testuser'
        });

      expect(response.status).toBe(400);
    }, 15000);
  });

  describe('/auth/login (POST)', () => {
    beforeEach(async () => {
      // Register a user for login tests
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'login@example.com',
          password: 'Test123!',
          username: 'loginuser'
        });
    }, 15000);

    it('should login successfully', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'login@example.com',
          password: 'Test123!'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('access_token');
    }, 15000);

    it('should fail with wrong password', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'login@example.com',
          password: 'WrongPass123!'
        });

      expect(response.status).toBe(401);
    }, 15000);

    it('should fail with invalid username', async () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'test', password: 'test' })
        .expect(401);
    }, 15000);
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });
});