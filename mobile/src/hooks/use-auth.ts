import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.apiUrl;

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  userId: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    token: null,
    userId: null,
  });

  useEffect(() => {
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    try {
      const [token, userId] = await Promise.all([
        AsyncStorage.getItem('accessToken'),
        AsyncStorage.getItem('userId'),
      ]);

      setAuthState({
        isAuthenticated: !!token,
        token,
        userId,
      });
    } catch (error) {
      console.error('認証状態の読み込みに失敗しました:', error);
    }
  };

  const login = async (token: string, userId: string) => {
    try {
      await Promise.all([
        AsyncStorage.setItem('accessToken', token),
        AsyncStorage.setItem('userId', userId),
      ]);

      setAuthState({
        isAuthenticated: true,
        token,
        userId,
      });
    } catch (error) {
      console.error('ログインに失敗しました:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem('accessToken'),
        AsyncStorage.removeItem('userId'),
      ]);

      setAuthState({
        isAuthenticated: false,
        token: null,
        userId: null,
      });
    } catch (error) {
      console.error('ログアウトに失敗しました:', error);
      throw error;
    }
  };

  const getAuthHeader = (): Record<string, string> => {
    return authState.token ? { Authorization: `Bearer ${authState.token}` } : {};
  };

  return {
    isAuthenticated: authState.isAuthenticated,
    token: authState.token,
    userId: authState.userId,
    login,
    logout,
    getAuthHeader,
  };
} 
