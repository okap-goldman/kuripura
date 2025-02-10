import { jest, describe, it, expect } from '@jest/globals';
import { createMockRequest, createMockResponse } from '../utils/test-utils';
import { createFollow } from '../../controllers/follows';
import { prismaMock } from '../utils/mock-db';
import { NotificationService } from '../../services/notification';

jest.mock('../../services/notification', () => ({
  NotificationService: {
    create: jest.fn()
  }
}));

/**
 * フォロー作成のテストケース
 * - ファミリーフォロー（理由必須）
 * - ウォッチフォロー（理由不要）
 * - バリデーションエラー
 */
describe('Create Follow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ファミリーフォローを理由付きで作成できることを確認
  it('should create family follow with reason successfully', async () => {
    const mockFollow = {
      id: 1,
      followerId: 1,
      followeeId: parseInt("123"),
      followType: 'family',
      reason: 'Great content creator',
      createdAt: new Date()
    };

    prismaMock.follow.create.mockResolvedValue(mockFollow);
    jest.spyOn(NotificationService, 'create').mockResolvedValue();

    const req = createMockRequest({
      body: {
        followee_id: 123,
        follow_type: 'family',
        reason: 'Great content creator'
      },
      user: { id: 1 }
    });
    const res = createMockResponse();

    await createFollow(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockFollow);
    expect(NotificationService.create).toHaveBeenCalledWith({
      user_id: 123,
      from_user_id: 1,
      notification_type: 'follow',
      message: 'Great content creator'
    });
  });

  // ウォッチフォローを作成できることを確認（理由は不要）
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create watch follow successfully', async () => {
    const mockFollow = {
      id: 2,
      followerId: 1,
      followeeId: parseInt("456"),
      followType: 'watch',
      reason: null,
      createdAt: new Date()
    };

    prismaMock.follow.create.mockResolvedValue(mockFollow);
    jest.spyOn(NotificationService, 'create').mockResolvedValue();

    const req = createMockRequest({
      body: {
        followee_id: 456,
        follow_type: 'watch'
      },
      user: { id: 1 }
    });
    const res = createMockResponse();

    await createFollow(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockFollow);
    expect(NotificationService.create).not.toHaveBeenCalled();
  });

  // フォロー対象のユーザーIDが不正な場合は400エラーを返すことを確認
  it('should return 400 for invalid followee_id', async () => {
    prismaMock.follow.create.mockRejectedValue(new Error('Invalid followee_id'));

    const req = createMockRequest({
      body: {
        followee_id: 'invalid-id',
        follow_type: 'watch'
      },
      user: { id: 1 }
    });
    const res = createMockResponse();

    await createFollow(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 400,
        message: expect.any(String)
      })
    );
  });

  // フォロータイプが不正な場合は400エラーを返すことを確認
  it('should return 400 for invalid follow_type', async () => {
    const req = createMockRequest({
      body: {
        followee_id: 123,
        follow_type: 'invalid-type'
      }
    });
    const res = createMockResponse();

    await createFollow(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 400,
        message: expect.any(String)
      })
    );
  });

  // 必須フィールドが欠けている場合は400エラーを返すことを確認
  it('should return 400 for missing required fields', async () => {
    const req = createMockRequest({
      body: {
        followee_id: 123
      }
    });
    const res = createMockResponse();

    await createFollow(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 400,
        message: expect.any(String)
      })
    );
  });

  // ファミリーフォローで理由が欠けている場合は400エラーを返すことを確認
  it('should return 400 for missing reason in family follow', async () => {
    const req = createMockRequest({
      body: {
        followee_id: 123,
        follow_type: 'family'
      }
    });
    const res = createMockResponse();

    await createFollow(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 400,
        message: expect.any(String)
      })
    );
  });

  // ファミリーフォローで理由が空文字の場合は400エラーを返すことを確認
  it('should return 400 for empty reason in family follow', async () => {
    const req = createMockRequest({
      body: {
        followee_id: 123,
        follow_type: 'family',
        reason: ''
      }
    });
    const res = createMockResponse();

    await createFollow(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 400,
        message: expect.any(String)
      })
    );
  });

  // レスポンスのスキーマが全ての必須フィールドを含んでいることを確認
  it('should validate all required fields in the response schema', async () => {
    const mockFollow = {
      id: 3,
      followerId: 1,
      followeeId: 123,
      followType: 'family',
      reason: 'Great content creator',
      createdAt: new Date()
    };

    prismaMock.follow.create.mockResolvedValue(mockFollow);
    jest.spyOn(NotificationService, 'create').mockResolvedValue();

    const req = createMockRequest({
      body: {
        followee_id: 123,
        follow_type: 'family',
        reason: 'Great content creator'
      },
      user: { id: 1 }
    });
    const res = createMockResponse();

    await createFollow(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockFollow);
  });
});
