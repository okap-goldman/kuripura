// リクエスト型
export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface UpdateUserProfileRequest {
  name?: string;
  bio?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// レスポンス型
export interface FileUploadResponse {
  url: string;
}