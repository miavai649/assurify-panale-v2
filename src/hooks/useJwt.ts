import { useAuth } from '../context/authContext';

const useJwt = () => {
  const { currentUser, loading, baseUrl } = useAuth();

  const setAndStoreJwt = (jwt: string | null) => {
    if (!jwt) {
      localStorage.removeItem('accessToken');
    } else {
      localStorage.setItem('accessToken', jwt);
    }
  };

  return {
    setJwt: setAndStoreJwt,
    loadingUser: loading,
    user: currentUser,
    baseUrl,
  };
};

export default useJwt;
