"use client"

import React, { useState, useEffect } from 'react';
// import './styles/index.css'; // Assuming the CSS is in the 'src/styles' directory
import { useRouter } from 'next/navigation';
import axios from 'axios'

export default function Page() {
  const router = useRouter()
  const [authUrl, setAuthUrl] = useState('');

  useEffect(() => {
    const fetchAuthUrl = async () => {
      
      try {
        const response = await axios.get('http://localhost:5000/api/auth_url'); // This fetches from your Flask API
        console.log(response)
        setAuthUrl(response.data.auth_url); // Set the auth URL in the state
      } catch (error) {
        console.error('Error fetching auth URL:', error);
      }
      
    };

    fetchAuthUrl();
  }, []);
  

  const handleLogin = () => {
    if (authUrl) {
      window.location.href = authUrl; // Redirect to Reddit OAuth2 login
    } else {
      console.error('Authentication URL is not available');
    }
  };

  return (
    <>
      <div className="landing-page">

        <div className="flex-container">
          <div className="features-tab">
            <h2>Features</h2>
            <ul id="left-tab">
              <li>Lets you view up to 1000 of your saved Reddit images!</li>
              <li>It uses OAuth2!</li>
              <li>I made this with Flask!</li>
              <li>Adding more features to filter!</li>
            </ul>
          </div>
          <div className="login-tab">
            <a>
              <button id="login-button" onClick={handleLogin}>Log in with Reddit</button>
            </a>
            <p className="button-disclaimer">Authenticate with Reddit here</p>
          </div>
        </div>
      </div>
    </>
  );
};
