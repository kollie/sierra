import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { mockUser } from '@/data/mockData';
import { User } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  location: string;
  setLocation: (location: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(mockUser);
  const [location, setLocation] = useState<string>('San Francisco, CA');

  // Load saved location on app start
  useEffect(() => {
    const loadSavedLocation = async () => {
      try {
        const savedLocation = await AsyncStorage.getItem('userLocation');
        if (savedLocation) {
          setLocation(savedLocation);
        }
      } catch (error) {
        console.error('Error loading saved location:', error);
      }
    };
    
    loadSavedLocation();
  }, []);

  // Save location when it changes
  const handleSetLocation = async (newLocation: string) => {
    setLocation(newLocation);
    try {
      await AsyncStorage.setItem('userLocation', newLocation);
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

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
        location,
        setLocation: handleSetLocation,
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