import { Injectable } from '@nestjs/common';
import BoxSDK from 'box-node-sdk';

@Injectable()
export class BoxService {
  private client: any;

  constructor() {
    const sdk = new BoxSDK({
      clientID: process.env.BOX_CLIENT_ID,
      clientSecret: process.env.BOX_CLIENT_SECRET,
    });

    if (!process.env.BOX_ACCESS_TOKEN) {
      throw new Error('BOX_ACCESS_TOKEN is not defined');
    }

    this.client = sdk.getBasicClient(process.env.BOX_ACCESS_TOKEN);
  }

  async uploadFile(fileBuffer: Buffer, fileName: string): Promise<string> {
    try {
      const uploadedFile = await this.client.files.uploadFile('0', fileName, fileBuffer);
      return uploadedFile.entries[0].id;
    } catch (error) {
      throw new Error(`Failed to upload file to Box: ${error.message}`);
    }
  }

  async deleteFile(fileId: string): Promise<void> {
    try {
      await this.client.files.delete(fileId);
    } catch (error) {
      throw new Error(`Failed to delete file from Box: ${error.message}`);
    }
  }
} 