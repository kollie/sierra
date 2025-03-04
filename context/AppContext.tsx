import { createContext, useContext, useState, ReactNode } from 'react';
import { mockUser } from '@/data/mockData';
import { User } from '@/types';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(mockUser);

  const login = async (email: string, password: string): Promise<void> => {
    // In a real app, this would make an API call to authenticate
    // For now, we'll just simulate a successful login with a delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple validation for demo purposes
        if (email === 'user@example.com' && password === 'password') {
          setUser(mockUser);
          resolve();
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
}