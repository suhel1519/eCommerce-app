import { useCallback } from 'react';
import { useAppContext, AppState } from '@/contexts/AppContext';

export const useAppSettings = () => {
  const { state, dispatch } = useAppContext();

  const updateDashboardSettings = useCallback((
    settings: Partial<AppState['dashboardSettings']>
  ) => {
    dispatch({ type: 'UPDATE_DASHBOARD_SETTINGS', payload: settings });
  }, [dispatch]);

  const toggleSidebar = useCallback(() => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  }, [dispatch]);

  const setSidebarCollapsed = useCallback((collapsed: boolean) => {
    dispatch({ type: 'SET_SIDEBAR_COLLAPSED', payload: collapsed });
  }, [dispatch]);

  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, [dispatch]);

  return {
    // State
    dashboardSettings: state.dashboardSettings,
    sidebarCollapsed: state.sidebarCollapsed,
    loading: state.loading,
    
    // Actions
    updateDashboardSettings,
    toggleSidebar,
    setSidebarCollapsed,
    setLoading,
  };
};
