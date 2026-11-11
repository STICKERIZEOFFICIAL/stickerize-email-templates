import { useCallback, useEffect, useState } from 'react';

/**
 * Light/dark for the preview. One switch drives two things:
 *
 *  1. the browser chrome around the email (tokens in preview.css), and
 *  2. how the email itself is rendered — see `preview.shopify.$slug.tsx`,
 *     which simulates the colour inversion mail clients force onto emails
 *     that don't declare dark mode support.
 */

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'stickerize-preview-theme';

/**
 * Runs before first paint so a dark-mode reload doesn't flash white. Inlined
 * into the document head by root.tsx; keep it dependency-free and tiny.
 */
export const THEME_INIT_SCRIPT = `
try {
  var t = localStorage.getItem('${THEME_STORAGE_KEY}');
  if (t !== 'dark' && t !== 'light') {
    t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.dataset.theme = t;
} catch (e) {}
`.trim();

function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function useTheme() {
  // Always start light so the server and the first client render agree; the
  // inline script has already painted the right colours by this point.
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    setThemeState(readStoredTheme());
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private browsing or blocked storage: the choice just won't persist.
    }
  }, []);

  return { theme, setTheme };
}

/** Preview URL for a template, carrying the theme through to the iframe. */
export function previewSrc(slug: string, theme: Theme) {
  return `/preview/shopify/${slug}${theme === 'dark' ? '?theme=dark' : ''}`;
}
