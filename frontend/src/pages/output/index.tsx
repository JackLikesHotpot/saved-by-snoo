import { useState } from 'react'
import LoadingScreen from '@/app/components/Loading/LoadingScreen';
import ImageCard from '@/app/components/ImageCard/ImageCard'
import Header from '@/app/components/Header/Header'
import styles from './Output.module.css'
import Head from 'next/head'
import useImages from '../../hooks/useImages'
import Settings from '@/app/components/Settings/Settings';

const Output: React.FC = () => {
  const { images, loading } = useImages();
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [settingsPrompt, setSettingsPrompt] = useState(false)
  const [nsfwFilter, setNsfwFilter] = useState<boolean>(false)

  const filteredImages = images.filter((img) =>
    img.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div>
        <Head>
        <title>Saved by Snoo</title>
        </Head>
        {loading ? (
          <LoadingScreen />
        ) : (
          <div className='relative min-h-screen'>
            <Header
              length={images.length}
              onSearchChange={setSearchTerm}
              onSettingsClick={() => setSettingsPrompt(prev => !prev)}/>
            <div className="px-4">
              <div className={styles['grid-container']}>  
                <div className={styles['images']}>
                  {filteredImages
                  .filter(item => nsfwFilter || !item.nsfw )
                  .map((item) => (
                    <ImageCard
                      key={item.index}
                      preview_url={item.preview_url}
                      post_url={item.post_url}
                      subreddit={item.subreddit}
                      title={item.title}
                      nsfw={item.nsfw}
                      description={item.selftext}
                    />
                  ))}
                </div>
                {settingsPrompt &&
                  <Settings
                    onSettingsClick={() => setSettingsPrompt(prev => !prev)}/>}

              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default Output;
