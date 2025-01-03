import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios'
import LoadingScreen from '../../app/components/Loading/LoadingScreen';
import Image from '../../app/components/Image/Image'

interface Image {
  url: string;
  subreddit: string;
  title: string;
}

const Output: React.FC = () => {
  const router = useRouter();
  const { nsfw } = router.query;
  const [loading, setLoading] = useState<boolean>(true);
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:5000/saved?nsfw=${nsfw}`);
          setImages(response.data)
          setLoading(false)
        } catch (error) {
          console.error('Error fetching auth URL:', error);
        }
      }

    fetchData();
    }, []);

  return (
    <>
    <div>
      {loading ? <LoadingScreen/> : 
      
      <div>
        {images.map((item) => (
          <Image
            key={item.title}
            url={item.url}
            subreddit={item.subreddit}
            title={item.title}/>
        ))} 
      </div>
      }
    </div></>
  )
};

export default Output;
