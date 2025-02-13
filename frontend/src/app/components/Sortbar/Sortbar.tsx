import styles from './Sortbar.module.css'
import { useSearchParams } from 'next/navigation';
import Link from 'next/link'

interface ApiDataItem {
  title: string;
  url: string;
  subreddit: string;
}

interface SortbarProps {
  data: ApiDataItem[]
  selectedSub: (subreddit: string) => void
  titleChangeEvent: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Sortbar: React.FC = ({  }) => {
  
const searchParams = useSearchParams();
const username = searchParams?.get('username')

  return (
    <div className={styles['sortbar']}>
      <div className={styles['sort-date']}>Sort by Date</div>
      <div className={styles['sort-score']}>Sort by Score</div>
      <div className={styles['sort-name']}>Sort by Name</div>
    </div>
  );
};

export default Sortbar;