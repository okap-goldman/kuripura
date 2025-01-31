/**
 * Wasabi S3サービスのユニットテスト
 * プロフィール画像のアップロード機能をテスト
 */
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { WasabiService } from '../src/users/services/wasabi.service';
import { readFileSync } from 'fs';

describe('WasabiService', () => {
  let service: WasabiService;
  let mockConfigService: ConfigService;

  /**
   * テストの前準備
   * - モックConfigServiceの設定
   * - Wasabi S3の認証情報をモック
   */
  beforeEach(async () => {
    // ConfigServiceのモック設定
    mockConfigService = {
      get: jest.fn().mockImplementation((key: string) => {
        switch (key) {
          case 'WASABI_ACCESS_KEY_ID':
            return 'test-access-key';
          case 'WASABI_SECRET_ACCESS_KEY':
            return 'test-secret-key';
          case 'WASABI_REGION':
            return 'ap-northeast-1';
          case 'WASABI_BUCKET_NAME':
            return 'test-bucket';
          case 'WASABI_ENDPOINT':
            return 'https://s3.ap-northeast-1.wasabisys.com';
          default:
            return null;
        }
      }),
    } as any;

    const moduleRef = await Test.createTestingModule({
      providers: [
        WasabiService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = moduleRef.get<WasabiService>(WasabiService);
  });

  /**
   * プロフィール画像アップロードの正常系テスト
   * - 画像ファイルが正常にアップロードされることを確認
   */
  test('uploadProfileImage 正常系: 画像アップロード', async () => {
    const buffer = Buffer.from('fake image data');
    const fileName = 'test-image.jpg';
    
    const result = await service.uploadProfileImage(buffer, fileName);
    expect(result).toMatch(/^https:\/\/.+\/test-image\.jpg$/);
  });

  /**
   * プロフィール画像アップロードの異常系テスト
   * - 無効なファイル形式（.exe）のアップロードを試みた場合のエラー処理を確認
   */
  test('uploadProfileImage 異常系: 無効なファイル形式', async () => {
    const buffer = Buffer.from('fake executable data');
    await expect(service.uploadProfileImage(buffer, 'invalid-file.exe'))
      .rejects
      .toThrow('無効なファイル形式です');
  });
}); 