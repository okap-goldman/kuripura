/**
 * ユーザー関連のエンドツーエンドテスト
 * 主にプロフィール更新やアバター画像のアップロード機能をテスト
 */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { initializeTestDataSource, cleanupTestDataSource, setupTestDatabase, cleanupDatabase } from './test-utils';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../src/users/users.module';
import { AuthModule } from '../src/auth/auth.module';
import { join } from 'path';
import * as fs from 'fs';
import { DataSource } from 'typeorm';
import * as path from 'path';
import { User } from '../src/users/entities/user.entity';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let testUser: User;
  let accessToken: string;

  beforeAll(async () => {
    const testDb = await setupTestDatabase();
    app = testDb.app;
    dataSource = testDb.dataSource;
  });

  afterAll(async () => {
    if (dataSource) {
      await cleanupDatabase(dataSource);
    }
    if (app) {
      await app.close();
    }
  });

  beforeEach(async () => {
    if (dataSource) {
      await cleanupDatabase(dataSource);
    }
    
    // テストユーザーの作成
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        username: 'testuser'
      });

    accessToken = response.body.access_token;
    
    const userRepository = dataSource.getRepository(User);
    testUser = await userRepository.findOne({ where: { email: 'test@example.com' } });
  });

  describe('/users/profile/avatar (POST)', () => {
    it('should upload avatar successfully', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/profile/avatar')
        .set('Authorization', `Bearer ${accessToken}`)
        .attach('file', path.join(__dirname, 'fixtures/test-avatar.png'));

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('url');
    }, 30000);

    it('should return 400 when no file is provided', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/profile/avatar')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).toBe(400);
    });

    it('should return 403 when no token is provided', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/profile/avatar')
        .attach('file', path.join(__dirname, 'fixtures/test-avatar.png'));

      expect(response.status).toBe(403);
    });
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200);
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });
}); 
