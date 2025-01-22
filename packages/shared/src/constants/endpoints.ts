export const API_VERSION = 'v1';
export const BASE_URL = `/api/${API_VERSION}`;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
    LOGOUT: `${BASE_URL}/auth/logout`,
    REFRESH: `${BASE_URL}/auth/refresh`,
    VERIFY_EMAIL: `${BASE_URL}/auth/verify-email`,
    FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${BASE_URL}/auth/reset-password`,
  },
  USER: {
    PROFILE: `${BASE_URL}/users/profile`,
    UPDATE_PROFILE: `${BASE_URL}/users/profile`,
    CHANGE_PASSWORD: `${BASE_URL}/users/password`,
    AVATAR: `${BASE_URL}/users/avatar`,
  },
  SETTINGS: {
    GET: `${BASE_URL}/settings`,
    UPDATE: `${BASE_URL}/settings`,
  },
} as const; 