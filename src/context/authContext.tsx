import { onAuthStateChanged, onIdTokenChanged, User } from 'firebase/auth';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth } from '../firebase/firebase';

interface AuthContextType {
  currentUser: User | null;
  userLoggedIn: boolean;
  loading: boolean;
  baseUrl: string;
  token: string | null;
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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.VITE_PUBLIC_BASE_URL || '';

  useEffect(() => {
    // listen for auth state changes
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setUserLoggedIn(!!user);
      setLoading(false);
    });

    // listen for token changes and refresh it automatically
    const unsubscribeToken = onIdTokenChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        const newToken = await user.getIdToken(true);
        setToken(newToken);
        setLoading(false);
      } else {
        setToken(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeToken();
    };
  }, []);

  const value: AuthContextType = {
    currentUser,
    userLoggedIn,
    loading,
    baseUrl,
    token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
