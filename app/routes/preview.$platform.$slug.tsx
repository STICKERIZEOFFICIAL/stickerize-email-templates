import type { LoaderFunctionArgs } from '@remix-run/node';
import { applyScheme } from '~/platforms/dark-mode';
import { toDocument } from '~/platforms/document';
import {
  documentOf,
  getPlatformTemplate,
  isPlatformId,
  sourceOf,
} from '~/platforms/registry';
import { substitute } from '~/platforms/tokens';

/**
 * Resource route serving one non-Shopify template as a standalone document, so
 * the gallery and the preview stage can load it in an iframe.
 *
 *   /preview/rise-ai/welcome              with sample values substituted
 *   /preview/rise-ai/welcome?theme=dark   + dark mode
 *   /preview/stamped/coupon?source=1      the raw template, tokens intact
 *
 * `/preview/shopify/:slug` is a separate, older route and keeps its own
 * behaviour — Remix matches its static segment ahead of this `$platform`, and
 * the guard below refuses it outright so the two can never be confused.
 */
export async function loader({ params, request }: LoaderFunctionArgs) {
  const { platform, slug } = params;

  if (!isPlatformId(platform)) {
    throw new Response(`Unknown platform: ${platform}`, { status: 404 });
  }

  const template = getPlatformTemplate(platform, slug);
  if (!template) {
    throw new Response(`Unknown ${platform} template: ${slug}`, { status: 404 });
  }

  const url = new URL(request.url);

  // What gets pasted into the platform: no substitution, no wrapping, no
  // shell. The tokens are the deliverable.
  if (url.searchParams.has('source')) {
    return new Response(sourceOf(template), {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  // Everything below is display-only.
  const composed = documentOf(platform, template);
  const filled = substitute(platform, composed, template.data);
  const shelled = toDocument(platform, filled, template.label);
  // Light is not a no-op: a template carrying prefers-color-scheme rules would
  // otherwise render its dark design on a dark-mode machine, whatever the
  // toggle says. See dark-mode.ts.
  const scheme = url.searchParams.get('theme') === 'dark' ? 'dark' : 'light';
  const body = applyScheme(platform, shelled, scheme);

  return new Response(body, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
