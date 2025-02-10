import { useAuth } from '../context/authContext';

const useJwt = () => {
  const { currentUser, loading, baseUrl, jwt, setJwt } = useAuth();

  const setAndStoreJwt = (jwt: string | null) => {
    setJwt(jwt);
    if (!jwt) {
      localStorage.removeItem('accessToken');
    } else {
      localStorage.setItem('accessToken', jwt);
    }
  };

  return {
    jwt,
    setJwt: setAndStoreJwt,
    loadingUser: loading,
    user: currentUser,
    baseUrl,
  };
};

export default useJwt;
