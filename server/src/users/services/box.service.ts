import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class BoxService {
  private s3: AWS.S3;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    const accessKeyId = this.configService.get('WASABI_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get('WASABI_SECRET_ACCESS_KEY');
    const region = this.configService.get('WASABI_REGION');
    this.bucketName = this.configService.get('WASABI_BUCKET_NAME') || 'kuripura-dev';
    const endpoint = this.configService.get('WASABI_ENDPOINT');

    if (!accessKeyId || !secretAccessKey || !region || !endpoint) {
      throw new Error('Wasabi API credentials are not properly configured');
    }

    this.s3 = new AWS.S3({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      region: region,
      endpoint: endpoint,
      signatureVersion: 'v4',
    });
  }

  async uploadProfileImage(fileBuffer: Buffer, fileName: string): Promise<string> {
    try {
      const params = {
        Bucket: this.bucketName,
        Key: `profile-images/${fileName}`,
        Body: fileBuffer,
        ACL: 'public-read',
      };

      const uploaded = await this.s3.upload(params).promise();
      return uploaded.Location;
    } catch (error) {
      console.error('Wasabi S3 error:', error);
      throw new Error('プロフィール画像のアップロードに失敗しました');
    }
  }
}