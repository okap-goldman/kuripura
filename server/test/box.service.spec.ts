/**
 * Box APIサービスのユニットテスト
 * プロフィール画像のアップロード機能をテスト
 */
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { WasabiService } from '../src/users/services/box.service';
import { readFileSync } from 'fs';

describe('WasabiService', () => {
  let service: WasabiService;
  let mockConfigService: ConfigService;

  /**
   * テストの前準備
   * - モックConfigServiceの設定
   * - Box APIの認証情報をモック
   */
  beforeEach(async () => {
    // ConfigServiceのモック設定
    // Box APIキーとフォルダIDをテスト用の値で設定
    mockConfigService = {
      get: jest.fn().mockImplementation((key: string) => {
        switch (key) {
          case 'BOX_API_KEY':
            return 'test-api-key';
          case 'BOX_FOLDER_ID':
            return 'test-folder-id';
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
   * プロフィール画像アップロードの異常系テスト
   * - 無効なファイル形式（.exe）のアップロードを試みた場合のエラー処理を確認
   * - セキュリティ上の理由で特定の拡張子が拒否されることを確認
   */
  test('uploadProfileImage 異常系: 無効なファイル形式', async () => {
    const buffer = readFileSync('test/fixtures/invalid-file.exe');
    await expect(service.uploadProfileImage(buffer, 'invalid-file.exe'))
      .rejects
      .toThrow('INVALID_FILE_TYPE');
  });
}); 