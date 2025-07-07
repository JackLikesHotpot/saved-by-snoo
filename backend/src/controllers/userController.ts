import { Request, Response } from 'express'
import snoowrap, {Listing, Submission, Comment} from 'snoowrap';

export const getPosts = async (req: Request, res: Response): Promise<void> => {  
  const refreshToken = req.cookies.refreshToken;
  const includeNsfw = req.query.nsfw === 'true'
  const includeGallery = req.query.gallery === 'true'

  try {
    const r = new snoowrap({
      userAgent: process.env.USER_AGENT!,
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      refreshToken: refreshToken
    });
  
    const savedItems = await r.getMe().getSavedContent({ limit: 1000 });
    const filteredByNsfw = filterNsfw(savedItems, includeNsfw)

    res.json(filteredByNsfw);
  } catch (err) {
    console.error('Error fetching saved images:', err);
    res.status(500).json({ message: 'Failed to fetch saved images' });
  }
};

const filterNsfw = (items: Listing<Submission | Comment>, includeNsfw: boolean) => {
  const filtered = items.filter(item => {
    const isSubmission = 'over_18' in item;
    if (item.name.startsWith('t3_') && isSubmission) {
      return includeNsfw || !item.over_18;
    }
    return false
  });

  return filtered;
}

const filterGallery = (items: (Submission | Comment)[], includeGallery: boolean) => {
  return items.filter(item => {
    if ('is_gallery' in item) {
      return !(item as any).is_gallery;
    }
    return true;
  })
}