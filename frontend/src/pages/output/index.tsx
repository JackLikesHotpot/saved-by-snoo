import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios'
import LoadingScreen from '../../app/components/Loading/LoadingScreen';
import Image from '../../app/components/Image/Image'
import Sidebar from '../../app/components/Sidebar/Sidebar'
import Link from 'next/link'

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
  const [filteredImages, setFilteredImages] = useState<Image[]>([]);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  

  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:5000/saved?nsfw=${nsfw}`);
          setImages(response.data)
          setFilteredImages(response.data)
        } catch (error) {
          console.error('Error fetching auth URL:', error);
        }
        
      setLoading(false)
      }

    fetchData();
    }, [nsfw]);

  useEffect(() => {
    const filterData = () => {
      if (selectedSub) {
        const filteredData = images.filter((item) => item.subreddit === selectedSub)
        setFilteredImages(filteredData)
      }
      else {
        setFilteredImages(images)
        }    
      }

    filterData();
  }, [selectedSub])

  return (
    <>
    <div className="top-36 absolute">
      {loading ? <LoadingScreen/> : 
      <div className="flex">
        <Sidebar
          data={images}
          selectedSub={setSelectedSub}
          />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-4 items-center justify-items-center w-5/6">
          {filteredImages.map((item) => (
            <Link href={item.url} target='_blank'>
              <Image
                key={item.title}
                url={item.url}
                subreddit={item.subreddit}
                title={item.title}/>
            </Link>
          ))} 
        </div>
      </div>
      }
    </div></>
  )
};

export default Output;
