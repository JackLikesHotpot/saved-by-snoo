// import styles from './Image.module.css'

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

// make resize image for below logic


// danbo site images always height or width 180, whichever one is larger
// 135x180 image is actually 850x1129
// largest side divided by 180 and then divide shorter side by that


const Artist: React.FC<ImageProps> = ({ url, nsfw }) => {
const [dimensions, setDimensions] = useState<ImageDimensions>();
// const [originalDims, setOriginalDims] = useState<ImageDimensions>();

  useEffect(() => {
    const fetchDimensions = async () => {
      try {
        const { width, height }: ImageDimensions = await getImageDimensions(url); 
        // setOriginalDims({width, height})
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
        className={(nsfw_blur && nsfw) ? 'filter blur-md hover:blur-none transition duration-300': 'drop-shadow-lg'}
        src={url}
        width={width}
        height={height}
        alt='image'/>
    </div>
  );
};

export default Artist;