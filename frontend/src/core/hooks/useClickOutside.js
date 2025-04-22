// useClickOutside.js - Custom React hook for detecting outside clicks
// ---------------------------------------------------------------
// This hook calls a handler function when a click occurs outside a referenced element.

import { useEffect, useCallback } from "react";

/**
 * Checks if a click event occurred outside the referenced element.
 * Calls the handler if so.
 *
 * @param {React.RefObject<HTMLElement>} ref - Ref to the element
 * @param {() => void} handler - Handler to call on outside click
 * @param {MouseEvent} event - Mouse event
 */
function handleOutsideClick(ref, handler, event) {
  if (
    ref.current &&
    event.target instanceof Node &&
    !ref.current.contains(event.target)
  ) {
    handler();
  }
}

/**
 * useClickOutside - Custom React hook
 *
 * Calls the handler when a click outside the referenced element occurs, if enabled.
 *
 * @param {React.RefObject<HTMLElement>} ref - Ref to the element to detect outside clicks for
 * @param {() => void} handler - Function to call when an outside click is detected
 * @param {boolean} enabled - Whether the outside click detection is active
 */
function useClickOutside(ref, handler, enabled) {
  // Memoize the event handler to avoid unnecessary re-registrations
  const memoizedHandler = useCallback(
    /**
     * Handles the mousedown event and calls the handler if the click is outside the ref element.
     * @param {MouseEvent} event
     */
    (event) => handleOutsideClick(ref, handler, event),
    [ref, handler],
  );

  useEffect(() => {
    if (!enabled) return;
    document.addEventListener("mousedown", memoizedHandler);
    return () => document.removeEventListener("mousedown", memoizedHandler);
  }, [enabled, memoizedHandler]);
}

export default useClickOutside;
