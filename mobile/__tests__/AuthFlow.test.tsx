import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { LoginScreen } from '../src/screens/auth/LoginScreen';

describe('Login Screen', () => {
  test('無効なパスワード入力時のエラー表示', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    
    fireEvent.changeText(getByPlaceholderText('パスワード'), 'short');
    fireEvent.press(getByText('ログイン'));
    
    await waitFor(() => {
      expect(getByText('パスワードは8文字以上必要です')).toBeVisible();
    });
  });

  test('メールアドレス形式チェック', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    
    fireEvent.changeText(getByPlaceholderText('メールアドレス'), 'invalid-email');
    fireEvent.press(getByText('ログイン'));
    
    await waitFor(() => {
      expect(getByText('有効なメールアドレスを入力してください')).toBeVisible();
    });
  });
}); 