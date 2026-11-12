import type { PlatformId } from '~/platforms/tokens';

/**
 * Light and dark rendering for the non-Shopify compartment.
 *
 * The three platforms are not in the same position, so one strategy would lie
 * about two of them:
 *
 *   Rise.ai   ships real dark-mode CSS — `prefers-color-scheme` rules plus
 *             `[data-ogsc]` for Outlook, driving dm-invert / dm-line /
 *             dm-muted / dm-btn. A preview should show *that* design, not a
 *             simulation of a client guessing.
 *   Stamped   declares none.
 *   Klaviyo   declares none.
 *
 * Both halves of the toggle need work, not just the dark one. A template that
 * carries `prefers-color-scheme` rules renders them whenever the *viewer's* OS
 * is in dark mode, which would mean the Light setting showing the dark design
 * on a developer's dark laptop — the toggle controlling nothing. So:
 *
 *   light   neutralise the template's own dark rules and pin `color-scheme`,
 *           so Light means light on any machine.
 *   dark    neutralise them too, then re-apply their bodies unconditionally —
 *           an iframe cannot be told the OS prefers dark, so the media query
 *           would never match on a light machine either.
 *
 * Either way the toggle, not the viewer's hardware, decides what is on screen.
 */

export type DarkStrategy = 'authored' | 'simulated';

export const DARK_STRATEGY: Record<PlatformId, DarkStrategy> = {
  'rise-ai': 'authored',
  stamped: 'simulated',
  klaviyo: 'simulated',
};

const DARK_MEDIA = '@media (prefers-color-scheme: dark)';

/**
 * A media query that can never match, so the template's dark rules stay in the
 * document — visible under Source, still pasted into the platform — but stop
 * firing on a dark-mode machine.
 */
const NEVER = `${DARK_MEDIA} and (max-width: 0px)`;

/** Finds the body of every `prefers-color-scheme: dark` block. */
function darkBlocks(html: string): string[] {
  const blocks: string[] = [];

  let from = 0;
  for (;;) {
    const at = html.indexOf(DARK_MEDIA, from);
    if (at === -1) break;

    const open = html.indexOf('{', at + DARK_MEDIA.length);
    if (open === -1) break;

    // Brace-counted: these blocks contain nested rules, so a lazy `[^}]*`
    // would stop at the first inner brace.
    let depth = 0;
    let cursor = open;
    for (; cursor < html.length; cursor += 1) {
      if (html[cursor] === '{') depth += 1;
      else if (html[cursor] === '}') {
        depth -= 1;
        if (depth === 0) break;
      }
    }
    if (depth !== 0) break;

    blocks.push(html.slice(open + 1, cursor));
    from = cursor + 1;
  }

  return blocks;
}

/** Stops the template's own dark rules from firing on a dark-mode machine. */
function disableDarkMedia(html: string): string {
  return html.split(DARK_MEDIA).join(NEVER);
}

function pinScheme(html: string, scheme: 'light' | 'dark'): string {
  return injectIntoHead(
    html,
    `
    <style id="preview-color-scheme">
      /* Rise.ai declares \`color-scheme: light dark\`, which lets the client
         repaint the ground on its own. Pin it so the toggle decides. */
      :root { color-scheme: ${scheme} !important; }
    </style>`,
  );
}

/** The email as sent, with no client interference. */
export function renderLight(platform: PlatformId, html: string): string {
  if (DARK_STRATEGY[platform] !== 'authored') return html;
  return pinScheme(disableDarkMedia(html), 'light');
}

/**
 * The template's own dark design, applied unconditionally.
 *
 * The original block is neutralised first so the rules land exactly once,
 * whichever mode the viewer's machine is in.
 */
export function renderAuthoredDark(html: string): string {
  const blocks = darkBlocks(html);
  if (blocks.length === 0) return html;

  const style = `
    <style id="preview-dark-authored">
      /* The template's own dark-mode rules, applied unconditionally: an iframe
         cannot be told the OS prefers dark, so the media query never matches
         on a light machine. Everything below is copied verbatim out of the
         template. */
      ${blocks.join('\n')}
    </style>`;

  return pinScheme(injectIntoHead(disableDarkMedia(html), style), 'dark');
}

/**
 * Approximates what a mail client does to an email that declares no dark-mode
 * support: invert the document, then flip media back, which is how those
 * clients treat images.
 *
 * A simulation, not a guarantee — every client inverts differently. Use it to
 * catch unreadable text, boxes that vanish and logos that turn to mud.
 */
export function simulateDarkMode(html: string): string {
  // Gmail lands light email grounds on #262422. The whole document is
  // filtered, so the ground has to start here to come out there: #dcdad8 is
  // the pre-image of #262422 through invert(1) hue-rotate(180deg). Changing
  // one means recomputing the other.
  const GROUND_BEFORE_FILTER = '#dcdad8';

  const style = `
    <style id="preview-dark-simulation">
      html {
        background-color: ${GROUND_BEFORE_FILTER};
        filter: invert(1) hue-rotate(180deg);
      }
      /* These templates paint their own light ground in places; remap those
         too, or they filter to black and the page reads as two tones. */
      body,
      .main,
      [bgcolor="#fbf9f6"] {
        background-color: ${GROUND_BEFORE_FILTER} !important;
      }
      img, video {
        filter: invert(1) hue-rotate(180deg);
      }
    </style>`;

  return injectIntoHead(html, style);
}

/**
 * Rise.ai bodies and Klaviyo components are document *fragments* — no `<head>`,
 * often no `<html>` — so a style cannot always be appended to a head that
 * exists. `document.ts` shells most of these, but this stays safe either way.
 */
function injectIntoHead(html: string, style: string): string {
  if (html.includes('</head>')) return html.replace('</head>', `${style}\n</head>`);
  return style + html;
}

export function applyScheme(
  platform: PlatformId,
  html: string,
  scheme: 'light' | 'dark',
): string {
  if (scheme === 'light') return renderLight(platform, html);
  return DARK_STRATEGY[platform] === 'authored'
    ? renderAuthoredDark(html)
    : simulateDarkMode(html);
}

/** The caveat shown under the frame, which differs by strategy. */
export function darkModeNote(platform: PlatformId): string {
  return DARK_STRATEGY[platform] === 'authored'
    ? "The template's own dark-mode CSS, applied unconditionally because an iframe cannot be told the OS prefers dark. This is the authored design rather than a simulation — but Gmail ignores these rules and applies its own inversion regardless."
    : 'Simulated. This template declares no dark-mode support, so clients that force it — Outlook, Apple Mail, the Gmail app — invert the colours themselves, and that inversion is what you are seeing. Images are flipped back, as those clients leave them alone. Treat it as a check for unreadable text and vanishing boxes rather than an exact preview.';
}
