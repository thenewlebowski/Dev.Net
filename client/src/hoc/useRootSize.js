import { useState, useEffect } from "react";

export default function useRootSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [rootSize, setRootSize] = useState({
    width: undefined,
    height: undefined
  });

  const root = document.getElementById('root');

  useEffect(() => {
      console.log('[useRootSize] ' + root.offsetHeight);
    // Handler to call on root resize
    function handleResize() {
      // Set root width/height to state
      setRootSize({
        width: root.offsetWidth,
        height: root.offsetHeight
      });
    }

    // Add event listener
    document.addEventListener("click", handleResize);
    
    // debugger;
    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => document.removeEventListener("click", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return rootSize;
}