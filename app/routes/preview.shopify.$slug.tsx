import type { LoaderFunctionArgs } from '@remix-run/node';
import { renderLiquid } from '~/preview/liquid.server';
import { getTemplate } from '~/preview/registry';

/**
 * Resource route serving a single template as a standalone document, so the
 * gallery and the preview stage can load it in an iframe.
 *
 *   /preview/shopify/order-confirmation            rendered with sample data
 *   /preview/shopify/order-confirmation?source=1   raw Liquid source as text
 */
export async function loader({ params, request }: LoaderFunctionArgs) {
  const template = getTemplate(params.slug);
  if (!template) {
    throw new Response(`Unknown template: ${params.slug}`, { status: 404 });
  }

  const source = template.render();

  if (new URL(request.url).searchParams.has('source')) {
    return new Response(source, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  const { html, error } = await renderLiquid(source, template.data);

  return new Response(error ? wrapError(template.slug, error, html) : html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
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
