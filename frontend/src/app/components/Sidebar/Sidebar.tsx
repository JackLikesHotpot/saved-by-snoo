import styles from './Sidebar.module.css'
import Link from 'next/link'

interface ApiDataItem {
  title: string;
  url: string;
  subreddit: string;
  type: string;
}

interface SidebarProps {
  data: ApiDataItem[]
  selectedSub: (subreddit: string) => void
  titleChangeEvent: (event: React.ChangeEvent<HTMLInputElement>) => void
  selectedType: (type: string) => void
}

const filterSubreddit = (subreddits: string[]): Record<string, number> => {
  const subCount: Record<string, number> = {};

  subreddits.forEach((subreddit => {
    subCount[subreddit] = (subCount[subreddit] || 0) + 1
  }))
  return subCount;
} 

const Sidebar: React.FC<SidebarProps> = ({ data, selectedSub, titleChangeEvent, selectedType }) => {

const subreddits = data.map((image) => image.subreddit)
const subCount = filterSubreddit(subreddits)
const sortedSubCount = Object.entries(subCount).sort(([, countA], [, countB]) => countB - countA);
const types = [...new Set(data.map((image) => image.type))];

const resetFilter = () => {
  selectedType('')
  selectedSub('')
}

  return (
    <div className={styles['sidebar']}>
      <div className={styles['search-bar']}><span className={styles['bar-text']}>Search</span>
      <input className={styles['sidebar-search']} type="text" onChange={(e) => titleChangeEvent(e)}/></div>
      <div className={styles['sidebar-reset']}><button onClick={() => resetFilter()}>Reset Filter</button></div>
      <div className={styles['subreddit-list']}>
      <span className={styles['sidebar-label']}>Subreddits</span>
      {sortedSubCount.map((subreddit) => (
        <div className={styles['sidebar-data']} key={subreddit[0]}>
          <li key={`${subreddit[0]}-link`} className={styles['subreddit-link']}><Link href={`https://reddit.com/r/${subreddit[0]}`}>+</Link></li>
          <li key={`${subreddit[0]}-name`} className={styles['subreddit-name']}>
            <button onClick={() => selectedSub(subreddit[0])}> {subreddit[0]}</button></li>
        </div>
      ))}
      </div>
      <div className={styles['filter-bar']}><span className={styles['filter-text']}>Filter</span>
      {types.map((filetype) => (
        <div className={styles['sidebar-filetype']} key={`${filetype}`}>
          <li key={`${filetype}-key`} className={styles['filetype']}>
            <button onClick={() => selectedType(filetype)}>{filetype}</button></li>
        </div>  
      ))}
      </div>
    </div>
  );
};

export default Sidebar;