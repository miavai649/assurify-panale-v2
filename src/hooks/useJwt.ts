import { useAuth } from '../context/authContext';

const useJwt = () => {
  const { jwt, setJwt, loadingUser, user, baseUrl } = useAuth();

  const setAndStoreJwt = (jwt: string) => {
    setJwt(jwt);
    if (!jwt) {
      localStorage.removeItem('jwt');
    } else {
      localStorage.setItem('jwt', jwt);
    }
  };

  return { jwt, setJwt: setAndStoreJwt, loadingUser, user, baseUrl };
};

export default useJwt;
