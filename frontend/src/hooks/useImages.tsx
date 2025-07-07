import { useState, useEffect } from 'react';

import { useRouter } from 'next/router'
import axios from 'axios';

interface Image {
  preview?: {
    images: Array<{
      source: {
        url: string;
      };
    }>;
  };
  gallery_data?: {
    items: Array<{
      media_id: string;
    }>;
  };
  media_metadata?: {
    [media_id: string]: {
      s: {
        u: string; // actual image URL
      };
      m: string; // mime type
    };
  };
  subreddit: string;
  title: string;
  nsfw: boolean;
  index: number;
  type: string;
  selftext: string;
  author: string;
}


const allowedHosts = new Set([
  'i.redd.it',
  'i.imgur.com',
  'pbs.twimg.com',
  'preview.redd.it',
  'www.reddit.com',
  'x.com',
  'external-preview.redd.it',
  'i.gyazo.com',
]);

const extractFirstImageUrl = (img: Image): string | null => {
  // 1. Try standard Reddit preview
  const previewUrl = img.preview?.images?.[0]?.source?.url;
  if (previewUrl) return previewUrl;

  // 2. Try first image in gallery
  const firstMediaId = img.gallery_data?.items?.[0]?.media_id;
  const galleryImage = img.media_metadata?.[firstMediaId || ''];

if (galleryImage?.s?.u && firstMediaId) {
  return galleryImage.s.u.replace(/&amp;/g, '&'); // <- important!
}

  return null;
};

// would rather add this info to new json



const useImages = () => {
  const router = useRouter();
  const { nsfw } = router.query;
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/user/saved?nsfw=${nsfw}&gallery=true`,
        {
          withCredentials: true
        });
        
        const filtered = response.data.filter((img: Image) => {
          const url = extractFirstImageUrl(img);
          if (!url) {
            // text posts aren't working atm but that's fine too
            return false;
          }



          try {
            const { protocol, hostname } = new URL(url);
            return protocol === 'https:' && allowedHosts.has(hostname);
          } 
          catch {
            return false;
          }
        });

        setImages(filtered);
      } 
      catch (error) {
        console.error('Error fetching auth URL:', error);
      }
      
    setLoading(false)
    }

  fetchData();
  }, [nsfw]);

  return { images, loading };
}

export default useImages;
