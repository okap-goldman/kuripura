import { createMockRequest, createMockResponse } from '../utils/test-utils';
import { googleLogin } from '../../controllers/auth';

describe('Google Login', () => {
  it('should return JWT tokens and user info on successful login', async () => {
    const req = createMockRequest({
      body: {
        code: 'valid-google-auth-code'
      }
    });
    const res = createMockResponse();

    await googleLogin(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        access_token: expect.any(String),
        refresh_token: expect.any(String),
        user: expect.objectContaining({
          user_id: expect.any(Number),
          user_name: expect.any(String),
          email: expect.any(String)
        })
      })
    );
  });

  it('should return 400 on invalid auth code', async () => {
    const req = createMockRequest({
      body: {
        code: 'invalid-code'
      }
    });
    const res = createMockResponse();

    await googleLogin(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 400,
        message: expect.any(String)
      })
    );
  });
});
