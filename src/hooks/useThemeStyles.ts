import { useMemo } from 'react';
import { useCustomTheme } from '@/contexts/ThemeContext';

export const useThemeStyles = () => {
  const { state } = useCustomTheme();

  const themeStyles = useMemo(() => {
    const isDark = state.resolvedTheme === 'dark';
    
    return {
      // Background styles
      background: {
        primary: isDark ? 'bg-gray-900' : 'bg-white',
        secondary: isDark ? 'bg-gray-800' : 'bg-gray-50',
        tertiary: isDark ? 'bg-gray-700' : 'bg-gray-100',
        card: isDark ? 'bg-gray-800' : 'bg-white',
        muted: isDark ? 'bg-gray-700' : 'bg-gray-100',
      },
      
      // Text styles
      text: {
        primary: isDark ? 'text-white' : 'text-gray-900',
        secondary: isDark ? 'text-gray-300' : 'text-gray-600',
        muted: isDark ? 'text-gray-400' : 'text-gray-500',
        accent: isDark ? 'text-blue-400' : 'text-blue-600',
      },
      
      // Border styles
      border: {
        default: isDark ? 'border-gray-700' : 'border-gray-200',
        muted: isDark ? 'border-gray-600' : 'border-gray-300',
        accent: isDark ? 'border-blue-500' : 'border-blue-400',
      },
      
      // Interactive styles
      interactive: {
        hover: isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100',
        active: isDark ? 'active:bg-gray-600' : 'active:bg-gray-200',
        focus: 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      },
      
      // Utility functions
      isDark,
      isLight: !isDark,
      theme: state.resolvedTheme,
    };
  }, [state.resolvedTheme]);

  return themeStyles;
};

// Hook for conditional theme classes
export const useThemeClasses = (lightClass: string, darkClass: string) => {
  const { state } = useCustomTheme();
  return state.resolvedTheme === 'dark' ? darkClass : lightClass;
};

// Hook for theme-aware colors
export const useThemeColors = () => {
  const { state } = useCustomTheme();
  
  return useMemo(() => {
    const isDark = state.resolvedTheme === 'dark';
    
    return {
      // Chart colors that work in both themes
      chart: {
        primary: isDark ? '#60a5fa' : '#3b82f6',
        secondary: isDark ? '#34d399' : '#10b981',
        tertiary: isDark ? '#fbbf24' : '#f59e0b',
        quaternary: isDark ? '#f87171' : '#ef4444',
        success: isDark ? '#34d399' : '#10b981',
        warning: isDark ? '#fbbf24' : '#f59e0b',
        error: isDark ? '#f87171' : '#ef4444',
        info: isDark ? '#60a5fa' : '#3b82f6',
      },
      
      // Status colors
      status: {
        online: isDark ? '#10b981' : '#059669',
        offline: isDark ? '#6b7280' : '#4b5563',
        busy: isDark ? '#f59e0b' : '#d97706',
        away: isDark ? '#f59e0b' : '#d97706',
      },
      
      // Semantic colors
      semantic: {
        success: isDark ? '#10b981' : '#059669',
        warning: isDark ? '#f59e0b' : '#d97706',
        error: isDark ? '#ef4444' : '#dc2626',
        info: isDark ? '#3b82f6' : '#2563eb',
      },
    };
  }, [state.resolvedTheme]);
};
