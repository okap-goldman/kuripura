import { createMockRequest, createMockResponse } from '../utils/test-utils';
import { unfollow } from '../../controllers/follows';

describe('Unfollow', () => {
  it('should successfully unfollow with valid follow_id', async () => {
    const req = createMockRequest({
      params: {
        follow_id: '123'
      }
    });
    const res = createMockResponse();

    await unfollow(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(204);
  });

  it('should return 404 for non-existent follow_id', async () => {
    const req = createMockRequest({
      params: {
        follow_id: '999999'
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

  it('should return 400 for invalid follow_id format', async () => {
    const req = createMockRequest({
      params: {
        follow_id: 'invalid-id'
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
