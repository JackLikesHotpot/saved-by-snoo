import { useState } from 'react';
import LoadingScreen from '@/app/components/Loading/LoadingScreen';
import Media from '@/app/components/Image/Image'
import Sidebar from '@/app/components/Sidebar/Sidebar'
import Header from '@/app/components/Header/Header'
import Footer from '@/app/components/Footer/Footer';
import Controls from '@/app/components/Controls/Controls'
import Link from 'next/link'
import styles from './Output.module.css'
import Head from 'next/head'
import useItemsPerPage from '../../hooks/useItemsPerPage'
import useImages from '../../hooks/useImages'


const Output: React.FC = () => {
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>('')
  const [searchTitle, setSearchTitle] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = useItemsPerPage();
  const { images, filteredImages, loading } = useImages(selectedSub, searchTitle, selectedType);

  const lastImageIndex = itemsPerPage * currentPage;
  const firstImageIndex = lastImageIndex - itemsPerPage 
  const currentImages = filteredImages.slice(firstImageIndex, lastImageIndex)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle)
  }
  
  return (
    <>
      <div>
        <Head>
        <title>Saved by Snoo</title>
        </Head>
        {loading ? (
          <LoadingScreen />
        ) : (
          <div className='relative min-h-screen'>
            <Header/>
            <div className="px-4">
              <div className={styles['grid-container']}>
                <Sidebar data={images} selectedSub={setSelectedSub} titleChangeEvent={handleInputChange} selectedType={setSelectedType}/>
                
                <div className={styles['main']}>
                  
                <div className={styles['grid-title']}><span>Posts: {filteredImages.length}</span></div>
                <div className={styles['images']}>
                  {currentImages.map((item) => (
                    <Link href={item.url} target="_blank" key={item.index}>
                      <Media
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
          <Footer/>
          </div>
        )}
      </div>
    </>
  );
};

export default Output;
