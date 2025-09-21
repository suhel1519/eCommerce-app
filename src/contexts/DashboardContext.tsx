import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { DASHBOARD_METRICS } from '@/constants/dashboardData';

// Types
export interface DashboardMetric {
  title: string;
  value: string;
  change: { value: number; isPositive: boolean };
  backgroundColor?: string;
}

export interface DashboardState {
  metrics: DashboardMetric[];
  lastUpdated: Date | null;
  isRefreshing: boolean;
  autoRefresh: boolean;
  refreshInterval: number;
  selectedDateRange: '7d' | '30d' | '90d' | '1y';
  filters: {
    category: string;
    status: string;
  };
}

// Actions
export type DashboardAction =
  | { type: 'SET_METRICS'; payload: DashboardMetric[] }
  | { type: 'SET_REFRESHING'; payload: boolean }
  | { type: 'SET_AUTO_REFRESH'; payload: boolean }
  | { type: 'SET_REFRESH_INTERVAL'; payload: number }
  | { type: 'SET_DATE_RANGE'; payload: DashboardState['selectedDateRange'] }
  | { type: 'SET_FILTERS'; payload: Partial<DashboardState['filters']> }
  | { type: 'UPDATE_LAST_UPDATED' };

// Initial state
const initialState: DashboardState = {
  metrics: DASHBOARD_METRICS,
  lastUpdated: null,
  isRefreshing: false,
  autoRefresh: true,
  refreshInterval: 30000, // 30 seconds
  selectedDateRange: '30d',
  filters: {
    category: 'all',
    status: 'all',
  },
};

// Reducer
const dashboardReducer = (state: DashboardState, action: DashboardAction): DashboardState => {
  switch (action.type) {
    case 'SET_METRICS':
      return {
        ...state,
        metrics: action.payload,
        lastUpdated: new Date(),
      };

    case 'SET_REFRESHING':
      return {
        ...state,
        isRefreshing: action.payload,
      };

    case 'SET_AUTO_REFRESH':
      return {
        ...state,
        autoRefresh: action.payload,
      };

    case 'SET_REFRESH_INTERVAL':
      return {
        ...state,
        refreshInterval: action.payload,
      };

    case 'SET_DATE_RANGE':
      return {
        ...state,
        selectedDateRange: action.payload,
      };

    case 'SET_FILTERS':
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };

    case 'UPDATE_LAST_UPDATED':
      return {
        ...state,
        lastUpdated: new Date(),
      };

    default:
      return state;
  }
};

// Context
interface DashboardContextType {
  state: DashboardState;
  dispatch: React.Dispatch<DashboardAction>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Provider component
interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  // Auto-refresh effect
  useEffect(() => {
    if (!state.autoRefresh) return;

    const interval = setInterval(() => {
      // Simulate data refresh - in real app, this would fetch from API
      dispatch({ type: 'UPDATE_LAST_UPDATED' });
    }, state.refreshInterval);

    return () => clearInterval(interval);
  }, [state.autoRefresh, state.refreshInterval]);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook to use the context
export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboardContext must be used within a DashboardProvider');
  }
  return context;
};
