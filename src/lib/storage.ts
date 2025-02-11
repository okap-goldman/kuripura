import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

const s3Client = new S3Client({
  region: import.meta.env.VITE_WASABI_REGION,
  endpoint: `https://s3.${import.meta.env.VITE_WASABI_REGION}.wasabisys.com`,
  credentials: {
    accessKeyId: import.meta.env.VITE_WASABI_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_WASABI_SECRET_ACCESS_KEY,
  },
});

export const uploadProfileImage = async (file: File): Promise<string> => {
  const key = `profiles/${Date.now()}-${file.name}`;
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: import.meta.env.VITE_WASABI_BUCKET,
      Key: key,
      Body: file,
      ContentType: file.type,
    },
  });

  await upload.done();
  return `https://${import.meta.env.VITE_WASABI_BUCKET}.s3.${import.meta.env.VITE_WASABI_REGION}.wasabisys.com/${key}`;
};
