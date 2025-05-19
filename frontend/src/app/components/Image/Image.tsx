import styles from './Image.module.css'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface ImageProps{
  url: string;
  subreddit: string;
  title: string;
  nsfw: boolean;
}

interface ImageDimensions {
  width: number;
  height: number;
}

const getImageDimensions = (imageUrl: string): Promise<ImageDimensions> => {
  return new Promise((resolve, reject) => {
    const img = new window.Image();

    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height
      });
    };

    img.onerror = (err) => {
      reject('Error loading image: ' + err);
    };

    img.src = imageUrl;
  });
};


const Media: React.FC<ImageProps> = ({ url, nsfw }) => {
const [dimensions, setDimensions] = useState<ImageDimensions>();

  useEffect(() => {
    const fetchDimensions = async () => {
      try {
        const { width, height }: ImageDimensions = await getImageDimensions(url); 
        
        let newWidth: number = 100, newHeight: number = 180

        if (width >= height) {
          const factor = width / 180;
          newWidth = 180;
          newHeight = Math.floor(height / factor)
        }
        else if (height > width) {
          const factor = height / 180
          newHeight = 180;
          newWidth = Math.floor(width / factor)
        }
        setDimensions({width: newWidth, height: newHeight})
        
      } catch (error) {
        console.error("Error loading image dimensions:", error);
      }
      
    };

    fetchDimensions();
  }, [url]); 

  if (!dimensions) {
    return <div></div>;
  }

  const { width, height } = dimensions;

  const nsfw_blur = new URLSearchParams(window.location.search).get('blur')
  return (
    <div>
      <Image
        className={(nsfw_blur && nsfw) ? 'filter blur-md hover:blur-none transition duration-300 object-contain': 'drop-shadow-lg object-contain'}
        src={url}
        width={width}
        height={height}
        alt={`Image for ${url}`}/>
    </div>
  );
};

export default Media;