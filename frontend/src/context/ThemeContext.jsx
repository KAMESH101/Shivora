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

  const toggleTheme = (e) => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const x = e && typeof e.clientX === 'number' ? e.clientX : window.innerWidth / 2;
    const y = e && typeof e.clientY === 'number' ? e.clientY : window.innerHeight / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`
          ]
        },
        {
          duration: 400,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          pseudoElement: '::view-transition-new(root)'
        }
      );
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
