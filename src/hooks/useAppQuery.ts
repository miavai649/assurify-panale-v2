import { useState } from 'react';
import { useAuth } from '../context/authContext';

const useAppQuery = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const baseUrl = import.meta.env.VITE_PUBLIC_BASE_URL || '';
  const fetchQuery = async (url: string, options = {}) => {
    try {
      setLoading(true);
      const headers: any = {};

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(baseUrl.concat(url), {
        headers,
        ...options,
      });
      const data = await response.json();

      if (data.error) {
        if (
          data.error.includes('TokenExpiredError') ||
          data.error.includes('JsonWebTokenError')
        ) {
          console.log('Token expired');
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
