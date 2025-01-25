import { Injectable } from '@nestjs/common';
import BoxSDK from 'box-node-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BoxService {
  private sdk: BoxSDK;
  private client: any;

  constructor(private configService: ConfigService) {
    this.sdk = new BoxSDK({
      clientID: this.configService.get('BOX_CLIENT_ID'),
      clientSecret: this.configService.get('BOX_CLIENT_SECRET'),
      appAuth: {
        publicKeyID: this.configService.get('BOX_PUBLIC_KEY_ID'),
        privateKey: this.configService.get('BOX_PRIVATE_KEY'),
        passphrase: this.configService.get('BOX_PASSPHRASE'),
      },
    });

    this.client = this.sdk.getAppAuthClient('enterprise');
  }

  async uploadProfileImage(fileBuffer: Buffer, fileName: string): Promise<string> {
    try {
      // プロフィール画像用のフォルダIDを環境変数から取得
      const folderId = this.configService.get('BOX_PROFILE_IMAGES_FOLDER_ID');

      // Box APIを使用してファイルをアップロード
      const uploadedFile = await this.client.files.uploadFile(folderId, fileName, fileBuffer);

      // 共有リンクを作成
      const sharedLink = await this.client.files.update(uploadedFile.id, {
        shared_link: {
          access: 'open',
          permissions: {
            can_download: true,
          },
        },
      });

      return sharedLink.shared_link.url;
    } catch (error) {
      console.error('Box API error:', error);
      throw new Error('プロフィール画像のアップロードに失敗しました');
    }
  }
}