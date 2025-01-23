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
    }, [nsfw]);

  useEffect(() => {
    const filterData = (subreddit: string | null, title: string) => {
      let filteredData = images;

      if (subreddit) {
        filteredData = filteredData.filter((item) => item.subreddit === selectedSub)
      }

      if (title) {
        filteredData = filteredData.filter((item) => 
          item.title.toLowerCase().includes(title.toLowerCase()))
      }

      setFilteredImages(filteredData);
      setCurrentPage(1)
    }

    filterData(selectedSub, searchTitle)
  }, [selectedSub, searchTitle])

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        setItemsPerPage(30);  // xl size
      } else if (width >= 1024) {
        setItemsPerPage(24);  // lg size
      } else if (width >= 768) {
        setItemsPerPage(20);  // md size
      } else {
        setItemsPerPage(10);  // sm size (mobile)
      }
    };

    handleResize(); // Set initial value based on current screen size

  }, []);

  const lastImageIndex = itemsPerPage * currentPage;
  const firstImageIndex = lastImageIndex - itemsPerPage 
  const currentImages = filteredImages.slice(firstImageIndex, lastImageIndex)
  const totalPages = Math.ceil(filteredImages.length / itemsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle)
  }
  
  return (
    <>
      <div>
        {loading ? (
          <LoadingScreen />
        ) : (
          <div className='top-36 relative'>
            <div className="">
              <div className='flex'>
                <Sidebar data={images} selectedSub={setSelectedSub} titleChangeEvent={handleInputChange}/>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-center justify-items-center w-5/6">
                  {currentImages.map((item) => (
                    <Link href={item.url} target="_blank" key={item.title}>
                      <Image
                        url={item.url}
                        subreddit={item.subreddit}
                        title={item.title}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="pagination-controls flex justify-center items-center gap-4 mt-4 top-36 relative">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="p-2 bg-blue-500 text-white rounded"
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="p-2 bg-blue-500 text-white rounded"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Output;
