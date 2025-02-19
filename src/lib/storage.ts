import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

interface UploadImageOptions {
  allowedTypes?: string[];
}

const DEFAULT_OPTIONS: UploadImageOptions = {
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
};

const s3Client = new S3Client({
  region: import.meta.env.VITE_WASABI_REGION,
  endpoint: `https://s3.${import.meta.env.VITE_WASABI_REGION}.wasabisys.com`,
  credentials: {
    accessKeyId: import.meta.env.VITE_WASABI_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_WASABI_SECRET_ACCESS_KEY
  }
});

export class ImageUploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ImageUploadError';
  }
}

export const uploadImage = async (
  file: File,
  options: UploadImageOptions = DEFAULT_OPTIONS
): Promise<string> => {
  // バリデーション
  if (!options.allowedTypes?.includes(file.type)) {
    throw new ImageUploadError(
      '対応していないファイル形式です。JPEG、PNG、GIF、WebPのみ対応しています。'
    );
  }

  try {
    const fileName = `${Date.now()}-${file.name}`;
    const command = new PutObjectCommand({
      Bucket: import.meta.env.VITE_WASABI_BUCKET,
      Key: `images/${fileName}`,
      Body: file,
      ContentType: file.type
    });

    await s3Client.send(command);
    return `https://s3.${import.meta.env.VITE_WASABI_REGION}.wasabisys.com/${import.meta.env.VITE_WASABI_BUCKET}/images/${fileName}`;
  } catch (error) {
    console.error('Image upload error:', error);
    throw new ImageUploadError(
      'アップロードに失敗しました。もう一度お試しください。'
    );
  }
};
