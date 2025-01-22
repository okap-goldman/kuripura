// 共有型定義
export interface User {
  id: string;
  name: string;
  email: string;
}

// API レスポンス型
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

// API エンドポイント定義
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/update',
  },
} as const; 