import { useState } from 'react'
import LoadingScreen from '@/app/components/Loading/LoadingScreen';
import ImageCard from '@/app/components/ImageCard/ImageCard'
import Header from '@/app/components/Header/Header'
import styles from './Output.module.css'
import Head from 'next/head'
import useImages from '../../hooks/useImages'

const Output: React.FC = () => {
  const { images, loading } = useImages();
  const [nsfwFilter, setNsfwFilter] = useState<boolean>(false)

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
                <div className={styles['images']}>
                  {images
                  .filter(item => nsfwFilter || !item.nsfw )
                  .map((item) => (
                    <ImageCard
                      key={item.index}
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
        )}
      </div>
    </>
  );
};

export default Output;
