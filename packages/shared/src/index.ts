export * from './types';

// 基本的な型定義
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// APIレスポンスの型
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}