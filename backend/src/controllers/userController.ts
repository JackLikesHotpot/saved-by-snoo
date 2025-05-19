import { Request, Response } from 'express'
import snoowrap from 'snoowrap';

export const getProfile = (req: Request, res: Response) => {
  const username = req.session?.username;
  if (!username) {
    res.status(401).json({message: 'not authenticated'})
  }

  res.json({username})
}

export const getPosts = async (req: Request, res: Response): Promise<void> => {  
  
  // get refresh token from db here

  try {
    const r = new snoowrap({
      userAgent: 'your user agent',
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      refreshToken: refreshToken
    });

    const savedItems = await r.getMe().getSavedContent({ limit: 50 });
    res.json(savedItems);
  } catch (err) {
    console.error('Error fetching saved images:', err);
    res.status(500).json({ message: 'Failed to fetch saved images' });
  }
};