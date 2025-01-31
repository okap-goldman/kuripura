import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppModule } from '../src/app.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../src/users/entities/user.entity';
import { Post } from '../src/posts/entities/post.entity';

// テスト用のデータソースを初期化
export const initializeTestDataSource = async () => {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.TEST_DB_HOST || 'localhost',
    port: parseInt(process.env.TEST_DB_PORT || '5432'),
    username: process.env.TEST_DB_USERNAME || 'postgres',
    password: process.env.TEST_DB_PASSWORD || 'postgres',
    database: process.env.TEST_DB_NAME || 'test_db',
    entities: [User, Post],
    synchronize: true,
  });

  await dataSource.initialize();
  return dataSource;
};

// テストデータベースのクリーンアップ
export const cleanupTestDataSource = async (dataSource: DataSource) => {
  if (dataSource.isInitialized) {
    await dataSource.destroy();
  }
};

// テストデータベースのセットアップ
export const setupTestDatabase = async (): Promise<{
  app: INestApplication;
  dataSource: DataSource;
}> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env.test',
      }),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [User, Post],
          synchronize: true,
          logging: false,
        }),
      }),
      AppModule,
    ],
  }).compile();

  const app = moduleFixture.createNestApplication();
  await app.init();

  const dataSource = moduleFixture.get<DataSource>(DataSource);
  return { app, dataSource };
};

// データベースのクリーンアップ
export const cleanupDatabase = async (dataSource: DataSource) => {
  try {
    const entities = dataSource.entityMetadatas;
    const tableNames = entities.map(entity => `"${entity.tableName}"`).join(', ');
    await dataSource.query(`TRUNCATE ${tableNames} CASCADE;`);
  } catch (error) {
    console.error('Error cleaning up database:', error);
  }
} 
