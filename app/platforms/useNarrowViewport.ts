import { useEffect, useState } from 'react';

/**
 * True while the viewport is too narrow to show a full-width email. Used to
 * force the mobile rendering and to swap the sidebar for a drawer — the same
 * breakpoint the stylesheet uses.
 *
 * A copy of `app/preview/useNarrowViewport.ts` rather than an import of it:
 * this compartment shares no code with the Shopify one, and twenty lines of
 * duplication is cheaper than a dependency that makes the two move together.
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
