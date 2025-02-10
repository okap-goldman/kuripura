import { Request, Response } from 'express';

export const createPost = async (req: Request, res: Response) => {
  res.status(201).json({
    post_id: 1,
    user_id: 1,
    ...req.body,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });
};
