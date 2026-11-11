# STICKERIZE email templates

Source of truth for the Shopify **customer notification** emails, with a local
browser that renders each one the way a customer would see it.

## Development

1. Install the [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html)
   extension for VS Code — it syntax-highlights the `/*html*/` tagged strings.
2. `yarn install`
3. `yarn dev`, then open http://localhost:3000

## How it fits together

```
app/templates/shopify/<slug>.ts   the templates — each exports a function
                                  returning Liquid + HTML as a string
app/components/                   shared chunks (Head, Header, OrderTable, …)
app/preview/registry.ts           the list of templates, their groups and copy
app/preview/sample-data.ts        fake order used to render the previews
app/preview/liquid.server.ts      LiquidJS + Shopify's custom filters
app/routes/                       the browser UI (3 routes, nothing else)
```

The templates are **not** Remix routes. They are plain modules that the preview
imports; `app/routes/preview.shopify.$slug.tsx` renders one through Liquid and
serves it as a standalone document for the iframes.

## Using the preview

- `/` — gallery of all templates, grouped by lifecycle stage, with search.
- `/shopify/<slug>` — one template, with a sidebar, desktop/mobile toggle, and
  the raw Liquid under **Source**. `←` / `→` step through the lifecycle.
- **Copy Liquid** / **Download** give you the *unrendered* source — that is what
  gets pasted into Shopify (Settings → Notifications → Customer notifications).
  The rendered HTML in the iframe is for looking at only.

## Adding a template

1. Create `app/templates/shopify/<slug>.ts` exporting a default function that
   returns the Liquid string.
2. Add an entry to `TEMPLATES` in `app/preview/registry.ts`, positioned where
   the customer would receive it. That drives the gallery, sidebar and
   prev/next ordering.

## Sample data

`app/preview/sample-data.ts` mirrors the variables Shopify exposes, with money
as integers in cents. Two things to keep in mind when extending it:

- An empty string is **truthy** in Liquid. Use `null` wherever Shopify would
  omit the field, or `{% if %}` takes the wrong branch.
- `liquid.server.ts` implements only the Shopify filters these templates use
  (`money*`, `img_url`, `shopify_asset_url`, `payment_*_url`, `format_address`,
  and the `date: format:` form). Add to it if a template needs another one.

If a template fails to parse, the preview shows the Liquid error in a banner
instead of rendering — so the preview doubles as a syntax check before you
paste anything into Shopify.

## Deploying to Vercel

Import the repo and use these settings:

| Setting | Value |
|---|---|
| Framework Preset | **Remix** |
| Root Directory | **`./`** (repo root, where `package.json` lives — *not* `app/`) |
| Build Command | leave default (`remix build`) |
| Output Directory | leave default |
| Install Command | leave default |
| Node version | 18.19+ (repo default is fine) |

Vercel deploys Remix v2 with zero configuration, so nothing beyond the preset
needs setting.

### Password protection

The deployed preview is private. `middleware.ts` at the repo root is Vercel
Routing Middleware: it runs before any request reaches the app, so it covers
the pages, the `/preview/shopify/*` documents the iframes load, and the built
JS/CSS. There is no route it can be forgotten on.

**Add one environment variable in the Vercel project** (Settings →
Environment Variables), for every environment you want protected:

```
PREVIEW_PASSWORD = <the shared password>
```

Then redeploy. Visitors get a password screen once and a signed, HttpOnly
cookie keeps them in for 30 days. The cookie stores a salted SHA-256 of the
password, never the password itself, so changing `PREVIEW_PASSWORD` instantly
invalidates every existing session.

If `PREVIEW_PASSWORD` is missing the site serves a 503 rather than falling
open, so a misconfigured deployment can never quietly become public.

The middleware does **not** run under `yarn dev`, so local development stays
unauthenticated.

To change the password: update the variable in Vercel and redeploy. To remove
the gate entirely: delete `middleware.ts`.

## Scripts

| | |
|---|---|
| `yarn dev` | dev server with live reload |
| `yarn build` | production build |
| `yarn start` | serve the production build |
| `yarn lint` | eslint |
| `yarn typecheck` | tsc |
