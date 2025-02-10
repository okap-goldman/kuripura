import { createMockRequest, createMockResponse } from '../utils/test-utils';
import { createFollow } from '../../controllers/follows';

describe('Create Follow', () => {
  it('should create family follow with reason successfully', async () => {
    const req = createMockRequest({
      body: {
        followee_id: 123,
        follow_type: 'family',
        reason: 'Great content creator'
      }
    });
    const res = createMockResponse();

    await createFollow(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        follow_id: expect.any(Number),
        follower_id: expect.any(Number),
        followee_id: 123,
        follow_type: 'family',
        reason: 'Great content creator',
        created_at: expect.any(String)
      })
    );
  });

  it('should create watch follow successfully', async () => {
    const req = createMockRequest({
      body: {
        followee_id: 456,
        follow_type: 'watch'
      }
    });
    const res = createMockResponse();

    await createFollow(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        follow_id: expect.any(Number),
        follower_id: expect.any(Number),
        followee_id: 456,
        follow_type: 'watch',
        created_at: expect.any(String)
      })
    );
  });

  it('should return 400 for invalid followee_id', async () => {
    const req = createMockRequest({
      body: {
        followee_id: 'invalid-id',
        follow_type: 'watch'
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

  it('should validate all required fields in the response schema', async () => {
    const req = createMockRequest({
      body: {
        followee_id: 123,
        follow_type: 'family',
        reason: 'Great content creator'
      }
    });
    const res = createMockResponse();

    await createFollow(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      follow_id: expect.any(Number),
      follower_id: expect.any(Number),
      followee_id: 123,
      follow_type: 'family',
      reason: 'Great content creator',
      created_at: expect.stringMatching(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
    });
  });
});
