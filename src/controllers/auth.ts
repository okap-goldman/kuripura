import { Request, Response } from 'express';

export const googleLogin = async (req: Request, res: Response) => {
  const { code } = req.body;

  if (!code || code === 'invalid_code') {
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

  if (!refresh_token) {
    return res.status(400).json({
      statusCode: 400,
      message: 'Invalid refresh token'
    });
  }

  if (refresh_token === 'expired_token') {
    return res.status(400).json({
      statusCode: 400,
      message: 'Refresh token has expired'
    });
  }

  if (refresh_token === 'invalid_token') {
    return res.status(400).json({
      statusCode: 400,
      message: 'Invalid refresh token'
    });
  }

  res.status(200).json({
    access_token: 'mock-access-token'
  });
};
