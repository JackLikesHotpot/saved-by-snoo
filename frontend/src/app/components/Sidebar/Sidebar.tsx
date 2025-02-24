import styles from './Sidebar.module.css'
import Link from 'next/link'

interface ApiDataItem {
  title: string;
  url: string;
  subreddit: string;
}

interface SidebarProps {
  data: ApiDataItem[]
  selectedSub: (subreddit: string) => void
  titleChangeEvent: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const filterSubreddit = (subreddits: string[]): Record<string, number> => {
  const subCount: Record<string, number> = {};

  subreddits.forEach((subreddit => {
    subCount[subreddit] = (subCount[subreddit] || 0) + 1
  }))
  return subCount;
}

const Sidebar: React.FC<SidebarProps> = ({ data, selectedSub, titleChangeEvent }) => {
  

const subreddits = data.map((image) => image.subreddit)
const subCount = filterSubreddit(subreddits)
const sortedSubCount = Object.entries(subCount).sort(([, countA], [, countB]) => countB - countA);

  return (
    <div className={styles['sidebar']}>
      <div className={styles['search-bar']}><span className={styles['bar-text']}>Search</span>
      <input className={styles['sidebar-search']} type="text" onChange={(e) => titleChangeEvent(e)}/></div>
      <div className={styles['sidebar-reset']}><button onClick={() => selectedSub('')}>Reset Filter</button></div>
      <div className={styles['subreddit-list']}>
      <span className={styles['sidebar-label']}>Subreddits</span>
      {sortedSubCount.map((subreddit) => (
        <div className={styles['sidebar-data']} key={subreddit[0]}>
          <li key={`${subreddit[0]}-link`}><Link href={`https://reddit.com/r/${subreddit[0]}`}>A</Link></li>
          <li key={`${subreddit[0]}-name`} className={styles['subreddit-name']}>
            <button onClick={() => selectedSub(subreddit[0])}> {subreddit[0]}</button></li>
          <li key={`${subreddit[1]}-count`} className={styles['subreddit-count']}>{subreddit[1]}</li>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Sidebar;