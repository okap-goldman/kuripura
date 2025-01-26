import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { BoxService } from '../src/users/services/box.service';
import { readFileSync } from 'fs';

describe('BoxService', () => {
  let service: BoxService;
  let mockConfigService: ConfigService;

  beforeEach(async () => {
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
        BoxService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = moduleRef.get<BoxService>(BoxService);
  });

  test('uploadProfileImage 異常系: 無効なファイル形式', async () => {
    const buffer = readFileSync('test/fixtures/invalid-file.exe');
    await expect(service.uploadProfileImage(buffer))
      .rejects
      .toThrow('INVALID_FILE_TYPE');
  });
}); 