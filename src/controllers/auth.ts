import { Request, Response } from 'express';

export const googleLogin = async (req: Request, res: Response) => {
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
  res.status(200).json({
    access_token: 'mock-access-token'
  });
};
