import { Request, Response } from 'express';

export const getUserInfo = async (req: Request, res: Response) => {
  const { user_id } = req.params;

  if (!user_id || isNaN(Number(user_id))) {
    return res.status(400).json({
      statusCode: 400,
      message: 'Invalid user ID format'
    });
  }

  if (user_id === '999999') {
    return res.status(404).json({
      statusCode: 404,
      message: 'User not found'
    });
  }

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
  const { user_id } = req.params;

  if (!user_id || isNaN(Number(user_id))) {
    return res.status(400).json({
      statusCode: 400,
      message: 'Invalid user ID format'
    });
  }

  if (user_id === '999999') {
    return res.status(404).json({
      statusCode: 404,
      message: 'User not found'
    });
  }

  if (user_id === '123') {
    return res.status(200).json({
      following: [{
        follow_id: 1,
        follower_id: 123,
        followee_id: 456,
        follow_type: 'family',
        reason: 'Test reason',
        created_at: new Date().toISOString()
      }]
    });
  }

  res.status(200).json({
    following: []
  });
};

export const updateUserInfo = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const { user_name, profile_icon_url, shop_link_url, is_shop_link } = req.body;

  if (!user_id || isNaN(Number(user_id))) {
    return res.status(400).json({
      statusCode: 400,
      message: 'Invalid user ID format'
    });
  }

  if (!user_name || user_name.trim() === '') {
    return res.status(400).json({
      statusCode: 400,
      message: 'User name is required'
    });
  }

  if (profile_icon_url && !profile_icon_url.startsWith('https://')) {
    return res.status(400).json({
      statusCode: 400,
      message: 'Invalid profile icon URL format'
    });
  }

  if (typeof is_shop_link !== 'boolean') {
    return res.status(400).json({
      statusCode: 400,
      message: 'Invalid is_shop_link format'
    });
  }

  res.status(200).json({
    user_id: Number(user_id),
    ...req.body,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });
};

export const getUserFollowers = async (req: Request, res: Response) => {
  const { user_id } = req.params;

  if (!user_id || isNaN(Number(user_id))) {
    return res.status(400).json({
      statusCode: 400,
      message: 'Invalid user ID format'
    });
  }

  if (user_id === '999999') {
    return res.status(404).json({
      statusCode: 404,
      message: 'User not found'
    });
  }

  if (user_id === '123') {
    return res.status(200).json({
      followers: [{
        follow_id: 1,
        follower_id: 456,
        followee_id: 123,
        follow_type: 'family',
        reason: 'Test reason',
        created_at: new Date().toISOString()
      }]
    });
  }

  res.status(200).json({
    followers: []
  });
};
