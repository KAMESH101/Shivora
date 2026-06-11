import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser, useClerk, useAuth as useClerkAuth } from '@clerk/clerk-react';

// AuthContext handles logged in user info across the whole app using Clerk

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { user: clerkUser, isLoaded } = useUser();
  const { signOut } = useClerk();
  const { getToken } = useClerkAuth();

  const [user, setUser] = useState(function() {
    const saved = localStorage.getItem('shivora_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(function() {
    if (isLoaded) {
      if (clerkUser) {
        const mappedUser = {
          id: clerkUser.id,
          name: clerkUser.fullName || clerkUser.firstName || 'User',
          email: clerkUser.primaryEmailAddress?.emailAddress || '',
        };
        setUser(mappedUser);
        localStorage.setItem('shivora_user', JSON.stringify(mappedUser));

        // Get token and store in local storage for legacy compatibility
        getToken().then(function(token) {
          if (token) localStorage.setItem('shivora_token', token);
        });
      } else {
        setUser(null);
        localStorage.removeItem('shivora_user');
        localStorage.removeItem('shivora_token');
      }
    }
  }, [clerkUser, isLoaded, getToken]);

  async function getAuthToken() {
    if (!clerkUser) return null;
    const token = await getToken();
    if (token) {
      localStorage.setItem('shivora_token', token);
    }
    return token;
  }

  function login(userData, token) {
    // Legacy support (Clerk handles login natively)
  }

  function logout() {
    signOut();
    localStorage.removeItem('shivora_user');
    localStorage.removeItem('shivora_token');
  }

  const isLoggedIn = isLoaded && clerkUser !== null;

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn, getAuthToken, isLoaded }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
