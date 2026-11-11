import { useEffect, useState } from 'react';

/**
 * True while the viewport is too narrow to show a 732px email at full width.
 * Used to force the mobile rendering and to swap the sidebar for a drawer —
 * the same breakpoint the stylesheet uses.
 */
export function useNarrowViewport(query = '(max-width: 860px)') {
  // Starts false so the server render and the first client render agree.
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [query]);

  return narrow;
}
