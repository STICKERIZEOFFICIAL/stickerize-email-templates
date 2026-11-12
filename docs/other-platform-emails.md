# Other-platform emails (Rise.ai, Stamped, Klaviyo)

The Shopify notifications are not the only emails Stickerize sends. Three other
platforms send their own, each with its own HTML, its own variable syntax and
its own place to paste it. This is how they are held in the preview app, what
was changed to bring them onto the design system, and what is still open.

## Separation from Shopify

These are a **separate compartment**. Nothing is shared with the Shopify side —
not the registry, not the components, not the render path — so the two can
diverge without either breaking.

```
app/platforms/registry.ts        the four tabs, and the templates behind three of them
app/platforms/tokens.ts          per-platform variable substitution (preview only)
app/platforms/document.ts        shells a fragment into a previewable document
app/platforms/dark-mode.ts       light and dark rendering per platform
app/platforms/<platform>/*.ts    the templates, each returning its HTML as a string
app/routes/platforms.*           the gallery and the single-template view
app/routes/preview.$platform.$slug.tsx   the document the iframes load
```

The Shopify compartment imports exactly one thing from here: `PlatformTabs`,
the switcher, which is four links and touches no template, component or render
path on either side. `app/preview/preview.css` is not edited — the extra rules
these views need live in `app/platforms/platforms.css`, scoped under
`.platform-shell`, a class that exists on no Shopify page.

## No Liquid

Shopify templates go through LiquidJS. **These do not.** They are pure HTML
carrying each platform's own syntax, which LiquidJS would either throw on or
silently blank:

| Platform | Syntax | Pasted into |
|---|---|---|
| Rise.ai | `{{shop_url}}`, `{{{#expiration_date}}}` | Rise.ai → Email settings → Global theme, then each notification body |
| Stamped | `##couponCode##`, a few `{{label_*}}` | Stamped → Settings → Emails |
| Klaviyo | `{% unsubscribe_link %}` | Klaviyo → the campaign's HTML block |

`tokens.ts` swaps those for sample values **in the preview only**. Source and
Download emit the template string untouched, because the tokens are the
deliverable. Any token with no sample is outlined in the preview rather than
rendered blank, so a missing variable is visible instead of reading as missing
copy.

Rise.ai is the one that composes: the Global theme holds the header, footer and
dark-mode CSS with a `{{{body}}}` slot, and each notification supplies only the
body. The preview wraps them together; **Download hands over the body alone**,
because the body is the field being edited.

## Dark mode differs by platform

Rise.ai ships real dark-mode CSS — `prefers-color-scheme` plus `[data-ogsc]`
for Outlook, driving `dm-invert` / `dm-line` / `dm-muted` / `dm-btn`. Stamped
and Klaviyo declare none.

So the toggle does different things, and says which under the frame:

- **Rise.ai** — the authored design, applied unconditionally (an iframe cannot
  be told the OS prefers dark).
- **Stamped, Klaviyo** — a simulation of a client forcing inversion, same as
  the Shopify views.

Light is not a no-op either. A template carrying `prefers-color-scheme` rules
renders its dark design whenever the *viewer's* machine is in dark mode, which
would have meant the Light setting showing the dark email on a dark laptop. The
preview neutralises those rules and pins `color-scheme` so the toggle, not the
hardware, decides.

## What changed in the design-system pass

Ported verbatim first, then restyled. Eight of the eighteen ported files
diverge from what was supplied; the other ten are byte-identical.

### Rise.ai

- **Global theme** — `h1`/`h2` were Arial Black 18/22 and 16/20, `p` was 15/18,
  `.button` 14px/22px padding, `.hr` carried its own 20px margin. All moved to
  the system's 13px Courier (bold uppercase 13/13 heading, 13/17 body, 23px
  button padding, no divider margin). These rules are dormant today because
  every body styles inline — but Rise's WYSIWYG emits bare `<p>` and `<h1>`, so
  the old values would reappear the moment anyone edits a body in the admin.
- **Welcome, Store credits received, Refund to credit** — the gap between a
  heading and its body was 12px throughout; it is now 24px, with 12px kept
  between sibling blocks and between an eyebrow and its heading. 7 gaps.

### Stamped

- **Coupon** — the most drift of anything here:
  - stylesheet `h1` Arial Black 18/22 → Courier 13/13; `p` 15/18 → 13/17. The
    old `p` rule was beating the inline 13px on the paragraph cell, so body
    copy was rendering at 15px.
  - the old `logo_e1564c50…png` at 200px wide → the current logo at 188×30.
  - the header's black rule was a separate div with an arbitrary 37px margin
    under it; it is now the header cell's own `border-bottom`.
  - heading and paragraph insets 16px → 12px, matching everything else.
  - hero image moved **below** the intro: logo → heading → intro → image.
  - coupon box lost its `font-size: 30px` wrapper and `margin: 0 -12px`
    negative inset; it now sits on the 12px inset at 13/17.
  - CTA rebuilt as the two-cell table with a text `→` instead of
    `ico_arrow.png`, 13px, 23px padding.
  - divider 2px `#ececec` → 1px `#000001`.
  - footer email `hello@` → `help@stickerize.com`.
  - unsubscribe `#ccc` → `#999999` with an underline.
- **Review request** — 61 mechanical type replacements: `letter-gothic-std`
  dropped from 42 font stacks (it is never loaded in this template, so all 42
  already rendered as the Courier New fallback), 9 Arial Black 18/22 headings →
  Courier 13/13 `#000001`, 10 body sizes 15/18 → 13/17. The submit button's
  arrow image became the text `→`. Two sentences were capitalised.
- **Review request (previous)** — deliberately **not** touched. It is kept as
  the exact earlier export, for comparison only. Do not paste it into Stamped.
- **Standard / Custom review form** — not touched; they are forms embedded in
  the review request, not emails.

### Klaviyo

- **CTA**, in both the standalone block and the kit — the arrow image on
  Klaviyo's CDN became the text `→`, the label font moved from JetBrains Mono
  to Courier New (matching every other block in the same kit), padding to
  23px/21px, and the label cell's `color: #000001` — wrong on a black ground,
  and only invisible because a class overrode it — is now explicitly `#fffffe`.
- **Footer**, in both — five `1px #e1e0dd` hairlines → `1px #000001`.
- **Heading** — authored from scratch. The supplied `heading.html` was a
  0-byte file, so the kit had no heading block at all.
- **Kit head** — the `<!--[if gte mso 9]>` block forced
  `font-family: Arial, sans-serif !important` on everything in Outlook,
  dropping that client out of the monospace system face. Outlook has Courier
  New, and the Shopify templates' `Head.tsx` keeps the identical rule commented
  out for exactly that reason, so it is now disabled here too. The `sup` rule
  in the same block is untouched.

## Still open

Nothing below is blocking, but each is a decision someone else owns.

### Inbox lines were never supplied

Shopify's subjects came from Martin's approved copy. Nothing equivalent exists
for these platforms, so every subject and preview text in the registry is
**proposed** and badged as such in the UI. Five need sign-off:

| Email | Proposed subject |
|---|---|
| Rise.ai — Welcome | Your Stickerize account is ready |
| Rise.ai — Store credits received | You have `{{store_credit_added}}` in store credit |
| Rise.ai — Refund to credit | Your refund is now store credit |
| Stamped — Review request | How did your stickers turn out? |
| Stamped — Coupon | Here is the code we promised |

Stamped's coupon is the only template here that already ships a preheader.
**Rise.ai has no preheader block at all**, so all three of its emails currently
let the client scrape the top of the email; adding one means a change to the
Global theme. Klaviyo sets both lines in its own campaign editor.

### Two briefs disagree about Rise.ai

`docs/email-style-changes.md` is the approved Rise.ai brief and conflicts with
both the files on disk and the Shopify brief:

- It specifies an **SVG logo** `Main_logo_…svg` at 188×24; `global-theme.html`
  ships `Frame_Logo_-_Stickerize_Emails.png` at 168×26. The brief's own open
  question — a PNG export for Gmail and Outlook, which do not render SVG — does
  not appear to have been answered. **The PNG on disk was kept.**
- It states `section { margin: 24px 0 }` is Rise.ai's only vertical rhythm. The
  Shopify brief asks for **36px between distinct sections**. These cannot both
  hold. The 24px rhythm was kept, because changing it contradicts a written
  approved brief and would double the separation either side of every divider.
  **This one needs a decision.**
- It names a "Reward (cashback)" email. On disk that appears to be
  `store-credits-recieved.html` (note the filename typo). Confirm the naming.
- `{{balance}}` and `{{unsubscribe_url}}` are still unconfirmed as real Rise
  variables. Send a test before release.

### Footer columns differ three ways

Shopify 288 / 16 / 396, Rise.ai 266 / 40 / 394, Klaviyo a stacked single
column. The Rise.ai brief specifies 266 / 40 / 394 explicitly, so it was left
alone rather than unified by fiat. Unifying them is a decision, not a fix.

Rise.ai and Klaviyo footers carry an **unsubscribe** link; Shopify's does not.
Klaviyo's carries **social icons**; nothing else does.

### Smaller questions

- `usps.html` reads as selling points, but the name collides with the Shopify
  USPS return-label template. Confirm which is meant.
- **Canonical font.** Shopify's `Head.tsx` loads JetBrains Mono by `@font-face`
  but every component hardcodes Courier New. Klaviyo loaded JetBrains Mono from
  Google Fonts and mixed both within one kit. Stamped takes the family from its
  own admin via `##fontFamilyUrl##`. Courier New was used as the system face
  throughout this pass; if that is wrong, it is a one-line change per platform.
- **No Klaviyo campaigns were supplied** — that tab is a component library, not
  a set of emails.
- Every sample value in `tokens.ts` is invented. The URLs point at real
  Stickerize paths; the codes, names and amounts are plausible but made up.

### The Shopify brief has since been applied to Shopify

`docs/shopify-email-scope.md` has now been applied to the Shopify templates as
well — see [docs/shopify-spacing-and-capitalisation.md](shopify-spacing-and-capitalisation.md).
The two compartments therefore follow the same spacing and capitalisation
rules, which is what the "build to the brief" decision was for.

The one rule still deliberately different is the Rise.ai section rhythm above:
24px there, 36px on Shopify, because the Rise.ai brief states 24px explicitly.
