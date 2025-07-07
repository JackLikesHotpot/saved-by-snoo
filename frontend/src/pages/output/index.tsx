import LoadingScreen from '@/app/components/Loading/LoadingScreen';
import ImageCard from '@/app/components/ImageCard/ImageCard'
import Header from '@/app/components/Header/Header'
import styles from './Output.module.css'
import Head from 'next/head'
import useImages from '../../hooks/useImages'

interface Image {
  preview?: {
    images: Array<{
      source: {
        url: string;
      };
    }>;
  };
  gallery_data?: {
    items: Array<{
      media_id: string;
    }>;
  };
  media_metadata?: {
    [media_id: string]: {
      s: {
        u: string; // actual image URL
      };
      m: string;
    };
  };
  subreddit: string;
  title: string;
  nsfw: boolean;
  index: number;
  type: string;
  selftext: string;
  author: string;
}

const extractFirstImageUrl = (img: Image): string => {
  const previewUrl = img.preview?.images?.[0]?.source?.url;
  if (previewUrl) return previewUrl.replace(/&amp;/g, '&');

  const firstMediaId = img.gallery_data?.items?.[0]?.media_id;
  const galleryImage = img.media_metadata?.[firstMediaId || ''];
  const galleryUrl = galleryImage?.s?.u;
  if (galleryUrl) return galleryUrl.replace(/&amp;/g, '&');

  return ''
};

// temporary solution, would rather change this in backend side

const Output: React.FC = () => {
  const { images, loading } = useImages();
  
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
                  {images.map((item) => (
                    <ImageCard
                      url={extractFirstImageUrl(item)}
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
