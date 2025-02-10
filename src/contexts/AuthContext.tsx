import { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '@/types/user';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const createUserFromFirebase = (firebaseUser: any): User => ({
  user_id: parseInt(firebaseUser.uid.slice(0, 8), 16), // UIDの最初の8文字を数値に変換
  user_name: firebaseUser.displayName || '名称未設定',
  email: firebaseUser.email || '',
  profile_icon_url: firebaseUser.photoURL,
  profile_audio_url: null,
  shop_link_url: null,
  is_shop_link: false,
  introduction: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  notification_settings: {
    comments: true,
    highlights: true,
    new_followers: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsInitialized(true);
      setIsLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setIsLoading(true);
      try {
        if (firebaseUser) {
          const appUser = createUserFromFirebase(firebaseUser);
          setUser(appUser);
          localStorage.setItem('user', JSON.stringify(appUser));
        } else {
          setUser(null);
          localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setUser(null);
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const login = async () => {
    try {
      setIsLoading(true);
      if (import.meta.env.VITE_DEV_MODE === 'true') {
        // 開発環境用のモックユーザー
        const mockUser: User = {
          user_id: 1,
          user_name: 'テストユーザー',
          email: 'test@example.com',
          profile_icon_url: null,
          profile_audio_url: null,
          shop_link_url: null,
          is_shop_link: false,
          introduction: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          notification_settings: {
            comments: true,
            highlights: true,
            new_followers: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        };
        setUser(mockUser);
        return;
      }
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const appUser = createUserFromFirebase(result.user);
      setUser(appUser);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isInitialized, login, logout }}>
      {isInitialized ? children : null}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
