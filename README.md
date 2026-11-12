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
app/routes/                       the browser UI
```

The templates are **not** Remix routes. They are plain modules that the preview
imports; `app/routes/preview.shopify.$slug.tsx` renders one through Liquid and
serves it as a standalone document for the iframes.

Spacing and capitalisation follow
[docs/shopify-email-scope.md](docs/shopify-email-scope.md). Gaps are 12px within
a text container, 24px from a heading to its body, 36px between sections — and
**one side owns each gap**, a block's bottom padding, so adjacent paddings can
never sum into a number nobody intended.
[docs/shopify-spacing-and-capitalisation.md](docs/shopify-spacing-and-capitalisation.md)
records that pass.

### The other platforms

Stickerize also sends email from Rise.ai, Stamped and Klaviyo. Those live in a
**separate compartment** under `app/platforms/`, sharing nothing with the
Shopify side — no registry, no components, no render path — because they are
pure HTML with each platform's own variable syntax rather than Liquid.

A tab bar on every gallery switches between the four. See
[docs/other-platform-emails.md](docs/other-platform-emails.md) for what is in
each tab, what was changed to bring them onto the design system, and what is
still waiting on a decision.

## Using the preview

- `/` — gallery of all Shopify templates, grouped by lifecycle stage, with
  search. The tab bar switches to the other platforms.
- `/shopify/<slug>` — one template, with a sidebar, desktop/mobile toggle, and
  the raw Liquid under **Source**. `←` / `→` step through the lifecycle.
- `/platforms/<platform>` and `/platforms/<platform>/<slug>` — the same two
  views for Rise.ai, Stamped and Klaviyo.
- **Copy Liquid** / **Download** give you the *unrendered* source — that is what
  gets pasted into Shopify (Settings → Notifications → Customer notifications).
  The rendered HTML in the iframe is for looking at only.
- Controls that change how the **email** renders — Desktop/Mobile, Light/Dark,
  language — sit on the email frame itself. None of them touch the app around
  it. See [Dark mode](#dark-mode).

### Subject and preview text

Two lines reach a recipient before they open anything, and they are authored in
different places:

| | Where it lives | In the preview |
|---|---|---|
| **Subject** | Shopify admin | copyable — it cannot travel with the pasted HTML |
| **Preview text** | the template's `previewText` | shown only; it ships inside the Liquid |

Each template page shows both, first as they read in an inbox, then as editable
values labelled with where each is set.

Subjects live in `subject` on each entry in `app/preview/registry.ts` — the one
piece of copy the templates themselves do not contain. Use `{{ name }}` for the
order number: it renders with the shop's prefix (`#1024`), where
`{{ order_number }}` renders bare (`1024`).

Preview text is read back out of the rendered email rather than duplicated
here, so the two can never drift. Two templates ship with none at all
(`return-request-declined`, `usps-return-label-created`); the preview marks
them **Not set**, which means the client will scrape the top of the email
instead.

### Languages

`app/preview/locales.ts` holds the variants. Only English exists today — the
switcher on the email frame shows `EN` alone. The selected locale travels
through the preview URL into the Liquid render as a `locale` variable, so
adding a language is a data change: add an entry to `LOCALES`, then
`translations: { xx: { subject, previewText } }` on the templates that have
been translated. Anything untranslated falls back to English.

### Dark mode

Dark applies to the **email only** — the app around it stays as it is.

These templates declare no `color-scheme` and carry no `prefers-color-scheme`
rules, so mail clients that force dark mode (Outlook, Apple Mail, the Gmail
app) do not get a designer-authored dark palette — they invert the colours
themselves. The **Dark** view reproduces that: the whole document is inverted,
then images are flipped back, which is how those clients treat them.

It is a simulation. Every client inverts slightly differently, so use it to
catch obvious breakage — unreadable text, boxes that vanish, logos that
disappear into the background — rather than as an exact preview.

If you ever want real dark-mode control instead of client inversion, that
means adding `<meta name="color-scheme" content="light dark">` and
`@media (prefers-color-scheme: dark)` rules to `app/components/Head.tsx`.

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
