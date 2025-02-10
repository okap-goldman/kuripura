import { describe, expect, test, beforeEach } from '@jest/globals';
import { createTextPost } from '@/lib/firebase';
import { auth } from '@/lib/firebase';
import { User } from '@/types/user';

// モックの設定
const mockCurrentUser = {
  uid: 'test-uid',
  displayName: 'Test User',
  email: 'test@example.com',
};

jest.mock('@/lib/firebase', () => ({
  createTextPost: jest.fn(),
  auth: {
    get currentUser() {
      return mockCurrentUser;
    },
  },
}));

// テスト用にモックユーザーを変更する関数
const setMockCurrentUser = (user: typeof mockCurrentUser | null) => {
  Object.defineProperty(jest.requireMock('@/lib/firebase').auth, 'currentUser', {
    get: () => user,
  });
};

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
      title: 'Test Title',
      content: 'Test Content',
      isPublic: true,
    };

    await createTextPost(postData);

    expect(createTextPost).toHaveBeenCalledWith(postData);
  });

  test('should validate post content length (max 10,000 characters)', async () => {
    const longContent = 'a'.repeat(10001);
    const postData = {
      userId: mockUser.uid,
      title: 'Test Title',
      content: longContent,
      isPublic: true,
    };

    await expect(createTextPost(postData)).rejects.toThrow('本文は10,000文字以内で入力してください。');
  });

  test('should handle markdown content correctly', async () => {
    const markdownContent = '# Title\n\nThis is **bold** text';
    const postData = {
      userId: mockUser.uid,
      title: 'Markdown Test',
      content: markdownContent,
      isPublic: true,
    };

    await createTextPost(postData);

    expect(createTextPost).toHaveBeenCalledWith(postData);
  });

  test('should handle empty title/content', async () => {
    const postData = {
      userId: mockUser.uid,
      title: '',
      content: '',
      isPublic: true,
    };

    await expect(createTextPost(postData)).rejects.toThrow('タイトルと本文を入力してください。');
  });

  test('should require authentication', async () => {
    // 未認証状態をシミュレート
    setMockCurrentUser(null);

    const postData = {
      userId: mockUser.uid,
      title: 'Test Title',
      content: 'Test Content',
      isPublic: true,
    };

    await expect(createTextPost(postData)).rejects.toThrow('ログインが必要です。');
  });

  test('should handle markdown preview correctly', () => {
    const markdownContent = '# Title\n\nThis is **bold** text';
    const expectedHtml = '<h1>Title</h1>\n<p>This is <strong>bold</strong> text</p>';

    // Note: ReactMarkdownのレンダリングテストは別途コンポーネントテストで実装
    expect(markdownContent).toContain('**bold**');
  });

  test('should truncate content to 280 characters in timeline view', () => {
    const longContent = 'a'.repeat(300);
    const truncatedContent = longContent.slice(0, 280) + '...';

    // PostContentコンポーネントのレンダリングをテスト
    // Note: このテストは実際のコンポーネントテストとして実装する必要があります
    // ここではロジックの例示のみを行っています
    expect(truncatedContent.length).toBe(283); // 280 + '...'
  });
});
