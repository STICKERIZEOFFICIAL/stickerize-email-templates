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
| Rise.ai | `{{wallet_code}}`, `{{#gift_card_expiration}}` | Rise.ai → Emails → the template's HTML |
| Stamped | `##couponCode##`, a few `{{label_*}}` | Stamped → Settings → Emails |
| Klaviyo | `{% unsubscribe_link %}` | Klaviyo → the campaign's HTML block |

`tokens.ts` swaps those for sample values **in the preview only**. Source and
Download emit the template string untouched, because the tokens are the
deliverable. Any token with no sample is outlined in the preview rather than
rendered blank, so a missing variable is visible instead of reading as missing
copy.

Nothing composes at paste time any more. Rise.ai used to: a Global theme held
the header, footer and dark-mode CSS with a `{{{body}}}` slot, and each
notification supplied only the body. Its new platform has no theme slot, so
every template in this compartment is now whole, and Download hands over the
whole thing.

## Dark mode differs by platform

Rise.ai **used to** ship real dark-mode CSS — `prefers-color-scheme` plus
`[data-ogsc]` for Outlook, driving `dm-invert` / `dm-line` / `dm-muted` /
`dm-btn` — in the Global theme its old platform gave it. The new platform has
no theme and no stylesheet slot, so those rules have nowhere to live. The
`dm-*` hooks are still on the markup and cost nothing; nothing drives them.

So all three platforms are now simulated — a client forcing inversion, same as
the Shopify views — and the frame says so. Give Rise.ai somewhere to paste a
stylesheet and its dark design comes back by flipping one entry in
`dark-mode.ts`; the hooks it needs never left.

Light is not a no-op either. A template carrying `prefers-color-scheme` rules
renders its dark design whenever the *viewer's* machine is in dark mode, which
would have meant the Light setting showing the dark email on a dark laptop. The
preview neutralises those rules and pins `color-scheme` so the toggle, not the
hardware, decides.

## What changed in the design-system pass

Ported verbatim first, then restyled. Eight of the eighteen ported files
diverge from what was supplied; the other ten are byte-identical.

### Rise.ai

Rise has since **migrated to a new email platform**, and this tab now holds its
eight emails rather than the old four. See
[The Rise.ai migration](#the-riseai-migration) below for what that changed.

The original pass against the old platform, kept because the same decisions
carried forward:

- **Global theme** — `h1`/`h2` were Arial Black 18/22 and 16/20, `p` was 15/18,
  `.button` 14px/22px padding, `.hr` carried its own 20px margin. All moved to
  the system's 13px Courier (bold uppercase 13/13 heading, 13/17 body, 23px
  button padding, no divider margin). *The Global theme no longer exists — the
  new platform has no field to paste it into.*
- **Welcome, Store credits received, Refund to credit** — the gap between a
  heading and its body was 12px throughout; it is now 24px, with 12px kept
  between sibling blocks and between an eyebrow and its heading. 7 gaps.
- **Header rule** — moved onto an inner cell so it is inset by 12px like every
  other divider. A cell's border spans its own padding, so with the border on
  the padded cell the line ran the full width of the column. Same fix in the
  Shopify `Header` and both Stamped templates.

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
    `ico_arrow.png`, 13px, 23px padding. The arrow has since moved to the
    front of the label; see [The CTA arrow moved to the left](#the-cta-arrow-moved-to-the-left).
  - divider 2px `#ececec` → 1px `#000001`.
  - footer email `hello@` → `help@stickerize.com`.
  - unsubscribe `#ccc` → `#999999` with an underline.
- **Review request** — the submit button was a fixed 732px, the full width of
  the column, while the copy around it sat on the 12px inset, so it read as
  wider than everything else; it is 708px now and aligns. Its padding and face
  also moved to the system's 23px and Courier New. The logo is now the Shopify
  one without the copyright mark, at 188×30, with the inset rule; the section heading gained the 24px
  gap above and below it that it was missing entirely; and four 16px insets
  became 12px. 61 mechanical type replacements: `letter-gothic-std`
  dropped from 42 font stacks (it is never loaded in this template, so all 42
  already rendered as the Courier New fallback), 9 Arial Black 18/22 headings →
  Courier 13/13 `#000001`, 10 body sizes 15/18 → 13/17. The submit button's
  arrow image became the text `→`. Two sentences were capitalised.
- **Review request (previous)** — removed from the preview. It was a test
  review request carrying an older logo. The untouched original is still in
  the repo at `app/components/stamped/review.html`, imported by nothing, if it
  is ever needed again.
- **Standard / Custom review form** — not touched; they are forms embedded in
  the review request, not emails.

### Klaviyo

The kit was exported with a local `images/` folder beside it, so every `src`
was relative — `images/logo.png`, `images/img_1.png` — and resolved nowhere
once the file moved. Nothing in it rendered. Photos now point at our own CDN
and the small UI icons at Klaviyo's, which is where a campaign would host them
anyway. The page background in a CSS `url()` was the last one.

- **Footer** — rebuilt on the Shopify footer rather than restyled. Klaviyo's
  was a different object: one stacked column of links separated by hairlines,
  a "FOLLOW US" social row and `hello@stickerize.com`. It is now the Shopify
  two-column 288 / 16 / 396 layout with the wordmark beneath. Three deliberate
  differences: no account block (its copy is about orders and invoices, wrong
  for a campaign), UNSUBSCRIBE and VIEW IN BROWSER under the contact address
  via Klaviyo's own tags, and no social row.
- **Masthead** — was the 724px footer wordmark used as a header. Now the
  system header: the 188×30 logo with the 1px rule inset by 12px.
- **Block rhythm** — every block carried `padding: 12px` all round, so each
  gap was the sum of two halves and every gap in the email came out at 24px
  regardless of what it separated. Same bug the Shopify side had. One side now
  owns each gap: `padding-top: 0`, and a `padding-bottom` that says what the
  block is separated from — 24px for an element of a section, 36px on the CTA
  that closes one. Four components were also on an 18px side inset; every
  inset is 12px now.
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

### The first Klaviyo email

`How creators turn work into stickers` is the first actual campaign in that tab
— the post-purchase flow email that goes out 42 days after fulfilment (template
`UJkp6d`). It was supplied as a brief plus the live export, in
`other emails/klaviyo/how-creators-turn-work-into-stickers-template.md`.

It is **composed from this tab's blocks**, not pasted from the export: the same
head, masthead, heading, paragraph, two-up image row, CTA and footer the kit
uses. So the four differences from the live email are the four decisions
already made for the tab, applied again:

| | Live export | Here |
|---|---|---|
| Masthead | the 724px `STICKERIZE` wordmark | the 188×30 logo over a 1px `#000001` rule, inset 12px |
| Button | JetBrains Mono 300, `ico_arrow_right.png` right | Courier New, text `→` leading the label |
| Block gaps | `padding: 12px` all round, so every gap landed on 24px | one side owns each gap — 24px inside a section, 36px on the block that closes one |
| Footer | five stacked rows on `#e1e0dd` hairlines, plus a social row | the 288 / 16 / 396 two-column footer with the wordmark beneath |

The wordmark masthead is the same thing the kit's own masthead was changed away
from, and it already closes the email in the footer, so running it twice was
the thing to drop. Two footer links go with it: **GO TO STICKERIZE**, whose
destination the logo and every image already link to, and the **FOLLOW US**
social row, which this tab's footer does not carry. Both are copy decisions
rather than fixes — say the word and either comes back.

Unlike the rest of the tab its inbox lines are **given, not proposed**: the
subject comes from the flow, and the preview text — "A few collaborations we've
loved" — is hardcoded in the hidden preheader because the flow's own preview
text field is empty. That is why this one template does not use
`{% render_variable preview_text %}`.

### The welcome email, moved from Rise.ai

`Welcome` is the second campaign in the tab, and it is not new copy — it is the
welcome email the **old Rise.ai platform** sent, rebuilt here.

Rise's migration retired it: no Welcome was exported, and the platform change
left its account-creation trigger obsolete (see
[The Rise.ai migration](#the-riseai-migration)). The *email* was never
obsolete. It is the only one anywhere that explains cash back, referrals,
Brand Hub and invoices, and a customer who has just ordered is still owed that
explanation. So it moves to Klaviyo, where it can be automated, and triggers
off the **order** instead of off account creation.

The copy is carried across from `other emails/rise.ai/welcome-email.html`
sentence for sentence — the three-step "apply your credits" list and the
euro-conversion small print included. It was approved on the old platform and
nothing about the migration made any of it untrue. Only the chrome and the
gaps are this tab's:

| | Rise.ai | Klaviyo |
|---|---|---|
| Block wrapper | `<section rise-section="text" rise-section-id="…">` | `data-klaviyo-region` blocks |
| Spacing | section margins, supplied by the platform | each block's own `padding-bottom` |
| Masthead and footer | the Global theme | this tab's own, same as the other email |
| Dividers | `rise-element="divider"` | a 1px `#000001` row, inset 12px |

Gaps follow the same rule as everything else: 12px from an eyebrow to its
heading, 24px from a heading to its body, 12px between sibling paragraphs,
36px on the block that closes a section. The 24px heading-to-body figure is
the one the Rise design-system pass set for this very email, replacing the
12px it shipped with.

**The trigger has to be set in Klaviyo, and it is the one thing the HTML
cannot carry.** Placed Order, not account creation — the opening line, "When
you placed your order, we created a Stickerize account for you", only reads
true on that trigger.

Two deliberate deviations from the approved template, each one line to put
back:

- The CTA points at `https://stickerize.com/account` rather than the bare
  `https://stickerize.com` that `docs/email-style-changes.md` specifies, since
  the label says GO TO MY ACCOUNT and that is where all four of the things the
  email describes live. The label itself is the approved one.
- The preview text is new copy — "Cash back on every order, and €5 every time
  a friend orders." The old platform had no preheader field for this email, so
  there was nothing to carry across. It is hardcoded in the hidden block, the
  way the other Klaviyo email hardcodes its own.

Both inbox lines are therefore **proposed, not given**, and badged that way in
the view. The subject borrows the Shopify Account Invite's wording so the two
do not read as different products — worth a second look, since on this trigger
the account already exists rather than waiting to be activated.

One thing to confirm before release: the **€5 referral reward and the 10%
friend discount** are quoted from the approved copy, and copy approved for the
old platform is the wrong place to learn that a reward has changed.

## The Rise.ai migration

Rise moved to a new email platform. The export of it is in
`other emails/new-rise.ai/`, alongside the subject and preview-text list in
`stickerize-rise-email-subjects.md`. Three things are different in kind:

| | Old platform | New |
|---|---|---|
| Composition | a Global theme with a `{{{body}}}` slot, edited once; each email supplied a body | no theme and no stylesheet slot — each email is one whole self-contained fragment |
| Styling | classes, driven by the theme's stylesheet | inline styles only; a class with nothing behind it does nothing |
| Sections | `{{{#name}}} … {{{/name}}}` | `{{#name}} … {{/name}}` |
| Emails | 4 | 8 |

**Global theme and Welcome are retired.** There is no theme field any more, and
no Welcome email was exported. The old HTML is still in `other emails/rise.ai/`
if either is ever wanted back.

Welcome has since been wanted back, and it came back **in the Klaviyo tab**
rather than in this one — see
[The welcome email, moved from Rise.ai](#the-welcome-email-moved-from-riseai).
Rise is where the email no longer has a trigger; Klaviyo is where it can be
automated off the order.

**Dark mode is the real loss.** The theme was the only place the `prefers-color-scheme`
rules could live, and the new platform has nowhere to put them — so Rise.ai
joins Stamped and Klaviyo on client inversion. The `dm-*` hooks are still on
every element, so the design returns the day Rise exposes a stylesheet.

### Composed here, not there

The platform not composing does not mean we cannot. Copying a header and a
two-column footer into eight files by hand is how eight files drift, so the
chrome and the blocks live once in `app/platforms/rise-ai/shell.ts` and each
template supplies only its sections. `render()` still returns the whole
fragment, byte for byte what gets pasted into Rise.

`shell.ts` also merges inline styles so each property is declared once. Stacking
a base and an override as text gives `padding: 0; padding: 0 12px` — right by
the cascade, but it leaves two answers in the attribute for a client's sanitiser
to choose between.

### What changed in each

- **Refund** — arrived already on the design system; it is our own template,
  re-exported. The new editor had flattened two things, and both are put back:
  the heading sits 24px from its body again rather than 12px, and the header
  rule is back on an inner cell instead of running the full width of the column.
- **Store credits** — `store-credits.html` **is a 0-byte file**. The approved
  copy is carried across from the old platform on the new variable names.
  **Diff it against Rise before release.**
- **Cashback, Compensation, Referral, Wallet, Gift card, Print-at-home** — Rise
  defaults in Helvetica with a 20px grey lead and the amounts in a
  label-and-value grid. Every sentence is kept; the figures now read in the copy
  the way they do on the refund email, because the system has one boxed code and
  one expiry line rather than a table.
- All six dropped Rise's `Hi {{ recipient_full_name }}` opener, because neither
  approved template has one and the heading is the first thing the design shows.
- Referral dropped Rise's social row and second website link, which this tab's
  footer has not carried since the design-system pass.

### Found on the way, and worth a test send

- **The refund heading said `€€5.00`.** It hardcoded a euro sign in front of
  `{{issued_credit_amount}}`, and Rise formats that amount with its own currency
  symbol — every other template in the export uses the variable bare. The sign
  is removed. **The old platform's template had the same bug**, so this has been
  going out for a while.
- **Wallet reads `{{gift_card_balance}}` and `{{gift_card_code}}`**, not the
  `{{wallet_*}}` names the other credit emails use. That is how the export has
  it, so it is left alone — but two naming schemes in one platform is how a line
  turns up empty in a live send.
- **The Store credits subject is `{{sender_first_name}}, your cash back is in
  your account`**, as supplied. On an email about the recipient's own cash back
  that looks like it wants `{{recipient_full_name}}`.
- **Artwork is per email, and four have none yet.** Each email has its own pair
  from the design set — `Email_4_Section_3_*` on Store credits,
  `Photo_*_stickers_product_shot_*` on Refund — so `photos(left, right)` takes
  both and has no default: a default is how Store credits ended up briefly
  wearing the refund's artwork. **Cashback, Compensation, Referral and Wallet
  have no pair named for them**, in Rise's export or in the set, so they open on
  the heading rather than borrowing someone else's. Name a pair and it is one
  line each. Gift card uses Rise's own `{{greeting_image_url}}`; print-at-home
  has no image, as in the export.
- **Buttons link to `https://stickerize.com`**, following the approved refund
  template. Rise's own defaults used `{{shop_url}}`, which would follow the
  shop's locale — one line in `shell.ts` switches all eight.

## The CTA arrow moved to the left

Every CTA on every platform — Shopify, Rise.ai, Stamped, Klaviyo — used to end
with a text `→` pinned to the far right of the black bar. **The arrow now
leads the label, 12px in front of it.**

Nothing else about the button changed. Same full width, same height, same 12px
outer inset, same two cells, same glyph: the cells swapped places and swapped
which edge each one owns.

| | Before | After |
|---|---|---|
| Left cell | label, `padding: 23px 0 23px 12px` | arrow, `padding: 21px 0 25px 12px` |
| Right cell | arrow, `width="44"`, right-aligned | label, `width="100%"`, `padding: 23px 12px` |

### Centring the glyph

The first version of this looked bottom-aligned, and it was: the arrow's ink
sat **2.5px below** the label's. Two causes, stacked.

1. **The baselines did not match.** A block's baseline sits
   `(lineHeight - (ascent + descent)) / 2 + ascent` below its content top. In
   Courier New that works out at `L/2 + 3.5` for the 13px label and
   `L/2 + 5.5` for the 20px arrow — a constant **2px apart**, whatever the
   line-height is. The arrow cell used the label's padding, so the arrow hung
   2px low.
2. **The glyph is not centred on its own baseline.** `→` is painted from
   5.75px above the baseline to 0.875px above it; a capital letter runs from
   cap-height down *to* the baseline. So even on a shared baseline the two ink
   centres differ by 0.44px.

The fix for (1) is arithmetic on the cell padding: **the arrow cell takes 2px
less above and 2px more below than the label's.** The baselines then coincide
and the cell's total height is unchanged — which matters, because both cells
are `valign="middle"` and any difference in height would put the offset
straight back through centring.

```html
<td style="padding: 21px 0 25px 12px;">   <!-- arrow: 23 − 2 / 23 + 2 -->
<td style="padding: 23px 12px 23px 12px;" width="100%">   <!-- label -->
```

**A span does not work, and was tried first:** putting the 20px size on an
inner `<span>` inside a 13px anchor looks like it should keep the anchor's
baseline, but a taller inline box raises the line box and the block's baseline
goes down with it. Measured in the page afterwards, the arrow's baseline was
still exactly 2px below the label's — the span had changed nothing except the
bar's height. Measure the baseline, not the box: a zero-height
`display:inline-block` probe appended to an element has its top edge **on**
that element's baseline, which is what finally showed this.

Verified across all four platforms after the padding fix: **baseline delta 0
on every CTA**, leaving the 0.44px from cause (2), which is the glyph's own
shape and not something layout can correct.

Rise.ai is the one that changed size as well as position. Its arrow had been
**13px**, the only platform where the glyph matched the label rather than
standing a size above it. It is 20px now, like everywhere else. That is a
visible change rather than a fix, so say the word if Rise should keep the
smaller arrow.

Two details worth keeping:

- **The 12px gap is the label cell's `padding-left`, never a width on the
  arrow cell.** The arrow cell carries no width at all now and shrinks to its
  glyph, which is why the label cell takes `width="100%"` — it claims the rest
  of the bar. A fixed-width arrow cell would have made the gap depend on how
  wide `→` renders in whatever font the client actually has, and the fallback
  is not monospace everywhere.
- **The Klaviyo standalone CTA block needed its anchors' padding made
  inline.** The kit's head carries `.btn-24-12 a { padding: 24px 12px; }`,
  which was giving *both* anchors 12px on *both* sides. Once the cells
  swapped, the arrow's right padding and the label's left padding stacked with
  the cell's own and the gap came out at 36px. Every other button already had
  inline padding and was unaffected.

Where each one lives:

| Platform | File |
|---|---|
| Shopify (15 notifications) | `app/components/Button.tsx` |
| Rise.ai (8 emails) | `app/platforms/rise-ai/shell.ts`, `button()` |
| Klaviyo | `components/cta.ts`, `kit.ts`, and both emails |
| Stamped | `coupon.ts`, and the review form's `<button>` in `review-request.ts` |

Stamped's review form is the one that is not a table: it is a real `<button>`
whose arrow was a `float: right` span. The float is gone and the span leads the
label with a 12px `padding-right`.

**Two trailing arrows are deliberately left alone**, because they are inline
text links rather than CTAs: "GO TO ACCOUNT →" in the Shopify footer
(`app/components/shopify/Footer.tsx`) and "Go to your account →" in
`GoToAccount.tsx`. In both, the arrow follows the words as punctuation inside a
sentence, not as a control at the edge of a bar. Say the word if those should
move too.

## Still open

Nothing below is blocking, but each is a decision someone else owns.

### Inbox lines were never supplied

Shopify's subjects came from Martin's approved copy. Nothing equivalent exists
for these platforms, so every subject and preview text in the registry is
**proposed** and badged as such in the UI. Five need sign-off:

| Email | Proposed subject |
|---|---|
| Stamped — Review request | How did your stickers turn out? |
| Stamped — Coupon | Here is the code we promised |
| Klaviyo — Welcome | Your Stickerize account is ready |

Rise.ai is no longer on that list. Its eight subjects and preview texts were
supplied with the migration, in
`other emails/new-rise.ai/stickerize-rise-email-subjects.md`, and are marked
**given** in the registry.

Stamped's coupon is the only template here that already ships a preheader.
**Rise.ai has no preheader block**, and the new platform has no theme to add
one to, so its preview texts are set in Rise's own admin — the list supplied
with the migration is what goes in those fields. Klaviyo sets both lines in its
own campaign editor — except on its two actual emails, which each hardcode a
preheader in the hidden block, so the preview text travels with the HTML.

The Klaviyo welcome's preview text, "Cash back on every order, and €5 every
time a friend orders.", is proposed for the same reason its subject is: the
old platform had no preheader field for that email, so there was nothing to
carry across with the copy.

### Two briefs disagree about Rise.ai

`docs/email-style-changes.md` is the approved Rise.ai brief and conflicts with
both the files on disk and the Shopify brief:

- It specifies an **SVG logo** `Main_logo_…svg` at 188×24; every template
  ships `Frame_Logo_-_Stickerize_Emails.png` at 168×26. The brief's own open
  question — a PNG export for Gmail and Outlook, which do not render SVG — does
  not appear to have been answered. **The PNG was kept**, and it survived the
  migration unchanged.
- It states `section { margin: 24px 0 }` is Rise.ai's only vertical rhythm. The
  Shopify brief asks for **36px between distinct sections**. These cannot both
  hold. The 24px rhythm was kept, because changing it contradicts a written
  approved brief and would double the separation either side of every divider.
  **This one needs a decision.**
- It names a "Reward (cashback)" email. The new platform has both a **Cashback**
  and a **Store credits** email, which may be the same thing twice. Confirm.
- `{{unsubscribe_url}}` is still unconfirmed as a real Rise variable. Send a
  test before release. (`{{balance}}` is gone — the new platform calls it
  `{{total_wallet_balance}}`.)

### Footer columns differ three ways

Shopify 288 / 16 / 396, Rise.ai 266 / 40 / 394, Klaviyo 288 / 16 / 396. The
Rise.ai brief specifies 266 / 40 / 394 explicitly, so it was left alone rather
than unified by fiat. Unifying them is a decision, not a fix.

Rise.ai and Klaviyo footers carry an **unsubscribe** link; Shopify's does not.

### Smaller questions

- `usps.html` reads as selling points, but the name collides with the Shopify
  USPS return-label template. Confirm which is meant.
- **Canonical font.** Shopify's `Head.tsx` loads JetBrains Mono by `@font-face`
  but every component hardcodes Courier New. Klaviyo loaded JetBrains Mono from
  Google Fonts and mixed both within one kit. Stamped takes the family from its
  own admin via `##fontFamilyUrl##`. Courier New was used as the system face
  throughout this pass; if that is wrong, it is a one-line change per platform.
- **Only one Klaviyo campaign has been supplied** — the collaborator email
  above. The rest of that tab is still a component library.
- Every sample value in `tokens.ts` is invented. The URLs point at real
  Stickerize paths; the codes, names and amounts are plausible but made up.

### The Shopify brief has since been applied to Shopify

`docs/shopify-email-scope.md` has now been applied to the Shopify templates as
well — see [docs/shopify-spacing-and-capitalisation.md](shopify-spacing-and-capitalisation.md).
The two compartments therefore follow the same spacing and capitalisation
rules, which is what the "build to the brief" decision was for.

The one rule still deliberately different is the Rise.ai section rhythm above:
24px there, 36px on Shopify, because the Rise.ai brief states 24px explicitly.
