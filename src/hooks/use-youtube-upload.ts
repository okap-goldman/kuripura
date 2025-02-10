import { useState } from 'react';
import { getYouTubeClient, getAuthUrl, handleYouTubeCallback } from '@/lib/youtube';

export const useYouTubeUpload = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const uploadVideo = async (file: File, title: string, isPublic: boolean) => {
    setIsUploading(true);
    setError(null);
    setProgress(0);

    try {
      const youtube = await getYouTubeClient().catch(async (error) => {
        if (error.message === 'YouTubeアカウントが連携されていません') {
          // YouTubeアカウント連携が必要な場合
          const authUrl = getAuthUrl();
          window.location.href = authUrl;
          throw new Error('YouTubeアカウントの連携が必要です');
        }
        throw error;
      });

      const response = await youtube.videos.insert({
        part: ['snippet', 'status'],
        requestBody: {
          snippet: {
            title,
            description: '',
          },
          status: {
            privacyStatus: isPublic ? 'public' : 'unlisted',
          },
        },
        media: {
          body: file,
        },
      }, {
        onUploadProgress: (e) => {
          const progress = Math.round((e.bytesRead / file.size) * 100);
          setProgress(progress);
        },
      });

      if (response.data.id) {
        const url = `https://youtube.com/watch?v=${response.data.id}`;
        setVideoUrl(url);
        return url;
      }
    } catch (err) {
      const errorMessage = err.message === 'YouTubeアカウントの連携が必要です'
        ? err.message
        : '動画のアップロードに失敗しました';
      setError(errorMessage);
      console.error('Upload error:', err);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  return { 
    uploadVideo, 
    progress, 
    error, 
    videoUrl, 
    isUploading 
  };
};
