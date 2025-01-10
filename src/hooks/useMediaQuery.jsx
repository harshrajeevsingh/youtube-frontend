import { useState, useEffect } from 'react';

const useMediaQuery = (query) => {
  // Initialize with the current match state
  const [matches, setMatches] = useState(() => {
    // Check if window is available (for SSR compatibility)
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    // Return early if window is not available
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia(query);

    // Update matches state when media query changes
    const handleChange = (event) => {
      setMatches(event.matches);
    };

    // Set initial value
    setMatches(mediaQuery.matches);

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    // Older browsers
    else {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [query]); // Re-run effect when query changes

  return matches;
};

export default useMediaQuery;
