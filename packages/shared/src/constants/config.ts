export const APP_CONFIG = {
  NAME: 'Kuripura',
  VERSION: '1.0.0',
} as const;

export const AUTH_CONFIG = {
  ACCESS_TOKEN_EXPIRES_IN: '15m',
  REFRESH_TOKEN_EXPIRES_IN: '7d',
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 100,
} as const;

export const API_CONFIG = {
  TIMEOUT: 10000, // 10 seconds
  RETRY_COUNT: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

export const PAGINATION_CONFIG = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const; 