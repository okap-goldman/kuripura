import { jest, describe, it, expect } from '@jest/globals';
import { createMockRequest, createMockResponse } from '../utils/test-utils';
import { unfollow } from '../../controllers/follows';
import { prismaMock } from '../utils/mock-db';

/**
 * アンフォロー機能のテストケース
 * - 正常系：有効なフォローIDでアンフォロー
 * - 異常系：存在しないフォローID
 * - 異常系：不正なフォローIDフォーマット
 */
describe('Unfollow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 有効なフォローIDでアンフォローできることを確認
  it('should successfully unfollow with valid follow_id', async () => {
    const mockFollow = {
      id: 123,
      followerId: 1,
      followeeId: 456,
      followType: 'family',
      reason: 'Great content creator',
      createdAt: new Date()
    };

    prismaMock.follow.findUnique.mockResolvedValue(mockFollow);
    prismaMock.follow.delete.mockResolvedValue(mockFollow);
    prismaMock.unfollowLog.create.mockResolvedValue({
      id: 1,
      followId: 123,
      reason: 'No longer interested',
      createdAt: new Date()
    });

    const req = createMockRequest({
      params: {
        follow_id: 123
      },
      body: {
        reason: 'No longer interested'
      }
    });
    const res = createMockResponse();

    await unfollow(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  // 存在しないフォローIDの場合は404エラーを返すことを確認
  it('should return 404 for non-existent follow_id', async () => {
    prismaMock.follow.findUnique.mockResolvedValue(null);

    const req = createMockRequest({
      params: {
        follow_id: 999999
      },
      body: {
        reason: 'No longer interested'
      }
    });
    const res = createMockResponse();

    await unfollow(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 404,
        message: expect.any(String)
      })
    );
  });

  // フォローIDのフォーマットが不正な場合は400エラーを返すことを確認
  it('should return 400 for invalid follow_id format', async () => {
    const req = createMockRequest({
      params: {
        follow_id: 'abc'
      },
      body: {
        reason: 'No longer interested'
      }
    });
    const res = createMockResponse();

    await unfollow(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 400,
        message: expect.any(String)
      })
    );
  });
});
