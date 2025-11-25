// PFA - Premier Fitness Alliance Training App
// Authentication Context

import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'admin' | 'client';

interface User {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (role?: UserRole) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signIn = (role: UserRole = 'admin') => {
    setIsLoading(true);
    // Simulate sign in - in production this would use Firebase Auth
    const mockUser: User = {
      id: 'dev-user-123',
      email: 'coach@premierfa.com',
      displayName: 'Coach Diego',
      role,
    };
    setUser(mockUser);
    setIsLoading(false);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
