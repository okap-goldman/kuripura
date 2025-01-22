export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  avatar?: string;
  bio?: string;
}

export interface UpdateUserProfileRequest {
  name?: string;
  avatar?: string;
  bio?: string;
}

export interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export type UserError = {
  code: 'USER_NOT_FOUND' | 'INVALID_PASSWORD' | 'INVALID_UPDATE';
  message: string;
}; 