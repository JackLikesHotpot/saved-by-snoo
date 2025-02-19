import styles from './Sortbar.module.css'
import { useSearchParams } from 'next/navigation';
import NameSortIcon from '../../../../public/sort-by-name.svg'
import DateSortIcon from '../../../../public/sort-by-time.svg'
import DescScoreSortIcon from '../../../../public/sort-by-score-descending.svg'
import AscScoreSortIcon from '../../../../public/sort-by-score-ascending.svg'
import SortIcon from '../../../../public/sort.svg'
import Image from 'next/image'
import { useState } from 'react'

interface ApiDataItem {
  title: string;
  url: string;
  subreddit: string;
}

interface SortbarProps {
  timeSort: React.Dispatch<React.SetStateAction<boolean>>;
  resetSort: React.Dispatch<React.SetStateAction<boolean>>;
  nameSort: React.Dispatch<React.SetStateAction<boolean>>;
}


const Sortbar: React.FC<SortbarProps> = ({ timeSort, resetSort, nameSort }) => {
  
const [descSort, setDescSort] = useState<boolean>(true)

const searchParams = useSearchParams();
const username = searchParams?.get('username')

const handleClick = () => {
  setDescSort(!descSort)
}

  return (
    <div className={styles['sortbar']}>
      <div className={styles['sort-date']}><Image src={DateSortIcon} alt='Sort by Date' width='40' onClick={() => timeSort(prev => !prev)}></Image></div>
      
      {/* {descSort ?       
        <div className={styles['sort-score-asc']}><Image src={AscScoreSortIcon} alt='Sort by Score (ascending)' width='30' onClick={handleClick}></Image></div> :
        <div className={styles['sort-score-desc']}><Image src={DescScoreSortIcon} alt='Sort by Score (descending)' width='30' onClick={handleClick}></Image></div>
      } */}
      <div className={styles['sort-reset']}><Image src={SortIcon} alt='Reset sort' width='40' onClick={() => resetSort(prev => !prev)}></Image></div>
      <div className={styles['sort-name']}><Image src={NameSortIcon} alt='Sort by Name' width='40' onClick={() => nameSort(prev => !prev)}></Image></div>
    </div>
  );
};

export default Sortbar;