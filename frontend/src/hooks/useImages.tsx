import { useState, useEffect } from 'react';

import { useRouter } from 'next/router'
import axios from 'axios';

interface ImageData extends Image {
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
}

interface Image {
  url: string;
  subreddit: string;
  title: string;
  index: number;
  type: string;
  selftext: string;
  author: string;
  nsfw: boolean;
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



const useImages = () => {
  const router = useRouter();
  const { nsfw } = router.query;
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/user/saved?nsfw=${nsfw}&gallery=true`,
        {
          withCredentials: true
        });
        setImages(response.data);
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
