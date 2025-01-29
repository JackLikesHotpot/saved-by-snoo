import React, { useState, useEffect } from 'react';
import styles from '../styles/Index.module.css'; // Assuming the CSS is in the 'src/styles' directory
import axios from 'axios'
import Link from 'next/link';

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
          <div className={styles['description']}>
            <ul className={styles['subheading']}>
              <li>Lets you view up to 1000 of your saved Reddit images!</li>
              <li>You can filter your own images!</li>
              <li>Doesn't save your own data!</li>
            </ul>
          </div>
          <div className={styles['login']}>
            <Link href={authUrl} className={styles['button']}>
              Login with Reddit
            </Link></div>
        <div className={styles['panel']}></div>
      </div>
  );
};
