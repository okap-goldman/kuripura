import { render, fireEvent, waitFor } from '@testing-library/react';
import ProfileEditForm from '@/pages/profile/edit-form';
import { useAuth } from '@/contexts/AuthContext';
import { uploadProfileImage } from '@/lib/storage';
import type { User } from '@/types/user';

jest.mock('@/contexts/AuthContext');
jest.mock('@/lib/storage');

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockUploadProfileImage = uploadProfileImage as jest.MockedFunction<typeof uploadProfileImage>;

describe('ProfileEditForm', () => {
  const mockProfile: {
    name: string;
    username: string;
    image: string;
    bio: string;
    bioAudioUrl: string;
    externalLink?: string;
    pronouns?: string;
  } = {
    name: 'Test User',
    username: 'testuser',
    image: 'https://example.com/test.jpg',
    bio: 'Test bio',
    bioAudioUrl: '',
    externalLink: '',
    pronouns: '',
  };

  const mockUpdateProfile = jest.fn() as jest.MockedFunction<(data: Partial<User>) => Promise<void>>;
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({
      user: null,
      isLoading: false,
      isInitialized: true,
      login: jest.fn(),
      logout: jest.fn(),
      updateProfile: mockUpdateProfile,
    });
  });

  test('should update user profile without image change', async () => {
    const { getByText, getByLabelText } = render(
      <ProfileEditForm
        profile={mockProfile}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // フォームの入力を変更
    fireEvent.change(getByLabelText('名前'), { target: { value: 'Updated Name' } });
    fireEvent.change(getByLabelText('自己紹介'), { target: { value: 'Updated bio' } });
    fireEvent.change(getByLabelText('リンク'), { target: { value: 'https://example.com' } });

    // フォームを送信
    fireEvent.click(getByText('完了'));

    await waitFor(() => {
      expect(mockUpdateProfile).toHaveBeenCalledWith({
        user_name: 'Updated Name',
        profile_icon_url: mockProfile.image,
        introduction: 'Updated bio',
        shop_link_url: 'https://example.com',
        is_shop_link: true,
      });
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  test('should update user profile with image change', async () => {
    const newImageUrl = 'https://example.com/new.jpg';
    mockUploadProfileImage.mockResolvedValue(newImageUrl);

    const { getByText, container } = render(
      <ProfileEditForm
        profile={mockProfile}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // 画像ファイルを選択
    const file = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [file] } });

    // フォームを送信
    fireEvent.click(getByText('完了'));

    await waitFor(() => {
      expect(mockUploadProfileImage).toHaveBeenCalledWith(file);
      expect(mockUpdateProfile).toHaveBeenCalledWith(expect.objectContaining({
        profile_icon_url: newImageUrl,
      }));
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  test('should handle update error', async () => {
    const error = new Error('Update failed');
    mockUpdateProfile.mockRejectedValue(error);
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation();

    const { getByText } = render(
      <ProfileEditForm
        profile={mockProfile}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    // フォームを送信
    fireEvent.click(getByText('完了'));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('プロフィールの更新に失敗しました:', error);
      expect(alertSpy).toHaveBeenCalledWith('プロフィールの更新に失敗しました。もう一度お試しください。');
      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
    alertSpy.mockRestore();
  });
});
