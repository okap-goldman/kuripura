import { Request, Response } from 'express';

type PostType = 'text' | 'image' | 'video' | 'audio';
type Visibility = 'public' | 'private' | 'followers';

export const createPost = async (req: Request, res: Response) => {
  const { 
    content,
    post_type,
    visibility,
    media_url,
    thumbnail_url
  } = req.body;

  // 必須フィールドのチェック
  if (!content || !post_type || !visibility) {
    return res.status(400).json({
      statusCode: 400,
      message: 'Missing required fields'
    });
  }

  // 投稿タイプの検証
  if (!['text', 'image', 'video', 'audio'].includes(post_type)) {
    return res.status(400).json({
      statusCode: 400,
      message: 'Invalid post type'
    });
  }

  // 可視性の検証
  if (!['public', 'private', 'followers'].includes(visibility)) {
    return res.status(400).json({
      statusCode: 400,
      message: 'Invalid visibility'
    });
  }

  // メディア投稿の場合のURLチェック
  if (post_type !== 'text') {
    if (!media_url) {
      return res.status(400).json({
        statusCode: 400,
        message: `media_url is required for ${post_type} post`
      });
    }

    if (!media_url.startsWith('https://')) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Invalid URL format'
      });
    }

    // サムネイルURLのチェック（動画の場合は必須）
    if (post_type === 'video') {
      if (!thumbnail_url) {
        return res.status(400).json({
          statusCode: 400,
          message: 'thumbnail_url is required for video post'
        });
      }

      if (!thumbnail_url.startsWith('https://')) {
        return res.status(400).json({
          statusCode: 400,
          message: 'Invalid thumbnail URL format'
        });
      }
    }
  }

  res.status(201).json({
    post_id: 1,
    user_id: 1,
    content,
    post_type,
    visibility,
    media_url,
    thumbnail_url,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });
};
