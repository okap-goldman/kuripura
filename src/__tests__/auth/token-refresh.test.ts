import { createMockRequest, createMockResponse } from '../utils/test-utils';
import { refreshToken } from '../../controllers/auth';

describe('Token Refresh', () => {
  it('should return new access token on successful refresh', async () => {
    const req = createMockRequest({
      body: {
        refresh_token: 'valid-refresh-token'
      }
    });
    const res = createMockResponse();

    await refreshToken(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        access_token: expect.any(String)
      })
    );
  });

  it('should return 400 on invalid refresh token', async () => {
    const req = createMockRequest({
      body: {
        refresh_token: 'invalid-refresh-token'
      }
    });
    const res = createMockResponse();

    await refreshToken(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 400,
        message: expect.any(String)
      })
    );
  });

  it('should return 400 on expired refresh token', async () => {
    const req = createMockRequest({
      body: {
        refresh_token: 'expired-refresh-token'
      }
    });
    const res = createMockResponse();

    await refreshToken(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 400,
        message: expect.any(String)
      })
    );
  });
});
