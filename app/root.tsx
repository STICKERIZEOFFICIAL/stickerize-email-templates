import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from '@remix-run/react';
import previewStyles from '~/preview/preview.css';
import { THEME_INIT_SCRIPT } from '~/preview/theme';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: previewStyles },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        {/* Paint the stored colour scheme before first paint, so reloading in
            dark mode doesn't flash a white page. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const title = isRouteErrorResponse(error) ? `${error.status} — not found` : 'Something broke';
  const detail = isRouteErrorResponse(error)
    ? error.data
    : error instanceof Error
      ? error.message
      : 'Unknown error';

  return (
    <Document>
      <div className="page">
        <div className="page__header">
          <h1>{title}</h1>
          <p>{String(detail)}</p>
        </div>
        <a className="btn" href="/">
          ← All templates
        </a>
      </div>
    </Document>
  );
}
