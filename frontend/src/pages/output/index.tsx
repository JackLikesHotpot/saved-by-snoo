import { useState } from 'react';
import LoadingScreen from '@/app/components/Loading/LoadingScreen';
import ImageCard from '@/app/components/ImageCard/ImageCard'
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
                <div className={styles['main']}>
                <div className={styles['images']}>
                  {currentImages.map((item) => (
                    <ImageCard
                      url={item.url}
                      subreddit={item.subreddit}
                      title={item.title}
                      nsfw={item.nsfw}
                      description={item.selftext}
                      author={item.author}
                    />
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
