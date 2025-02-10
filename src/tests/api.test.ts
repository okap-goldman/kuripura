import { describe, test, expect } from 'vitest';
import axios from 'axios';

const API_BASE_URL = '/api/v1';
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  validateStatus: () => true, // すべてのステータスコードを許可
});

// テストユーザーデータ
const testUser = {
  user_id: 1,
  user_name: 'テストユーザー',
  email: 'test@example.com',
  profile_icon_url: 'https://example.com/icon.jpg',
  profile_audio_url: 'https://example.com/audio.mp3',
  shop_link_url: 'https://example.com/shop',
  is_shop_link: true,
  introduction: 'テストユーザーです',
};

// 認証関連のテスト
describe('認証 API', () => {
  describe('POST /auth/google/login', () => {
    test('正常系: Googleログイン成功', async () => {
      const response = await axiosInstance.post('/auth/google/login', {
        code: 'valid_google_auth_code',
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('access_token');
      expect(response.data).toHaveProperty('refresh_token');
      expect(response.data).toHaveProperty('user');
    });

    test('異常系: 無効な認証コード', async () => {
      const response = await axiosInstance.post('/auth/google/login', {
        code: 'invalid_code',
      });

      expect(response.status).toBe(400);
      expect(response.data).toHaveProperty('message');
    });
  });

  describe('POST /auth/google/refresh', () => {
    test('正常系: トークン更新成功', async () => {
      const response = await axiosInstance.post('/auth/google/refresh', {
        refresh_token: 'valid_refresh_token',
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('access_token');
    });

    test('異常系: 無効なリフレッシュトークン', async () => {
      const response = await axiosInstance.post('/auth/google/refresh', {
        refresh_token: 'invalid_refresh_token',
      });

      expect(response.status).toBe(400);
      expect(response.data).toHaveProperty('message');
    });
  });
});

// ユーザー関連のテスト
describe('ユーザー API', () => {
  describe('GET /users/{user_id}', () => {
    test('正常系: ユーザー情報取得成功', async () => {
      const response = await axiosInstance.get(`/users/${testUser.user_id}`);

      expect(response.status).toBe(200);
      expect(response.data).toMatchObject(testUser);
    });

    test('異常系: 存在しないユーザー', async () => {
      const response = await axiosInstance.get('/users/999999');

      expect(response.status).toBe(404);
      expect(response.data).toHaveProperty('message');
    });
  });

  describe('PUT /users/{user_id}', () => {
    test('正常系: ユーザー情報更新成功', async () => {
      const updateData = {
        user_name: '更新後ユーザー名',
        introduction: '更新後の自己紹介',
      };

      const response = await axiosInstance.put(`/users/${testUser.user_id}`, updateData);

      expect(response.status).toBe(200);
      expect(response.data).toMatchObject({
        ...testUser,
        ...updateData,
      });
    });

    test('異常系: 不正なデータ形式', async () => {
      const response = await axiosInstance.put(`/users/${testUser.user_id}`, {
        user_name: '', // 空文字は不可
      });

      expect(response.status).toBe(400);
      expect(response.data).toHaveProperty('message');
    });
  });
});

// フォロー関連のテスト
describe('フォロー API', () => {
  describe('POST /follows', () => {
    test('正常系: ファミリーフォロー成功', async () => {
      const followData = {
        followee_id: 2,
        follow_type: 'family',
        reason: 'テストフォロー理由',
      };

      const response = await axiosInstance.post('/follows', followData);

      expect(response.status).toBe(201);
      expect(response.data).toMatchObject({
        follower_id: testUser.user_id,
        ...followData,
      });
    });

    test('正常系: ウォッチフォロー成功', async () => {
      const followData = {
        followee_id: 3,
        follow_type: 'watch',
      };

      const response = await axiosInstance.post('/follows', followData);

      expect(response.status).toBe(201);
      expect(response.data).toMatchObject({
        follower_id: testUser.user_id,
        ...followData,
      });
    });

    test('異常系: 自分自身をフォロー', async () => {
      const response = await axiosInstance.post('/follows', {
        followee_id: testUser.user_id,
        follow_type: 'family',
      });

      expect(response.status).toBe(400);
      expect(response.data).toHaveProperty('message');
    });
  });
});

// 投稿関連のテスト
describe('投稿 API', () => {
  describe('POST /posts', () => {
    test('正常系: テキスト投稿作成', async () => {
      const postData = {
        post_type: 'text',
        title: 'テスト投稿',
        text_content: 'これはテスト投稿です。',
      };

      const response = await axiosInstance.post('/posts', postData);

      expect(response.status).toBe(201);
      expect(response.data).toMatchObject({
        user_id: testUser.user_id,
        ...postData,
      });
    });

    test('正常系: 動画投稿作成', async () => {
      const postData = {
        post_type: 'video',
        title: 'テスト動画',
        youtube_url: 'https://youtube.com/watch?v=test',
        visibility: 'public',
      };

      const response = await axiosInstance.post('/posts', postData);

      expect(response.status).toBe(201);
      expect(response.data).toMatchObject({
        user_id: testUser.user_id,
        ...postData,
      });
    });

    test('異常系: 必須フィールド欠落', async () => {
      const response = await axiosInstance.post('/posts', {
        post_type: 'text',
        // titleが欠落
        text_content: 'テスト',
      });

      expect(response.status).toBe(400);
      expect(response.data).toHaveProperty('message');
    });
  });

  describe('GET /posts', () => {
    test('正常系: ファミリータイムライン取得', async () => {
      const response = await axiosInstance.get('/posts', {
        params: {
          type: 'family',
          offset: 0,
          limit: 20,
        },
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('posts');
      expect(Array.isArray(response.data.posts)).toBe(true);
    });

    test('正常系: ウォッチタイムライン取得', async () => {
      const response = await axiosInstance.get('/posts', {
        params: {
          type: 'watch',
          offset: 0,
          limit: 20,
        },
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('posts');
      expect(Array.isArray(response.data.posts)).toBe(true);
    });
  });
});

// コメント関連のテスト
describe('コメント API', () => {
  const testPostId = 1;

  describe('POST /posts/{post_id}/comments', () => {
    test('正常系: コメント投稿成功', async () => {
      const commentData = {
        content: 'テストコメントです。',
      };

      const response = await axiosInstance.post(`/posts/${testPostId}/comments`, commentData);

      expect(response.status).toBe(201);
      expect(response.data).toMatchObject({
        post_id: testPostId,
        user_id: testUser.user_id,
        ...commentData,
      });
    });

    test('異常系: 空のコメント', async () => {
      const response = await axiosInstance.post(`/posts/${testPostId}/comments`, {
        content: '',
      });

      expect(response.status).toBe(400);
      expect(response.data).toHaveProperty('message');
    });
  });

  describe('GET /posts/{post_id}/comments', () => {
    test('正常系: コメント一覧取得', async () => {
      const response = await axiosInstance.get(`/posts/${testPostId}/comments`, {
        params: {
          offset: 0,
          limit: 20,
        },
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('comments');
      expect(Array.isArray(response.data.comments)).toBe(true);
    });
  });
});

// イベント関連のテスト
describe('イベント API', () => {
  describe('POST /events', () => {
    test('正常系: イベント作成成功', async () => {
      const eventData = {
        event_name: 'テストイベント',
        content: 'テストイベントの説明',
        capacity: 10,
        price: 1000,
        recruit_start: '2024-03-01T00:00:00Z',
        recruit_end: '2024-03-10T00:00:00Z',
        location: '東京都渋谷区',
        event_start: '2024-03-15T10:00:00Z',
        event_end: '2024-03-15T17:00:00Z',
        organizer_id: testUser.user_id,
      };

      const response = await axiosInstance.post('/events', eventData);

      expect(response.status).toBe(201);
      expect(response.data).toMatchObject(eventData);
    });

    test('異常系: 必須フィールド欠落', async () => {
      const response = await axiosInstance.post('/events', {
        event_name: 'テストイベント',
        // 他の必須フィールドが欠落
      });

      expect(response.status).toBe(400);
      expect(response.data).toHaveProperty('message');
    });
  });

  describe('GET /events', () => {
    test('正常系: イベント検索（条件指定あり）', async () => {
      const response = await axiosInstance.get('/events', {
        params: {
          location: '東京',
          min_price: 0,
          max_price: 5000,
          start_date: '2024-03-01T00:00:00Z',
          end_date: '2024-03-31T23:59:59Z',
          offset: 0,
          limit: 20,
        },
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('events');
      expect(Array.isArray(response.data.events)).toBe(true);
    });

    test('正常系: イベント検索（条件指定なし）', async () => {
      const response = await axiosInstance.get('/events', {
        params: {
          offset: 0,
          limit: 20,
        },
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('events');
      expect(Array.isArray(response.data.events)).toBe(true);
    });
  });
});

// ショップ関連のテスト
describe('ショップ API', () => {
  describe('POST /shops', () => {
    test('正常系: ショップ作成成功', async () => {
      const shopData = {
        shop_name: 'テストショップ',
        description: 'テストショップの説明',
      };

      const response = await axiosInstance.post('/shops', shopData);

      expect(response.status).toBe(201);
      expect(response.data).toMatchObject({
        user_id: testUser.user_id,
        ...shopData,
      });
    });

    test('異常系: 必須フィールド欠落', async () => {
      const response = await axiosInstance.post('/shops', {
        // shop_nameが欠落
        description: 'テストショップの説明',
      });

      expect(response.status).toBe(400);
      expect(response.data).toHaveProperty('message');
    });
  });

  describe('POST /shops/{shop_id}/products', () => {
    const testShopId = 1;

    test('正常系: 商品登録成功', async () => {
      const productData = {
        product_name: 'テスト商品',
        description: 'テスト商品の説明',
        price: 1000,
        image_url: 'https://example.com/product.jpg',
      };

      const response = await axiosInstance.post(`/shops/${testShopId}/products`, productData);

      expect(response.status).toBe(201);
      expect(response.data).toMatchObject({
        shop_id: testShopId,
        ...productData,
      });
    });

    test('異常系: 不正な価格', async () => {
      const response = await axiosInstance.post(`/shops/${testShopId}/products`, {
        product_name: 'テスト商品',
        description: 'テスト商品の説明',
        price: -1000, // 負の価格は不可
        image_url: 'https://example.com/product.jpg',
      });

      expect(response.status).toBe(400);
      expect(response.data).toHaveProperty('message');
    });
  });
});

// 検索 API のテスト
describe('検索 API', () => {
  describe('GET /search', () => {
    test('正常系: キーワード検索成功', async () => {
      const response = await axiosInstance.get('/search', {
        params: {
          keyword: 'テスト',
          offset: 0,
          limit: 20,
        },
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('users');
      expect(response.data).toHaveProperty('posts');
      expect(response.data).toHaveProperty('events');
      expect(Array.isArray(response.data.users)).toBe(true);
      expect(Array.isArray(response.data.posts)).toBe(true);
      expect(Array.isArray(response.data.events)).toBe(true);
    });

    test('異常系: 空のキーワード', async () => {
      const response = await axiosInstance.get('/search', {
        params: {
          keyword: '',
          offset: 0,
          limit: 20,
        },
      });

      expect(response.status).toBe(400);
      expect(response.data).toHaveProperty('message');
    });
  });
});

// 管理者 API のテスト
describe('管理者 API', () => {
  const adminToken = 'admin_bearer_token';

  describe('GET /admin/users', () => {
    test('正常系: ユーザー一覧取得成功', async () => {
      const response = await axiosInstance.get('/admin/users', {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        params: {
          offset: 0,
          limit: 20,
        },
      });

      expect(response.status).toBe(200);
      expect(response.data).toHaveProperty('users');
      expect(Array.isArray(response.data.users)).toBe(true);
    });

    test('異常系: 権限なし', async () => {
      const response = await axiosInstance.get('/admin/users', {
        headers: {
          Authorization: 'Bearer invalid_token',
        },
      });

      expect(response.status).toBe(403);
      expect(response.data).toHaveProperty('message');
    });
  });

  describe('PUT /admin/users/{user_id}/block', () => {
    test('正常系: ユーザー停止成功', async () => {
      const response = await axiosInstance.put(`/admin/users/${testUser.user_id}/block`, null, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      expect(response.status).toBe(204);
    });

    test('異常系: 権限なし', async () => {
      const response = await axiosInstance.put(`/admin/users/${testUser.user_id}/block`, null, {
        headers: {
          Authorization: 'Bearer invalid_token',
        },
      });

      expect(response.status).toBe(403);
      expect(response.data).toHaveProperty('message');
    });
  });
}); 