import { next } from '@vercel/functions';

/**
 * Password gate for the deployed preview.
 *
 * This is Vercel Routing Middleware: it runs on Vercel before any request
 * reaches the app, so it covers the pages, the `/preview/shopify/*` documents
 * the iframes load, and the built JS/CSS alike. There is no route it can be
 * forgotten on.
 *
 * It does NOT run under `yarn dev`, so local development stays unauthenticated.
 *
 * Set PREVIEW_PASSWORD in the Vercel project's environment variables. If it is
 * missing the site refuses to serve rather than falling open, so a
 * misconfigured deployment can never quietly become public.
 */

export const config = {
  // Everything except the favicon, which the login page itself requests.
  matcher: ['/((?!favicon\\.ico).*)'],
  runtime: 'nodejs',
};

const COOKIE = 'stickerize_preview';
const SALT = 'stickerize-email-templates:v1';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days
const SUBMIT_PATH = '/__auth';

async function tokenFor(password: string): Promise<string> {
  const bytes = new TextEncoder().encode(`${SALT}:${password}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Compare without leaking how many characters matched. */
function sameToken(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function readCookie(request: Request, name: string): string | null {
  const header = request.headers.get('cookie');
  if (!header) return null;
  for (const part of header.split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key === name) return decodeURIComponent(rest.join('='));
  }
  return null;
}

/** Only allow redirects back into this site, never to an attacker's URL. */
function safePath(value: unknown): string {
  if (typeof value !== 'string') return '/';
  if (!value.startsWith('/') || value.startsWith('//')) return '/';
  return value;
}

function page({ status, title, body }: { status: number; title: string; body: string }) {
  return new Response(
    /* html */ `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body {
    margin: 0; min-height: 100vh; display: grid; place-items: center;
    background: #fbf9f6; color: #111110; padding: 24px;
    font: 13px/1.5 'JetBrains Mono', ui-monospace, Menlo, Consolas, 'Courier New', monospace;
  }
  .box { width: 100%; max-width: 340px; }
  h1 { margin: 0 0 4px; font-size: 13px; letter-spacing: -0.02em; text-transform: uppercase; }
  p { margin: 0 0 20px; color: #6d6a64; font-size: 12px; }
  label { display: block; margin-bottom: 6px; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #6d6a64; }
  input {
    width: 100%; padding: 10px; border: 1px solid #c8c7c4; border-radius: 0;
    background: #fff; color: inherit; font-family: inherit;
    /* 16px: anything smaller and iOS zooms the page when the field is focused. */
    font-size: 16px; line-height: 1.3;
  }
  input:focus-visible { outline: 2px solid #111110; outline-offset: -1px; }
  button {
    width: 100%; margin-top: 10px; padding: 13px 10px; border: 1px solid #111110; border-radius: 0;
    background: #111110; color: #fbf9f6; font: inherit; cursor: pointer;
    text-transform: uppercase; letter-spacing: 0.06em; font-size: 11px;
  }
  button:hover { background: #000; }
  .error { margin: 0 0 14px; padding: 8px 10px; border: 1px solid #e8c9a0; background: #fff4e5; color: #8a4b00; font-size: 11px; }
</style>
</head><body><div class="box">${body}</div></body></html>`,
    { status, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } },
  );
}

function loginPage(redirectTo: string, failed: boolean) {
  return page({
    status: failed ? 401 : 401,
    title: 'STICKERIZE email templates',
    body: /* html */ `
      <h1>Stickerize templates</h1>
      <p>This preview is private. Enter the password to continue.</p>
      ${failed ? '<p class="error">That password is not right. Try again.</p>' : ''}
      <form method="POST" action="${SUBMIT_PATH}">
        <input type="hidden" name="next" value="${redirectTo.replace(/"/g, '&quot;')}" />
        <label for="password">Password</label>
        <input id="password" name="password" type="password" autocomplete="current-password" autofocus required />
        <button type="submit">Enter</button>
      </form>`,
  });
}

export default async function middleware(request: Request) {
  const password = process.env.PREVIEW_PASSWORD;

  if (!password) {
    return page({
      status: 503,
      title: 'Not configured',
      body: `<h1>Not configured</h1><p>Set <strong>PREVIEW_PASSWORD</strong> in this project's
             environment variables on Vercel, then redeploy.</p>`,
    });
  }

  const expected = await tokenFor(password);
  const url = new URL(request.url);

  // Handle the login form before anything else.
  if (url.pathname === SUBMIT_PATH) {
    if (request.method !== 'POST') {
      return Response.redirect(new URL('/', request.url), 303);
    }

    const form = await request.formData();
    const target = safePath(form.get('next'));

    if (typeof form.get('password') !== 'string' || form.get('password') !== password) {
      return loginPage(target, true);
    }

    const secure = url.protocol === 'https:' ? ' Secure;' : '';
    return new Response(null, {
      status: 303,
      headers: {
        Location: target,
        'Set-Cookie': `${COOKIE}=${expected}; Path=/; HttpOnly;${secure} SameSite=Lax; Max-Age=${MAX_AGE}`,
        'cache-control': 'no-store',
      },
    });
  }

  const cookie = readCookie(request, COOKIE);
  if (cookie && sameToken(cookie, expected)) {
    return next();
  }

  return loginPage(url.pathname + url.search, false);
}
