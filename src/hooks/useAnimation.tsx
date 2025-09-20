import { useEffect, useState } from 'react';

export function useStaggeredAnimation(itemCount: number, delay: number = 100) {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newItems = Array.from({ length: itemCount }, (_, i) => i);
      setVisibleItems(newItems);
    }, 50);

    return () => clearTimeout(timer);
  }, [itemCount]);

  return visibleItems;
}

export function useDelayedRender(delay: number = 300) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return shouldRender;
}