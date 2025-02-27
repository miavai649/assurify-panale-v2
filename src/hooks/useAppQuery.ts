import { useState } from 'react';
import useJwt from './useJwt';

const useAppQuery = () => {
  const [loading, setLoading] = useState(false);
  const { jwt, setJwt } = useJwt();
  const baseUrl = import.meta.env.VITE_PUBLIC_BASE_URL || '';
  const fetchQuery = async (url: string, options = {}) => {
    try {
      setLoading(true);
      const headers: any = {};

      if (jwt) {
        headers.Authorization = `Bearer ${jwt}`;
      }

      const response = await fetch(baseUrl.concat(url), {
        headers,
        ...options,
      });
      const data = await response.json();

      if (data?.token) {
        setJwt(data?.token);
      }

      if (data.error) {
        if (
          data.error.includes('TokenExpiredError') ||
          data.error.includes('JsonWebTokenError')
        ) {
          console.log('Token expired');
          setJwt('');
        }
      }
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, fetchQuery };
};

export default useAppQuery;
