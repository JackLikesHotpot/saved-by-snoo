import { useState, useEffect } from 'react';

import { useRouter } from 'next/router'
import axios from 'axios';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

interface Image {
  url: string;
  subreddit: string;
  title: string;
  nsfw: boolean;
  index: number;
  type: string;
}

const useImages = (selectedSub: string | null, searchTitle: string, selectedType: string) => {
  const router = useRouter();
  const { nsfw } = router.query;
  const [images, setImages] = useState<Image[]>([]);
  const [filteredImages, setFilteredImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/saved?nsfw=${nsfw}`);
        setImages(response.data)
        setFilteredImages(response.data)
      } 
      catch (error) {
        console.error('Error fetching auth URL:', error);
      }
      
    setLoading(false)
    }

  fetchData();
  }, [nsfw]);

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
        filteredData = filteredData.filter((item) => item.type === selectedType)
      }

      setFilteredImages(filteredData);
      setCurrentPage(1)
    }

    filterData(selectedSub, searchTitle, selectedType)
  }, [selectedSub, searchTitle, selectedType, images])

  return { images, filteredImages, loading, currentPage };
}

export default useImages;
