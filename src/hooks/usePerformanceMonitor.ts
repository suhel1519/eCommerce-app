import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  componentName: string;
  renderTime: number;
  timestamp: number;
}

export const usePerformanceMonitor = (componentName: string, enabled = false) => {
  const renderStartTime = useRef<number>(0);
  const renderCount = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;
    
    renderStartTime.current = performance.now();
    renderCount.current += 1;
  });

  useEffect(() => {
    if (!enabled) return;

    const renderEndTime = performance.now();
    const renderTime = renderEndTime - renderStartTime.current;

    const metrics: PerformanceMetrics = {
      componentName,
      renderTime,
      timestamp: Date.now(),
    };

    // Log performance metrics in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 Performance [${componentName}]:`, {
        renderTime: `${renderTime.toFixed(2)}ms`,
        renderCount: renderCount.current,
        timestamp: new Date(metrics.timestamp).toISOString(),
      });

      // Warn about slow renders
      if (renderTime > 16) { // 60fps threshold
        console.warn(`⚠️ Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
      }
    }

    // In production, you could send metrics to an analytics service
    // Example: analytics.track('component_render', metrics);
  });

  return {
    renderCount: renderCount.current,
  };
};
