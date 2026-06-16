import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

// Read theme synchronously BEFORE first render to avoid any flash of wrong theme
function getInitialTheme() {
  try {
    const saved = localStorage.getItem('shivora-theme');
    if (saved === 'dark' || saved === 'light') return saved;
  } catch (e) {
    // localStorage not available (e.g. SSR)
  }
  // Fall back to system preference
  try {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch (e) { /* ignore */ }
  return 'light';
}

// Apply theme to <html> immediately so CSS variables take effect before paint
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

// Apply on module load (before any React render) to prevent flash
applyTheme(getInitialTheme());

export function ThemeProvider({ children }) {
  // Use lazy initializer — runs once, synchronously, before first render
  const [theme, setTheme] = useState(getInitialTheme);

  // Keep <html data-theme> and localStorage in sync whenever theme changes
  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem('shivora-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
