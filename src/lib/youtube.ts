import { google } from 'googleapis';
import { auth } from './firebase';

const SCOPES = ['https://www.googleapis.com/auth/youtube.upload'];

export const initializeYouTubeAuth = () => {
  return new google.auth.OAuth2(
    import.meta.env.VITE_YOUTUBE_CLIENT_ID,
    import.meta.env.VITE_YOUTUBE_CLIENT_SECRET,
    `${window.location.origin}/auth/youtube/callback`
  );
};

export const getAuthUrl = () => {
  const oauth2Client = initializeYouTubeAuth();
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
};

export const getYouTubeClient = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error('ユーザーが認証されていません');

  // YouTubeアカウント連携状態を確認
  const idTokenResult = await user.getIdTokenResult();
  const youtubeToken = idTokenResult.claims.youtubeToken;

  if (!youtubeToken) {
    throw new Error('YouTubeアカウントが連携されていません');
  }

  const oauth2Client = initializeYouTubeAuth();
  oauth2Client.setCredentials(youtubeToken);

  return google.youtube({ version: 'v3', auth: oauth2Client });
};

export const handleYouTubeCallback = async (code: string) => {
  const oauth2Client = initializeYouTubeAuth();
  const { tokens } = await oauth2Client.getToken(code);
  
  const user = auth.currentUser;
  if (!user) throw new Error('ユーザーが認証されていません');

  // カスタムクレームとしてYouTubeトークンを保存
  await user.getIdToken(true);
  
  return tokens;
};
