import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Types
export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export interface ThemeState {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  systemTheme: ResolvedTheme;
  isLoading: boolean;
}

// Actions
export type ThemeAction =
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'SET_RESOLVED_THEME'; payload: ResolvedTheme }
  | { type: 'SET_SYSTEM_THEME'; payload: ResolvedTheme }
  | { type: 'SET_LOADING'; payload: boolean };

// Initial state
const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'system';
  return (localStorage.getItem('theme') as Theme) || 'system';
};

const initialState: ThemeState = {
  theme: 'system',
  resolvedTheme: 'light',
  systemTheme: 'light',
  isLoading: true,
};

// Reducer
const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'SET_THEME':
      const newResolvedTheme = action.payload === 'system' ? state.systemTheme : action.payload;
      return {
        ...state,
        theme: action.payload,
        resolvedTheme: newResolvedTheme,
      };

    case 'SET_RESOLVED_THEME':
      return {
        ...state,
        resolvedTheme: action.payload,
      };

    case 'SET_SYSTEM_THEME':
      const newResolved = state.theme === 'system' ? action.payload : state.resolvedTheme;
      return {
        ...state,
        systemTheme: action.payload,
        resolvedTheme: newResolved,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};

// Context
interface ThemeContextType {
  state: ThemeState;
  dispatch: React.Dispatch<ThemeAction>;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component
interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

export const CustomThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
  enableSystem = true,
  disableTransitionOnChange = false,
}) => {
  const [state, dispatch] = useReducer(themeReducer, {
    ...initialState,
    theme: defaultTheme,
    systemTheme: getSystemTheme(),
  });

  // Apply theme to document
  const applyTheme = (theme: ResolvedTheme, skipTransition = false) => {
    const root = document.documentElement;
    
    if (skipTransition && disableTransitionOnChange) {
      // Temporarily disable transitions
      const style = document.createElement('style');
      style.innerHTML = `
        *, *::before, *::after {
          transition-duration: 0.01ms !important;
          transition-delay: 0.01ms !important;
          animation-duration: 0.01ms !important;
          animation-delay: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      `;
      document.head.appendChild(style);
      
      setTimeout(() => {
        document.head.removeChild(style);
      }, 1);
    }

    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    // Add new theme class
    root.classList.add(theme);
    
    // Set CSS custom property for immediate access
    root.style.setProperty('--theme', theme);
    
    // Update meta theme-color for mobile browsers
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', theme === 'dark' ? '#0f172a' : '#ffffff');
    }
  };

  // Set theme function
  const setTheme = (newTheme: Theme) => {
    dispatch({ type: 'SET_THEME', payload: newTheme });
    localStorage.setItem('theme', newTheme);
    
    const resolvedTheme = newTheme === 'system' ? state.systemTheme : newTheme;
    applyTheme(resolvedTheme, true);
  };

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = state.resolvedTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Initialize theme on mount
  useEffect(() => {
    const storedTheme = getStoredTheme();
    const systemTheme = getSystemTheme();
    
    dispatch({ type: 'SET_SYSTEM_THEME', payload: systemTheme });
    dispatch({ type: 'SET_THEME', payload: storedTheme });
    
    const resolvedTheme = storedTheme === 'system' ? systemTheme : storedTheme;
    applyTheme(resolvedTheme);
    
    dispatch({ type: 'SET_LOADING', payload: false });
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    if (!enableSystem) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const newSystemTheme = e.matches ? 'dark' : 'light';
      dispatch({ type: 'SET_SYSTEM_THEME', payload: newSystemTheme });
      
      if (state.theme === 'system') {
        applyTheme(newSystemTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [enableSystem, state.theme]);

  // Apply theme changes
  useEffect(() => {
    if (!state.isLoading) {
      applyTheme(state.resolvedTheme);
    }
  }, [state.resolvedTheme, state.isLoading]);

  return (
    <ThemeContext.Provider value={{ state, dispatch, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useCustomTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useCustomTheme must be used within a CustomThemeProvider');
  }
  return context;
};
