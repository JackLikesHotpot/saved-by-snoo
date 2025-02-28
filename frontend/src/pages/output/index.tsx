import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios'
import LoadingScreen from '@/app/components/Loading/LoadingScreen';
import Image from '@/app/components/Image/Image'
import Sidebar from '@/app/components/Sidebar/Sidebar'
import Header from '@/app/components/Header/Header'
import Footer from '@/app/components/Footer/Footer';
import Controls from '@/app/components/Controls/Controls'
import Link from 'next/link'
import styles from './Output.module.css'

interface Image {
  url: string;
  subreddit: string;
  title: string;
  nsfw: boolean;
  index: number;
  type: string;
}

const Output: React.FC = () => {
  const router = useRouter();
  const { nsfw } = router.query;
  const [loading, setLoading] = useState<boolean>(true);
  const [images, setImages] = useState<Image[]>([]);
  const [filteredImages, setFilteredImages] = useState<Image[]>([]);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>('')
  const [searchTitle, setSearchTitle] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

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
    }, []);

  useEffect(() => {
    const filterData = (subreddit: string | null, title: string, type: string) => {
      let filteredData = images;

      if (subreddit) {
        filteredData = filteredData.filter((item) => item.subreddit === selectedSub)
      }

      if (title) {
        filteredData = filteredData.filter((item) => 
          item.title.toLowerCase().includes(title.toLowerCase()))
      }

      if (type) {
        console.log(selectedType)
        filteredData = filteredData.filter((item) => item.type === selectedType)
      }

      setFilteredImages(filteredData);
      setCurrentPage(1)
    }

    filterData(selectedSub, searchTitle, selectedType)
  }, [selectedSub, searchTitle, selectedType])

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1536) {
        setItemsPerPage(32)   // 2xl size (min 1536px)
      }
      else if (width >= 1280) {
        setItemsPerPage(30);  // xl size (min 1280px)
      } 
      else if (width >= 1024) {
        setItemsPerPage(25);  // lg size (min 1024px)
      } 
      else if (width >= 768) {
        setItemsPerPage(15);  // md size (min 768px)
      } 
      else {
        setItemsPerPage(10);  // sm size (min 640px)
      }
    };

    handleResize(); // Set initial value based on current screen size

  }, []);

  const lastImageIndex = itemsPerPage * currentPage;
  const firstImageIndex = lastImageIndex - itemsPerPage 
  const currentImages = filteredImages.slice(firstImageIndex, lastImageIndex)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle)
  }
  
  return (
    <>
      <div className=''>
        {loading ? (
          <LoadingScreen />
        ) : (
          <div className='relative'>
            <Header/>
            <div className="px-4">
              <div className={styles['grid-container']}>
                <Sidebar data={images} selectedSub={setSelectedSub} titleChangeEvent={handleInputChange} selectedType={setSelectedType}/>
                
                <div className={styles['main']}>
                  
                <div className={styles['grid-title']}><span>Posts: {filteredImages.length}</span></div>
                <div className={styles['images']}>
                  {currentImages.map((item) => (
                    <Link href={item.url} target="_blank" key={item.index}>
                      <Image
                        url={item.url}
                        subreddit={item.subreddit}
                        title={item.title}
                        nsfw={item.nsfw}
                      />
                    </Link>
                  ))}
                </div>
                </div>
              </div>
            </div>
            <Controls 
              currentPage={currentPage} 
              setCurrentPage={setCurrentPage} 
              itemsPerPage={itemsPerPage} 
              numberOfImages={filteredImages.length}
              />

          </div>
        )}
      </div>
    </>
  );
};

export default Output;
