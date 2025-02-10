import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

declare const VITE_WASABI_REGION: string;
declare const VITE_WASABI_ACCESS_KEY_ID: string;
declare const VITE_WASABI_SECRET_ACCESS_KEY: string;
declare const VITE_WASABI_BUCKET: string;

const s3Client = new S3Client({
  region: VITE_WASABI_REGION,
  endpoint: `https://s3.${VITE_WASABI_REGION}.wasabisys.com`,
  credentials: {
    accessKeyId: VITE_WASABI_ACCESS_KEY_ID,
    secretAccessKey: VITE_WASABI_SECRET_ACCESS_KEY,
  },
});

export const uploadProfileImage = async (file: File): Promise<string> => {
  const key = `profiles/${Date.now()}-${file.name}`;
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: VITE_WASABI_BUCKET,
      Key: key,
      Body: file,
      ContentType: file.type,
    },
  });

  await upload.done();
  return `https://${VITE_WASABI_BUCKET}.s3.${VITE_WASABI_REGION}.wasabisys.com/${key}`;
};
