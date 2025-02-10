import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const createMockRequest = (overrides = {}) => ({
  headers: {},
  body: {},
  params: {},
  query: {},
  ...overrides
});

export const createMockResponse = () => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis()
  };
  return res as Response;
};

export const generateTestToken = (userId: number, isAdmin = false) => {
  return jwt.sign(
    { userId, isAdmin },
    process.env.JWT_SECRET || 'test-secret',
    { expiresIn: '1h' }
  );
};
