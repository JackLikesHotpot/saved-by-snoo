import styles from './Sidebar.module.css'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface ApiDataItem {
  title: string;
  url: string;
  subreddit: string;
}

interface SidebarProps {
  data: ApiDataItem[]
  selectedSub: (subreddit: string) => void
}

const mostPopularSubreddit = (subreddits: string[]): Record<string, number> => {
  const subCount: Record<string, number> = {};

  subreddits.forEach((subreddit => {
    subCount[subreddit] = (subCount[subreddit] || 0) + 1
  }))
  return subCount;
}

const username = ''
const Sidebar: React.FC<SidebarProps> = ({ data, selectedSub }) => {
  
const subreddits = data.map((image) => image.subreddit)
const subCount = mostPopularSubreddit(subreddits)
const sortedSubCount = Object.entries(subCount).sort(([, countA], [, countB]) => countB - countA);

  return (
    <div className={styles['sidebar']}>
      <div className={styles['current-user']}>You are currently logged in as: {username}</div>
      <div className={styles['sidebar-reset']}><button onClick={() => selectedSub('')}>Reset Filter</button></div>
      <div className={styles['subreddit-total']}>Total number of posts: {data.length}</div>
      {sortedSubCount.map((subreddit) => (
        <div className={styles['sidebar-data']}>
          <li key={subreddit[0]} className={styles['subreddit-name']}>
            <button onClick={() => selectedSub(subreddit[0])}> {subreddit[0]}</button></li>
          <li key={subreddit[1]} className={styles['subreddit-count']}>{subreddit[1]}</li>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;