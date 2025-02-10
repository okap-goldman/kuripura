import { Request, Response } from 'express';

export const googleLogin = async (req: Request, res: Response) => {
  const { code } = req.body;

  // 認証コードのバリデーション
  if (!code) {
    return res.status(400).json({
      statusCode: 400,
      message: 'Authorization code is required'
    });
  }

  // 無効な認証コードの検証
  if (code === 'invalid_code' || code.length < 10) {
    return res.status(400).json({
      statusCode: 400,
      message: 'Invalid authorization code'
    });
  }

  res.status(200).json({
    access_token: 'mock-access-token',
    refresh_token: 'mock-refresh-token',
    user: {
      user_id: 1,
      user_name: 'Test User',
      email: 'test@example.com'
    }
  });
};

export const refreshToken = async (req: Request, res: Response) => {
  const { refresh_token } = req.body;

  // リフレッシュトークンのバリデーション
  if (!refresh_token || typeof refresh_token !== 'string') {
    return res.status(400).json({
      statusCode: 400,
      message: 'Refresh token is required'
    });
  }

  // 無効なリフレッシュトークンの検証
  if (refresh_token === 'invalid_token' || refresh_token.length < 10) {
    return res.status(400).json({
      statusCode: 400,
      message: 'Invalid refresh token format'
    });
  }

  // 期限切れのリフレッシュトークンの検証
  if (refresh_token === 'expired_token') {
    return res.status(400).json({
      statusCode: 400,
      message: 'Refresh token has expired'
    });
  }

  res.status(200).json({
    access_token: 'mock-access-token'
  });
};
