import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextType {
  jwt: string | null;
  setJwt: (jwt: string | null) => void;
  loadingUser: boolean;
  user: any;
  baseUrl: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [loadingUser, setLoadingUser] = useState(true);
  const [jwt, setJwt] = useState<string | null>(null);
  const [user, setUser] = useState(null);

  const baseUrl = import.meta.env.VITE_PUBLIC_BASE_URL || '';

  useEffect(() => {
    const localJWT = localStorage.getItem('jwt');
    setJwt(localJWT || null);
    fetch(baseUrl.concat('/api/admin/get-user'), {
      headers: {
        Authorization: `Bearer ${localJWT}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error(error);
      });

    setLoadingUser(false);
  }, [baseUrl]);

  const value: AuthContextType = {
    jwt,
    setJwt,
    loadingUser,
    user,
    baseUrl,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
