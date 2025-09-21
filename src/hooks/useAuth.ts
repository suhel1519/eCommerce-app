import { useCallback } from 'react';
import { useAppContext, User } from '@/contexts/AppContext';

export const useAuth = () => {
  const { state, dispatch } = useAppContext();

  const login = useCallback((user: User) => {
    dispatch({ type: 'SET_USER', payload: user });
    // Here you could also store in localStorage or make API calls
    localStorage.setItem('user', JSON.stringify(user));
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch({ type: 'SET_USER', payload: null });
    localStorage.removeItem('user');
  }, [dispatch]);

  const updateUser = useCallback((updates: Partial<User>) => {
    if (state.user) {
      const updatedUser = { ...state.user, ...updates };
      dispatch({ type: 'SET_USER', payload: updatedUser });
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  }, [dispatch, state.user]);

  // Initialize user from localStorage on app start
  const initializeAuth = useCallback(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch({ type: 'SET_USER', payload: user });
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, [dispatch]);

  return {
    // State
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    
    // Actions
    login,
    logout,
    updateUser,
    initializeAuth,
  };
};
