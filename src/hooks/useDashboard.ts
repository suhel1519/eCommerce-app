import { useCallback } from 'react';
import { useDashboardContext, DashboardMetric, DashboardState } from '@/contexts/DashboardContext';

export const useDashboard = () => {
  const { state, dispatch } = useDashboardContext();

  const refreshMetrics = useCallback(async () => {
    dispatch({ type: 'SET_REFRESHING', payload: true });
    
    try {
      // Simulate API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would fetch new data here
      // const newMetrics = await fetchDashboardMetrics();
      // dispatch({ type: 'SET_METRICS', payload: newMetrics });
      
      dispatch({ type: 'UPDATE_LAST_UPDATED' });
    } catch (error) {
      console.error('Failed to refresh metrics:', error);
    } finally {
      dispatch({ type: 'SET_REFRESHING', payload: false });
    }
  }, [dispatch]);

  const setAutoRefresh = useCallback((enabled: boolean) => {
    dispatch({ type: 'SET_AUTO_REFRESH', payload: enabled });
  }, [dispatch]);

  const setRefreshInterval = useCallback((interval: number) => {
    dispatch({ type: 'SET_REFRESH_INTERVAL', payload: interval });
  }, [dispatch]);

  const setDateRange = useCallback((range: DashboardState['selectedDateRange']) => {
    dispatch({ type: 'SET_DATE_RANGE', payload: range });
    // Trigger data refresh when date range changes
    refreshMetrics();
  }, [dispatch, refreshMetrics]);

  const setFilters = useCallback((filters: Partial<DashboardState['filters']>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
    // Trigger data refresh when filters change
    refreshMetrics();
  }, [dispatch, refreshMetrics]);

  const updateMetrics = useCallback((metrics: DashboardMetric[]) => {
    dispatch({ type: 'SET_METRICS', payload: metrics });
  }, [dispatch]);

  return {
    // State
    metrics: state.metrics,
    lastUpdated: state.lastUpdated,
    isRefreshing: state.isRefreshing,
    autoRefresh: state.autoRefresh,
    refreshInterval: state.refreshInterval,
    selectedDateRange: state.selectedDateRange,
    filters: state.filters,
    
    // Actions
    refreshMetrics,
    setAutoRefresh,
    setRefreshInterval,
    setDateRange,
    setFilters,
    updateMetrics,
  };
};
