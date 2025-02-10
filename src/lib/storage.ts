import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

interface UploadImageOptions {
  maxSizeMB?: number;
  allowedTypes?: string[];
}

const DEFAULT_OPTIONS: UploadImageOptions = {
  maxSizeMB: 5,
  allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
};

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

  if (options.maxSizeMB && file.size > options.maxSizeMB * 1024 * 1024) {
    throw new ImageUploadError(
      `ファイルサイズが大きすぎます。${options.maxSizeMB}MB以下にしてください。`
    );
  }

  try {
    const fileName = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, `images/${fileName}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    console.error('Image upload error:', error);
    throw new ImageUploadError(
      'アップロードに失敗しました。もう一度お試しください。'
    );
  }
};
