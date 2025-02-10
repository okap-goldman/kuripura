import { Request, Response } from 'express';

export const createFollow = async (req: Request, res: Response) => {
  res.status(201).json({
    follow_id: 1,
    follower_id: 1,
    ...req.body,
    created_at: new Date().toISOString()
  });
};

export const unfollow = async (req: Request, res: Response) => {
  res.status(204).send();
};
