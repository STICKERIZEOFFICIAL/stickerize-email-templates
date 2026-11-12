import klaviyoKit from '~/platforms/klaviyo/kit';
import { riseStyles } from '~/platforms/rise-ai/global-theme';
import type { PlatformId } from '~/platforms/tokens';

/**
 * Makes a previewable document out of whatever a template happens to be.
 *
 * Only some of these templates are whole emails. Stamped's are complete HTML
 * documents; the Rise.ai Global theme is a `<style>` plus a `<div>`; every
 * Klaviyo block is a bare `<table>` fragment whose classes (`kl-text`, `btn`,
 * `l-white`) are declared in the kit's head, not in the fragment.
 *
 * Dropped into an iframe unwrapped, a fragment renders on white with no base
 * styles and reads as broken when it is fine. So a fragment gets a shell: the
 * platform's own ground colour, its own base CSS, and nothing invented.
 *
 * This affects the *preview only*. Source and Download always emit the
 * template string untouched — see `tokens.ts`.
 */

/** A template that already opens its own document needs no shell. */
function isWholeDocument(html: string): boolean {
  return /<html[\s>]/i.test(html);
}

/**
 * The kit's head CSS, so a Klaviyo block previews with the classes it
 * references. Read out of the kit rather than copied, so the two cannot drift.
 *
 * Conditional-comment blocks are dropped first. The kit carries an
 * `<!--[if gte mso 9]>` block, and a browser treats that as a comment — so
 * lifting its `<style>` out and applying it unconditionally would show every
 * fragment the Outlook-only rules, which is the opposite of what the preview
 * is for.
 */
function klaviyoBaseStyles(): string {
  const kit = klaviyoKit();
  const head = kit
    .slice(0, kit.search(/<\/head>/i))
    .replace(/<!--\[if[\s\S]*?<!\[endif\]-->/gi, '');
  return [...head.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join('\n');
}

const GROUND: Record<PlatformId, string> = {
  // Rise.ai paints its own ground on `.main`; this matches it.
  'rise-ai': '#fbf9f6',
  stamped: '#fbf9f6',
  // The kit's outer table sits on #F5F3F0 with the 724px column on #FBF9F6.
  klaviyo: '#f5f3f0',
};

/** Width of the content column, so a fragment is not previewed full-bleed. */
const COLUMN: Record<PlatformId, number> = {
  'rise-ai': 732,
  stamped: 732,
  klaviyo: 724,
};

function baseStyles(platform: PlatformId): string {
  switch (platform) {
    case 'rise-ai':
      return riseStyles();
    case 'klaviyo':
      return klaviyoBaseStyles();
    case 'stamped':
      // Stamped templates are whole documents and carry their own head, so a
      // Stamped fragment is not a case that arises. Kept exhaustive so adding
      // one is a compile error rather than a blank preview.
      return '';
  }
}

export function toDocument(platform: PlatformId, html: string, title: string): string {
  if (isWholeDocument(html)) return html;

  return /*html*/ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title}</title>
  <style>${baseStyles(platform)}</style>
  <style>
    /* The shell itself — not part of the email. Only the ground colour and the
       column width, both taken from the platform's own template. */
    html, body { margin: 0; padding: 0; background: ${GROUND[platform]}; }
    .preview-column {
      max-width: ${COLUMN[platform]}px;
      margin: 0 auto;
      background: #fbf9f6;
    }
  </style>
</head>
<body>
  <div class="preview-column">${html}</div>
</body>
</html>`;
}
