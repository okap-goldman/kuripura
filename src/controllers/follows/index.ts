import { Request, Response } from 'express';
import { db } from '@/lib/db';
import { NotificationService } from '@/services/notification';

/**
 * フォロー作成
 * @param req リクエスト
 * @param res レスポンス
 */
export const createFollow = async (req: Request, res: Response) => {
  const { followee_id, follow_type, reason } = req.body;
  
  // バリデーション
  if (!followee_id || !follow_type) {
    return res.status(400).json({
      statusCode: 400,
      message: 'followee_idとfollow_typeは必須です'
    });
  }

  if (follow_type === 'family' && !reason) {
    return res.status(400).json({
      statusCode: 400,
      message: 'ファミリーフォローには理由が必要です'
    });
  }

  if (follow_type !== 'family' && follow_type !== 'watch') {
    return res.status(400).json({
      statusCode: 400,
      message: 'follow_typeはfamilyまたはwatchである必要があります'
    });
  }

  try {
    const follow = await db.follow.create({
      data: {
        followerId: req.user.id,
        followeeId: followee_id,
        followType: follow_type,
        reason: follow_type === 'family' ? reason : null,
        createdAt: new Date()
      }
    });

    // 通知の作成（ファミリーの場合のみ）
    if (follow_type === 'family') {
      await NotificationService.create({
        user_id: followee_id,
        from_user_id: req.user.id,
        notification_type: 'follow',
        message: reason
      });
    }

    res.status(201).json(follow);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: 'フォローの作成に失敗しました'
    });
  }
};

/**
 * アンフォロー
 * @param req リクエスト
 * @param res レスポンス
 */
export const unfollow = async (req: Request, res: Response) => {
  const { follow_id } = req.params;
  const { reason } = req.body;

  if (!reason) {
    return res.status(400).json({
      statusCode: 400,
      message: 'アンフォロー理由は必須です'
    });
  }

  try {
    // フォロー情報の取得（存在確認のため）
    const follow = await db.follow.findUnique({
      where: { id: parseInt(follow_id) }
    });

    if (!follow) {
      return res.status(404).json({
        statusCode: 404,
        message: 'フォロー情報が見つかりません'
      });
    }

    // フォロー情報の削除
    await db.follow.delete({
      where: { id: parseInt(follow_id) }
    });

    // アンフォロー理由をログに保存
    await db.unfollowLog.create({
      data: {
        followId: parseInt(follow_id),
        reason,
        createdAt: new Date()
      }
    });

    res.status(200).json({ message: 'アンフォローしました' });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: 'アンフォローに失敗しました'
    });
  }
};
