import { Request, Response } from 'express';

export const getUserInfo = async (req: Request, res: Response) => {
  res.status(200).json({
    user_id: 1,
    user_name: 'Test User',
    email: 'test@example.com',
    profile_icon_url: 'https://example.com/icon.jpg',
    profile_audio_url: 'https://example.com/audio.mp3',
    shop_link_url: 'https://example.com/shop',
    is_shop_link: true,
    introduction: 'Test introduction',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });
};

export const getUserFollowing = async (req: Request, res: Response) => {
  res.status(200).json({
    following: []
  });
};

export const updateUserInfo = async (req: Request, res: Response) => {
  res.status(200).json({
    user_id: 1,
    ...req.body,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });
};

export const getUserFollowers = async (req: Request, res: Response) => {
  res.status(200).json({
    followers: []
  });
};
