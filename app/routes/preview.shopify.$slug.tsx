import type { LoaderFunctionArgs } from '@remix-run/node';
import { renderLiquid } from '~/preview/liquid.server';
import { toLocale } from '~/preview/locales';
import { getTemplate } from '~/preview/registry';
import { DISCOUNTED_APPLICATIONS } from '~/preview/sample-data';

/**
 * Resource route serving a single template as a standalone document, so the
 * gallery and the preview stage can load it in an iframe.
 *
 *   /preview/shopify/order-confirmation             rendered with sample data
 *   /preview/shopify/order-confirmation?theme=dark  + dark mode simulation
 *   /preview/shopify/order-confirmation?locale=en   language variant
 *   /preview/shopify/order-confirmation?discount=1  + an order-wide discount
 *   /preview/shopify/order-confirmation?source=1    raw Liquid source as text
 */
export async function loader({ params, request }: LoaderFunctionArgs) {
  const template = getTemplate(params.slug);
  if (!template) {
    throw new Response(`Unknown template: ${params.slug}`, { status: 404 });
  }

  const source = template.render();
  const url = new URL(request.url);

  if (url.searchParams.has('source')) {
    return new Response(source, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  const locale = toLocale(url.searchParams.get('locale'));
  // The order summary's "Order discount" row renders only for an order-wide
  // merchandise discount, which the default fixture deliberately has none of.
  // This layers one on so both states of that row — and the spacing around
  // it — can be seen without editing the fixture.
  const discounted = url.searchParams.get('discount') === '1';
  const { html, error } = await renderLiquid(source, {
    ...template.data,
    ...(discounted ? { discount_applications: DISCOUNTED_APPLICATIONS } : {}),
    locale,
  });
  const body = error
    ? wrapError(template.slug, error, html)
    : url.searchParams.get('theme') === 'dark'
      ? simulateDarkMode(html)
      : html;

  return new Response(body, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

/**
 * Approximates what a mail client does to an email in dark mode.
 *
 * These templates declare no `color-scheme` and carry no
 * `prefers-color-scheme` rules, so clients that force dark mode (Outlook,
 * Apple Mail, the Gmail app) don't get to use a designer-authored dark
 * palette — they invert the colours themselves. That inversion is what this
 * reproduces: flip the whole document, then flip images back so photos and
 * logos still read correctly, which is how those clients treat them.
 *
 * It is a simulation, not a guarantee: every client inverts slightly
 * differently. Use it to catch the obvious breakages — unreadable text,
 * boxes that vanish, logos that turn to mud.
 */
function simulateDarkMode(html: string): string {
  // Gmail lands light email grounds on #262422 rather than pure black. The
  // whole document is filtered, so the ground has to start at this colour to
  // come out there: #dcdad8 is the pre-image of #262422 through
  // invert(1) hue-rotate(180deg). Changing one means recomputing the other.
  const GROUND_BEFORE_FILTER = '#dcdad8'; // -> #262422 once filtered

  const style = /* html */ `
    <style id="preview-dark-simulation">
      html {
        background-color: ${GROUND_BEFORE_FILTER};
        filter: invert(1) hue-rotate(180deg);
      }
      /* The email paints its own light ground in a few places; remap those
         too, or they filter to black and the page reads as two tones. */
      body,
      [bgcolor="#fbf9f6"] {
        background-color: ${GROUND_BEFORE_FILTER} !important;
      }
      /* Flip media back so it is not shown as a negative. */
      img, video {
        filter: invert(1) hue-rotate(180deg);
      }
    </style>`;

  if (html.includes('</head>')) {
    return html.replace('</head>', `${style}\n</head>`);
  }
  return style + html;
}

/** Keep a Liquid failure visible inside the frame instead of silently blank. */
function wrapError(slug: string, error: string, source: string) {
  const escaped = (value: string) =>
    value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return /*html*/ `<!DOCTYPE html>
    <html lang="en"><head><meta charset="utf-8" /><title>${slug} — Liquid error</title></head>
    <body style="margin:0;padding:24px;font:13px/1.6 ui-monospace,'Courier New',monospace;background:#fff4e5;color:#8a4b00;">
      <strong style="display:block;margin-bottom:8px;text-transform:uppercase;letter-spacing:.08em;font-size:11px;">Liquid did not render</strong>
      <p style="margin:0 0 16px;">${escaped(error)}</p>
      <pre style="margin:0;padding:12px;background:#fff;color:#111110;overflow:auto;font-size:11px;">${escaped(source.slice(0, 4000))}</pre>
    </body></html>`;
}
