import React, { useState, useEffect } from 'react';
import styles from '../styles/Index.module.css'; // Assuming the CSS is in the 'src/styles' directory
import axios from 'axios'
import Link from 'next/link';
import { Noto_Sans } from 'next/font/google';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['100', '400', '700'],
  display: 'swap',
});

export default function Home() {
  const [authUrl, setAuthUrl] = useState('https://www.reddit.com');

  useEffect(() => {
    const fetchAuthUrl = async () => {
      
      try {
        const response = await axios.get('http://localhost:5000/api/auth_url'); // This fetches from your Flask API
        setAuthUrl(response.data.auth_url); // Set the auth URL in the state
      } catch (error) {
        console.error('Error fetching auth URL:', error);
      }
      
    };

    fetchAuthUrl();
  }, []);

  return (
      <div className={styles['landing']}>
        <div className={styles['panel']}></div>
        <div className={styles['body']}>
          <div className={`${styles['heading']} ${notoSans.className}`}>
            <span>Saved by Snoo</span>
          </div>
            <div className={styles['description']}>
              <ul className={styles['subheading']}>
                <li>View up to 1000 of your saved Reddit images!</li>
                <li>You can filter by subreddit!</li>
                <li>Doesn't save your own credentials!</li>
              </ul>
            <div className={styles['login']}>
              <Link href={authUrl} className={styles['button']}>
                Login with Reddit
              </Link>
            </div>
          </div>
        </div>
        <div className={styles['panel']}></div>
      </div>
  );
};
