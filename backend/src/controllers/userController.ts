import { Request, Response } from 'express'
import snoowrap, {Listing, Submission, Comment} from 'snoowrap';

interface Image {
  url: string;
  title: string;
  subreddit: string;
  index: number;
  type: string;
  selftext: string;
  author: string;
  nsfw: boolean;
}

export const getPosts = async (req: Request, res: Response): Promise<void> => {  
  const refreshToken = req.cookies.refreshToken;

  try {
    const r = new snoowrap({
      userAgent: process.env.USER_AGENT!,
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      refreshToken: refreshToken
    });
  
    const savedItems = await r.getMe().getSavedContent({ limit: 1000 });
    const cleanedItems = cleanData(savedItems)

    res.json(cleanedItems);
  } catch (err) {
    console.error('Error fetching saved images:', err);
    res.status(500).json({ message: 'Failed to fetch saved images' });
  }
};

const extractFirstImageUrl = (img: Submission): string | null => {
  // 1. Try standard Reddit preview
  const previewUrl = (img as any)?.preview?.images?.[0]?.source?.url;
  if (previewUrl) return previewUrl;

  // 2. Try gallery image
  const galleryData = (img as any).gallery_data;
  const mediaMetadata = (img as any).media_metadata;
  const firstMediaId = galleryData?.items?.[0]?.media_id;
  const galleryImage = mediaMetadata?.[firstMediaId || ''];

  if (galleryImage?.s?.u && firstMediaId) {
    return galleryImage.s.u.replace(/&amp;/g, '&');
  }

  return null;
};

const isSubmission = (item: any): item is Submission => {
  return typeof item.title === 'string' && typeof item.url === 'string';
};


const cleanData = (items: Listing<Submission | Comment>) => {

  const cleanedData: Image[] = [];

  items.forEach((item, index) => {
    if (isSubmission(item)) {
      const imageUrl = extractFirstImageUrl(item) || item.url

      cleanedData.push({
        url: imageUrl,
        title: item.title,
        subreddit: item.subreddit_name_prefixed,
        index,
        type: item.post_hint,
        selftext: item.selftext,
        author: item.author.name,
        nsfw: item.over_18
      })
    }
  })

  return cleanedData
}
