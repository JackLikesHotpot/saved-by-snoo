import { Request, Response } from 'express'

export const getProfile = (req: Request, res: Response) => {
  const username = req.session?.username;
  if (!username) {
    res.status(401).json({message: 'not authenticated'})
  }

  res.json({username})
}