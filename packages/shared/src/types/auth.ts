export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export type AuthError = {
  code: 'INVALID_CREDENTIALS' | 'USER_NOT_FOUND' | 'EMAIL_ALREADY_EXISTS';
  message: string;
}; 