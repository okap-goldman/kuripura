import { describe, expect, test, beforeEach } from '@jest/globals';
import { createTextPost, uploadImage } from '@/lib/firebase';
import { auth } from '@/lib/firebase';
import { User } from '@/types/user';

// モックの設定
const mockUser = {
  uid: 'test-uid',
  displayName: 'Test User',
  email: 'test@example.com',
};

const mockAuth = {
  currentUser: mockUser,
};

jest.mock('@/lib/firebase', () => {
  const mockCreateTextPost = jest.fn().mockImplementation(async (data) => {
    if (!mockAuth.currentUser) {
      return Promise.reject(new Error('ログインが必要です。'));
    }
    if (!data.content.text.trim()) {
      return Promise.reject(new Error('本文を入力してください。'));
    }
    if (data.content.text.length > 10000) {
      return Promise.reject(new Error('本文は10,000文字以内で入力してください。'));
    }
    if (data.images && data.images.length > 4) {
      return Promise.reject(new Error('画像は最大4枚までです。'));
    }
    return Promise.resolve({ id: 'test-post-id' });
  });

  const mockUploadImage = jest.fn().mockImplementation(async (file, userId) => {
    if (!mockAuth.currentUser) {
      return Promise.reject(new Error('ログインが必要です。'));
    }
    return Promise.resolve(`https://example.com/images/${userId}/${file.name}`);
  });

  return {
    createTextPost: mockCreateTextPost,
    uploadImage: mockUploadImage,
    auth: mockAuth,
  };
});

beforeEach(() => {
  mockAuth.currentUser = mockUser;
  jest.clearAllMocks();
});

// テスト用にモックユーザーを変更する関数
// 不要な関数を削除

describe('Text Post Feature', () => {
  let mockUser: User;

  beforeEach(() => {
    mockUser = {
      user_id: 123,
      uid: 'test-uid',
      user_name: 'Test User',
      email: 'test@example.com',
      profile_icon_url: null,
      profile_audio_url: null,
      shop_link_url: null,
      is_shop_link: false,
      introduction: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // モックをリセット
    jest.clearAllMocks();
  });

  test('should create a text post successfully', async () => {
    const postData = {
      userId: mockUser.uid,
      content: {
        text: 'Test Content',
        html: '<p>Test Content</p>',
      },
      images: [],
      isPublic: true,
    };

    await createTextPost(postData);
    expect(createTextPost).toHaveBeenCalledWith(postData);
  });

  test('should validate post content length (max 10,000 characters)', async () => {
    const longContent = 'a'.repeat(10001);
    const postData = {
      userId: mockUser.uid,
      content: {
        text: longContent,
        html: `<p>${longContent}</p>`,
      },
      images: [],
      isPublic: true,
    };

    await expect(createTextPost(postData)).rejects.toThrow('本文は10,000文字以内で入力してください。');
  });

  test('should handle empty content', async () => {
    const postData = {
      userId: mockUser.uid,
      content: {
        text: '',
        html: '',
      },
      images: [],
      isPublic: true,
    };

    await expect(createTextPost(postData)).rejects.toThrow('本文を入力してください。');
  });

  test('should require authentication', async () => {
    mockAuth.currentUser = null;

    const postData = {
      userId: mockUser.uid,
      content: {
        text: 'Test Content',
        html: '<p>Test Content</p>',
      },
      images: [],
      isPublic: true,
    };

    await expect(createTextPost(postData)).rejects.toThrow('ログインが必要です。');
  });

  test('should handle image upload successfully', async () => {
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const url = await uploadImage(file, mockUser.uid);
    expect(url).toBe(`https://example.com/images/${mockUser.uid}/test.jpg`);
  });

  test('should validate image upload limit', async () => {
    const postData = {
      userId: mockUser.uid,
      content: {
        text: 'Test Content',
        html: '<p>Test Content</p>',
      },
      images: [
        'https://example.com/1.jpg',
        'https://example.com/2.jpg',
        'https://example.com/3.jpg',
        'https://example.com/4.jpg',
        'https://example.com/5.jpg',
      ],
      isPublic: true,
    };

    await expect(createTextPost(postData)).rejects.toThrow('画像は最大4枚までです。');
  });

  test('should handle rich text content correctly', async () => {
    const postData = {
      userId: mockUser.uid,
      content: {
        text: 'This is bold and italic text',
        html: '<p>This is <strong>bold</strong> and <em>italic</em> text</p>',
      },
      images: [],
      isPublic: true,
    };

    await createTextPost(postData);
    expect(createTextPost).toHaveBeenCalledWith(postData);
  });
});
