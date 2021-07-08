import { useState, useEffect } from 'react';

const getRefreshToken = () => {
  const [refreshToken, setRefreshToken] = useState('');

  useEffect(() => {
    setRefreshToken(localStorage.getItem('refresh_token'));
  }, []);

  return refreshToken;
};

const configOptions = () => {
  if (typeof window === 'undefined') return {};

  if (!window.localStorage.getItem('access_token')) return {};

  const accessToken = window.localStorage.getItem('access_token');

  if (!!accessToken) {
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }
};

export { getRefreshToken, configOptions };
