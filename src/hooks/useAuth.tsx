import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { auth as firebaseAuth, signInWithGoogle, logout as firebaseLogout, onAuthStateChanged, type User as FirebaseUser } from '@/lib/firebase';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  firebase?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signInWithGoogle: () => Promise<void>;
  isAdmin: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo accounts
const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'admin@digzoom.com': {
    password: 'admin123',
    user: {
      id: '1',
      name: 'Admin',
      email: 'admin@digzoom.com',
      role: 'admin',
    },
  },
  'user@digzoom.com': {
    password: 'user123',
    user: {
      id: '2',
      name: 'Demo User',
      email: 'user@digzoom.com',
      role: 'user',
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Listen for Firebase auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(firebaseAuth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const u: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
          email: firebaseUser.email || '',
          role: 'user',
          avatar: firebaseUser.photoURL || undefined,
          firebase: true,
        };
        setUser(u);
        localStorage.setItem('digzoom-user', JSON.stringify(u));
      } else {
        // Check local auth
        const saved = localStorage.getItem('digzoom-user');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (!parsed.firebase) {
              setUser(parsed);
            }
          } catch {
            localStorage.removeItem('digzoom-user');
          }
        }
      }
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    const found = DEMO_USERS[email.toLowerCase()];
    if (found && found.password === password) {
      setUser(found.user);
      localStorage.setItem('digzoom-user', JSON.stringify(found.user));
      return true;
    }
    return false;
  }, []);

  const register = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    const key = email.toLowerCase();
    if (DEMO_USERS[key]) return false;

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email: key,
      role: 'user',
    };

    DEMO_USERS[key] = { password, user: newUser };
    setUser(newUser);
    localStorage.setItem('digzoom-user', JSON.stringify(newUser));
    return true;
  }, []);

  const logout = useCallback(() => {
    if (user?.firebase) {
      firebaseLogout();
    }
    setUser(null);
    localStorage.removeItem('digzoom-user');
  }, [user]);

  const signInWithGoogleFn = useCallback(async () => {
    await signInWithGoogle();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      signInWithGoogle: signInWithGoogleFn,
      isAdmin: user?.role === 'admin',
      isLoading,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
