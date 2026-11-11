import type { LoaderFunctionArgs } from '@remix-run/node';
import { renderLiquid } from '~/preview/liquid.server';
import { toLocale } from '~/preview/locales';
import { getTemplate } from '~/preview/registry';

/**
 * Resource route serving a single template as a standalone document, so the
 * gallery and the preview stage can load it in an iframe.
 *
 *   /preview/shopify/order-confirmation             rendered with sample data
 *   /preview/shopify/order-confirmation?theme=dark  + dark mode simulation
 *   /preview/shopify/order-confirmation?locale=en   language variant
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
  const { html, error } = await renderLiquid(source, { ...template.data, locale });
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
  const style = /* html */ `
    <style id="preview-dark-simulation">
      html {
        background-color: #ffffff;
        filter: invert(1) hue-rotate(180deg);
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
