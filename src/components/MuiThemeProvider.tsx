import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useCustomTheme } from '@/contexts/ThemeContext';
import { lightTheme, darkTheme } from '@/theme/muiTheme';
import { ReactNode } from 'react';

interface MuiThemeProviderProps {
  children: ReactNode;
}

export function MuiThemeProvider({ children }: MuiThemeProviderProps) {
  const { state } = useCustomTheme();

  if (state.isLoading) {
    return <>{children}</>;
  }

  const muiTheme = state.resolvedTheme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}