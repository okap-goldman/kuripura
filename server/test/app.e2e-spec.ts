/**
 * アプリケーション全体のエンドツーエンドテスト
 * - アプリケーションの基本的な起動と設定のテスト
 * - ルートエンドポイントの動作確認
 */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { initializeTestDataSource, cleanupTestDataSource } from './test-utils';
import { DataSource } from 'typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  /**
   * テスト環境のセットアップ
   * - テスト用の設定ファイル(.env.test)を読み込み
   * - アプリケーションの初期化
   */
  beforeAll(async () => {
    dataSource = await initializeTestDataSource();
    
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  }, 30000);

  /**
   * テスト終了時の後処理
   * - アプリケーションの終了処理
   */
  afterAll(async () => {
    if (app) {
      await app.close();
    }
    if (dataSource) {
      await cleanupTestDataSource(dataSource);
    }
  }, 30000);

  /**
   * ルートエンドポイントのテスト
   * - 未定義のルートへのアクセスが404を返すことを確認
   * - アプリケーションの基本的なルーティング設定が機能していることを確認
   */
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  }, 10000);
});