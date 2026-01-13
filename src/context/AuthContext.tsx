import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, mockCurrentUser } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'customer' | 'chef') => Promise<void>;
  logout: () => void;
  signup: (name: string, email: string, password: string, role: 'customer' | 'chef') => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: 'customer' | 'chef') => {
    // Mock login - in real app, this would call an API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (role === 'customer') {
      setUser(mockCurrentUser);
    } else {
      // Mock chef user
      setUser({
        id: 'chef-1',
        name: 'Priya Sharma',
        email: email,
        phone: '+91 98765 11111',
        role: 'chef',
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200'
      });
    }
  };

  const signup = async (name: string, email: string, password: string, role: 'customer' | 'chef') => {
    // Mock signup
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newUser: User = {
      id: `${role}-${Date.now()}`,
      name,
      email,
      phone: '',
      role,
      credits: role === 'customer' ? 0 : undefined
    };
    
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      signup, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
