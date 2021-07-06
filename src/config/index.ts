import { useState, useEffect } from 'react';

const getToken = () => {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    setAccessToken(localStorage.getItem('access_token'));
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return config;
};

const getRefreshToken = () => {
  const [refreshToken, setRefreshToken] = useState('');

  useEffect(() => {
    setRefreshToken(localStorage.getItem('refresh_token'));
  }, []);

  return refreshToken;
};

export { getToken, getRefreshToken };
