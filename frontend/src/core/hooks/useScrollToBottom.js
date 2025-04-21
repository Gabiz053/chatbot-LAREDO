// useScrollToBottom.js - Optimized React hook for auto-scrolling containers
// ---------------------------------------------------------------------
// This hook ensures a scrollable container always scrolls to the bottom when dependencies change.
// Useful for chat UIs and live logs.

import { useRef, useEffect } from "react";

/**
 * useScrollToBottom
 *
 * Custom React hook that scrolls a container to the bottom whenever dependencies change.
 *
 * @param {Array<any>} dependencies - Dependency array to trigger auto-scroll (e.g., [messages.length, isLoading]).
 * @returns {React.RefObject<HTMLDivElement>} Ref to attach to the scrollable container.
 */
function useScrollToBottom(dependencies = []) {
  /** @type {React.RefObject<HTMLDivElement>} */
  const containerRef = useRef(null);
  // Track if it's the first scroll
  const isFirstScroll = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // On first scroll, jump instantly; afterwards, scroll smoothly
    container.scrollTo({
      top: container.scrollHeight,
      behavior: isFirstScroll.current ? "auto" : "smooth",
    });
    isFirstScroll.current = false;
  }, dependencies);

  return containerRef;
}

export default useScrollToBottom;
