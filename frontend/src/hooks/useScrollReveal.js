import { useEffect, useRef, useState } from 'react';

export function useScrollReveal(options = { threshold: 0.1, triggerOnce: true }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    
    // Fallback if IntersectionObserver isn't supported (e.g. very old browsers)
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (options.triggerOnce && currentRef) {
          observer.unobserve(currentRef);
        }
      } else if (!options.triggerOnce) {
        // Optional: hide again when scrolling away if triggerOnce is false
        setIsVisible(false);
      }
    }, {
      threshold: options.threshold,
      rootMargin: options.rootMargin || '0px 0px -50px 0px'
    });

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.triggerOnce, options.rootMargin]);

  return { ref, isVisible };
}
