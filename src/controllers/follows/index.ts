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
    // followee_idが数値であることを確認
    const followeeId = parseInt(followee_id);
    if (isNaN(followeeId)) {
      return res.status(400).json({
        statusCode: 400,
        message: 'フォロー対象のユーザーIDが不正です'
      });
    }

    // フォロー情報の作成
    const follow = await db.follow.create({
      data: {
        followerId: req.user.id,
        followeeId: followeeId,
        followType: follow_type,
        reason: follow_type === 'family' ? reason : null,
        createdAt: new Date()
      }
    });

    // 通知の作成（ファミリーの場合のみ）
    if (follow_type === 'family') {
      await NotificationService.create({
        user_id: follow.followeeId,
        from_user_id: req.user.id,
        notification_type: 'follow',
        message: reason
      });
    }

    res.status(201).json(follow);
  } catch (error) {
    if (error instanceof Error) {
      const message = error.message.toLowerCase();
      if (message.includes('invalid') || message.includes('parse')) {
        return res.status(400).json({
          statusCode: 400,
          message: 'フォロー対象のユーザーIDが不正です'
        });
      }
    }
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
    const followId = parseInt(follow_id);
    if (isNaN(followId)) {
      return res.status(400).json({
        statusCode: 400,
        message: 'フォローIDは数値である必要があります'
      });
    }

    // フォロー情報の取得（存在確認のため）
    const follow = await db.follow.findUnique({
      where: { id: followId }
    });

    if (!follow) {
      return res.status(404).json({
        statusCode: 404,
        message: 'フォロー情報が見つかりません'
      });
    }

    // フォロー情報の削除
    await db.follow.delete({
      where: { id: followId }
    });

    // アンフォロー理由をログに保存
    await db.unfollowLog.create({
      data: {
        followId: followId,
        reason,
        createdAt: new Date()
      }
    });

    res.status(200).json({ message: 'アンフォローしました' });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Invalid')) {
        return res.status(400).json({
          statusCode: 400,
          message: 'フォローIDが不正です'
        });
      }
    }
    res.status(500).json({
      statusCode: 500,
      message: 'アンフォローに失敗しました'
    });
  }
};
