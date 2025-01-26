import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { ProfileScreen } from '../src/screens/profile/ProfileScreen';

jest.useFakeTimers();

describe('ProfileScreen', () => {
  test('プロフィール画像更新フロー', async () => {
    const { getByTestId } = render(<ProfileScreen />);
    
    fireEvent.press(getByTestId('upload-button'));
    await waitFor(() => {
      expect(getByTestId('upload-status')).toHaveTextContent('アップロード中...');
    });

    await act(async () => {
      jest.advanceTimersByTime(5000);
    });

    expect(getByTestId('profile-image')).toHaveProp('source', {
      uri: 'https://example.com/new-avatar.jpg'
    });
  });
}); 