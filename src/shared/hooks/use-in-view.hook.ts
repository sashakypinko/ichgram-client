import { useState, useEffect, useRef } from 'react';

const useInView = <T extends HTMLElement>(options: IntersectionObserverInit = {}) => {
  const [isInView, setIsInView] = useState<boolean>(false);
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [options]);

  return { isInView, elementRef };
};

export default useInView;
