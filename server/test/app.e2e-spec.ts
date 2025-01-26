/**
 * アプリケーション全体のエンドツーエンドテスト
 * - アプリケーションの基本的な起動と設定のテスト
 * - ルートエンドポイントの動作確認
 */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '../src/config/database.config';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  /**
   * テスト環境のセットアップ
   * - テスト用の設定ファイル(.env.test)を読み込み
   * - アプリケーションの初期化
   */
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [databaseConfig],
          // テスト時には .env.test を読み込む
          envFilePath: '.env.test',
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  /**
   * テスト終了時の後処理
   * - アプリケーションの終了処理
   */
  afterAll(async () => {
    await app.close();
  });

  /**
   * ルートエンドポイントのテスト
   * - 未定義のルートへのアクセスが404を返すことを確認
   * - アプリケーションの基本的なルーティング設定が機能していることを確認
   */
  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(404);
  });
});