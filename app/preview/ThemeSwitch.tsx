import type { Theme } from './theme';

/**
 * Light/dark toggle. Switches the chrome and, with it, how the email in the
 * iframe is rendered — see `simulateDarkMode` in preview.shopify.$slug.tsx.
 */
export function ThemeSwitch({
  theme,
  setTheme,
}: {
  theme: Theme;
  setTheme: (next: Theme) => void;
}) {
  return (
    <div className="segmented" role="group" aria-label="Colour scheme">
      {(['light', 'dark'] as const).map((name) => (
        <button
          key={name}
          type="button"
          className="btn"
          aria-pressed={theme === name}
          title={
            name === 'dark'
              ? 'Simulate how a mail client renders this email in dark mode'
              : 'Render this email as sent'
          }
          onClick={() => setTheme(name)}
        >
          {name === 'light' ? '☀ Light' : '☾ Dark'}
        </button>
      ))}
    </div>
  );
}
