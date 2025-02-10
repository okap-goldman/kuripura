import { createMockRequest, createMockResponse } from '../utils/test-utils';
import { createPost } from '../../controllers/posts';

/**
 * 投稿作成のテストケース
 * - 各投稿タイプ（動画、画像、音声、テキスト）の正常系テスト
 * - 必須フィールドの検証
 * - レスポンススキーマの検証
 * - エラーケースの検証
 */
describe('Create Post', () => {
  // 動画投稿の正常系テスト
  it('should create video post successfully', async () => {
    const req = createMockRequest({
      body: {
        post_type: 'video',
        title: 'Test Video Post',
        youtube_url: 'https://youtube.com/watch?v=test',
        visibility: 'public'
      }
    });
    const res = createMockResponse();

    await createPost(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        post_id: expect.any(Number),
        user_id: expect.any(Number),
        post_type: 'video',
        title: 'Test Video Post',
        youtube_url: 'https://youtube.com/watch?v=test',
        visibility: 'public',
        created_at: expect.any(String),
        updated_at: expect.any(String)
      })
    );
  });

  // 画像投稿の正常系テスト
  it('should create image post successfully', async () => {
    const req = createMockRequest({
      body: {
        post_type: 'image',
        title: 'Test Image Post',
        image_urls: [
          'https://example.com/image1.jpg',
          'https://example.com/image2.jpg'
        ]
      }
    });
    const res = createMockResponse();

    await createPost(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        post_id: expect.any(Number),
        user_id: expect.any(Number),
        post_type: 'image',
        title: 'Test Image Post',
        image_urls: expect.arrayContaining([
          'https://example.com/image1.jpg',
          'https://example.com/image2.jpg'
        ]),
        created_at: expect.any(String),
        updated_at: expect.any(String)
      })
    );
  });

  // 音声投稿の正常系テスト
  it('should create audio post successfully', async () => {
    const req = createMockRequest({
      body: {
        post_type: 'audio',
        title: 'Test Audio Post',
        audio_url: 'https://example.com/audio.mp3'
      }
    });
    const res = createMockResponse();

    await createPost(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        post_id: expect.any(Number),
        user_id: expect.any(Number),
        post_type: 'audio',
        title: 'Test Audio Post',
        audio_url: 'https://example.com/audio.mp3',
        created_at: expect.any(String),
        updated_at: expect.any(String)
      })
    );
  });

  // テキスト投稿の正常系テスト
  it('should create text post successfully', async () => {
    const req = createMockRequest({
      body: {
        post_type: 'text',
        title: 'Test Text Post',
        text_content: 'This is a test text post content.'
      }
    });
    const res = createMockResponse();

    await createPost(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        post_id: expect.any(Number),
        user_id: expect.any(Number),
        post_type: 'text',
        title: 'Test Text Post',
        text_content: 'This is a test text post content.',
        created_at: expect.any(String),
        updated_at: expect.any(String)
      })
    );
  });

  // イベント関連投稿の正常系テスト
  it('should create post with event successfully', async () => {
    const req = createMockRequest({
      body: {
        post_type: 'text',
        title: 'Test Event Post',
        text_content: 'This is a test event post content.',
        event_id: 123
      }
    });
    const res = createMockResponse();

    await createPost(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        post_id: expect.any(Number),
        user_id: expect.any(Number),
        post_type: 'text',
        title: 'Test Event Post',
        text_content: 'This is a test event post content.',
        event_id: 123,
        created_at: expect.any(String),
        updated_at: expect.any(String)
      })
    );
  });

  // 必須フィールドが欠けている場合のエラーテスト
  it('should return 400 for missing required fields', async () => {
    const req = createMockRequest({
      body: {
        post_type: 'text'
        // titleが欠けている
      }
    });
    const res = createMockResponse();

    await createPost(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 400,
        message: expect.any(String)
      })
    );
  });

  // 投稿タイプに応じた必須フィールドが欠けている場合のエラーテスト
  it('should return 400 for missing type-specific required fields', async () => {
    const req = createMockRequest({
      body: {
        post_type: 'video',
        title: 'Test Video Post'
        // youtube_urlが欠けている
      }
    });
    const res = createMockResponse();

    await createPost(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 400,
        message: expect.any(String)
      })
    );
  });

  // 不正な投稿タイプの場合のエラーテスト
  it('should return 400 for invalid post type', async () => {
    const req = createMockRequest({
      body: {
        post_type: 'invalid-type',
        title: 'Test Post'
      }
    });
    const res = createMockResponse();

    await createPost(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 400,
        message: expect.any(String)
      })
    );
  });

  // 不正なURLフォーマットの場合のエラーテスト
  it('should return 400 for invalid URL format', async () => {
    const req = createMockRequest({
      body: {
        post_type: 'video',
        title: 'Test Video Post',
        youtube_url: 'invalid-url'
      }
    });
    const res = createMockResponse();

    await createPost(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 400,
        message: expect.any(String)
      })
    );
  });

  // 不正な公開範囲の場合のエラーテスト
  it('should return 400 for invalid visibility', async () => {
    const req = createMockRequest({
      body: {
        post_type: 'video',
        title: 'Test Video Post',
        youtube_url: 'https://youtube.com/watch?v=test',
        visibility: 'invalid-visibility'
      }
    });
    const res = createMockResponse();

    await createPost(req as any, res as any);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 400,
        message: expect.any(String)
      })
    );
  });
});
