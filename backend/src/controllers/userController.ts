import { Request, Response } from 'express'
import snoowrap, {Submission} from 'snoowrap';

export const getProfile = (req: Request, res: Response) => {
  const username = req.session?.username;
  if (!username) {
    res.status(401).json({message: 'not authenticated'})
  }

  res.json({username})
}

export const getPosts = async (req: Request, res: Response): Promise<void> => {  
  const refreshToken = req.cookies.refreshToken;
  const nsfw = req.query.nsfw as string | undefined;

  try {
    const r = new snoowrap({
      userAgent: process.env.USER_AGENT!,
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      refreshToken: refreshToken
    });

    const content = (await r.getMe().getSavedContent()).fetchAll()

    // const filtered = content.filter(post => {
    //     if (post instanceof Submission) {
    //     return !post.over_18; 
    //   }
  
    res.json(content);
    
  } catch (err) {
    console.error('Error fetching saved images:', err);
    res.status(500).json({ message: 'Failed to fetch saved images' });
  }
};