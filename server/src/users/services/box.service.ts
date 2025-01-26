import { Injectable } from '@nestjs/common';
import BoxSDK = require('box-node-sdk');
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BoxService {
  private sdk: BoxSDK;
  private client: any;

  constructor(private configService: ConfigService) {
    const clientId = this.configService.get('BOX_CLIENT_ID');
    const clientSecret = this.configService.get('BOX_CLIENT_SECRET');
    const publicKeyId = this.configService.get('BOX_PUBLIC_KEY_ID');
    const privateKey = this.configService.get('BOX_PRIVATE_KEY');
    const passphrase = this.configService.get('BOX_PASSPHRASE');

    if (!clientId || !clientSecret || !publicKeyId || !privateKey || !passphrase) {
      throw new Error('Box API credentials are not properly configured');
    }

    this.sdk = new BoxSDK({
      clientID: clientId,
      clientSecret: clientSecret,
      appAuth: {
        keyID: publicKeyId,
        privateKey: privateKey,
        passphrase: passphrase,
      },
      "enterpriseID": "0"
    });

    this.client = this.sdk.getAppAuthClient('enterprise');
  }

  async uploadProfileImage(fileBuffer: Buffer, fileName: string): Promise<string> {
    try {
      const folderId = this.configService.get('BOX_PROFILE_IMAGES_FOLDER_ID');
      if (!folderId) {
        throw new Error('BOX_PROFILE_IMAGES_FOLDER_ID is not configured');
      }

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