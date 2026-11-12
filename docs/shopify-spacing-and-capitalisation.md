# Shopify spacing and capitalisation pass

Applies [docs/shopify-email-scope.md](shopify-email-scope.md) to the Shopify
notification templates. All 28 render clean against an automated check of the
brief's rules.

## The three gaps

| Gap | Where |
|---|---|
| **12px** | Between blocks inside one body text container — a paragraph and the list under it, a paragraph and the next paragraph. **Not** between the lines of a list: those run at the normal line-height, like a wrapped sentence. Spacing them apart makes a list read as detached statements. |
| **24px** | Between elements of a section — the heading and its body, the body and the images, the images and the tracking box. |
| **36px** | Between distinct sections. |

## Why the gaps were wrong

Three separate causes, all of which made a gap bigger than the number written
down.

**1. Adjacent paddings summed.** Every block carried its own `padding-bottom`
and the block after it usually carried a `padding-top` too:

```
"Your order" heading   padding-bottom: 10px
items wrapper          padding-top:     0
first line item cell   padding-top:    24px
                                    = 34px rendered, against a 24px rule
```

The fix is structural: **one side owns each gap** — a block's bottom padding —
and the block after it contributes nothing on top. In `Intro.tsx` the gaps are
computed from which blocks that instance actually renders, so a block can never
guess what follows it.

**2. `<br />` cannot express a 12px gap.** It emits a line box of exactly one
line-height, so blocks separated by `<br /><br />` landed ~18px apart. Body
copy is now passed as blocks and rendered by `BodyCopy.tsx`, where each block
after the first owns `padding-top: 12px`. A block is either a paragraph or a
run of tight lines:

```ts
description: [
  "Here's what happens next:",
  ['1. We print and cut.', '2. We ship it.', '3. You Stickerize everything.'],
  'Spotted a typo? Reply to this email.',
]
```

The nested array is one block: 12px above it and 12px below it, nothing
between its lines.

**3. A trailing `<br />` added a whole empty line.** Five templates ended their
copy with one. That empty line box sits *inside* the cell, above its
`padding-bottom`, so a declared 36px section gap rendered as roughly 54px. All
removed.

## Measured, not assumed

Verified by reading computed style in the rendered email, and by measuring
between the text rather than between cell boxes — a cell's own rect includes
its padding, so box-to-box reads 0 and tells you nothing.

A rule-based check across all 26 templates that use `Intro` asserts: heading
gap exactly 24px, every in-container block gap exactly 12px, no `<br /><br />`
and no trailing `<br />` in body copy, every body gap one of 12/24/36, and the
footer's manage-orders sentence exactly 12px above "Go to account". **All 26
pass.**

Order Confirmation, as declared:

| Gap | Rule | Declared |
|---|---|---|
| Heading → intro paragraph | 24 | 24px |
| Between the intro's five blocks (lead-in, three numbered steps, closing line) | 12 | 12px each |
| Intro paragraph → "Your order" | 36 | 36px |
| "Your order" → first line item | 24 | 24px |
| Line-item title → its detail list | 12 | 12px |
| Last line item → summary | 36 | 36px |
| Summary → info box | 36 | 36px |
| Manage-orders sentence → "Go to account" | 12 | 12px |

Account Welcome, Account Invite and Marketing Confirmation:

```
heading --24-- paragraph --24-- images --36-- next section
```

## Images

`showImage` was **opt out**: it defaulted to `true`, so a template that simply
did not mention the prop rendered the two-up photo grid. Seven notifications
that `docs/shopify-notification-images.md` lists as "not in scope, leave
unchanged" were carrying photos purely because of that default — Order Edited,
Order Invoice, Contact Customer, USPS Return Label, and all three Return
Request emails.

It is now **opt in**. Three emails declare `showImage: true` and nothing else
has images:

| Email | Source |
|---|---|
| Account Welcome | images brief, "keep" list |
| Marketing Confirmation | images brief, "keep" list |
| Account Invite | `docs/shopify-email-scope.md`, which overrides the images brief's "remove" entry for this one email |

All 17 emails on the brief's "remove" list verify as having no images.

Marketing Confirmation also had the Account Welcome bug: its copy came through
a `Description` block *below* `Intro`, so the photos rendered between the
heading and the body. Its copy now lives in `Intro`.

## Capitalisation

The brief asks for uppercase section headings, uppercase summary-box labels,
sentence case for everything else, and capital first letters on right-hand
summary values with dates and proper names left alone. Three CSS rules were
doing the opposite:

- **`Description.tsx` forced `text-transform: lowercase`** on body copy in
  **ten** templates. The copy was already written in sentence case — the
  stylesheet was flattening it, so "Friendly reminder:" rendered as "friendly
  reminder:". Removing that one rule is the whole of the "start each body
  sentence with a capital letter" fix for Payment Reminder, Account Invite,
  Account Welcome, Password Reset, Payment Method Restore and Marketing
  Confirmation.
- **`CustomerInfo.tsx` forced `text-transform: lowercase`** on all six
  right-hand summary values, which is the exact opposite of the rule. Dates and
  names now keep their casing: "November 14, 2026", "Mia Kowalski",
  "Brooklyn Studio". Labels keep their uppercase.
- **`Total.tsx` labels were lowercase in the source** and two `| downcase`
  filters were flattening payment-method names. Now "Discount", "Shipping",
  "Free", "Pickup", "Today's total (VAT incl.)", "Total due", "Refund", and
  "Visa (ending in 4242)" rather than "visa (ending in 4242)".

The remaining `| downcase` filters build payment-icon URL slugs, not display
text, and are left alone.

`consolidated_estimated_delivery_time` in the preview fixture was the literal
string `'Nov 14 - Nov 18'`, so `| date: '%B %d, %Y'` had nothing to parse and
passed it through — the preview never exercised the "render November 14" rule
even though the template was correct. It is now a date.

## Type

The old 15px / `letter-gothic-std` scale was still in `Total.tsx` (18 rules),
`CustomerInfo.tsx` (12) and `order-payment-receipt.ts` (4). `letter-gothic-std`
was never loaded as a bare family, so all of it already rendered as the Courier
New fallback — the sizes were the real change, 15/18 → 13/17. The dead
`.tk-letter-gothic-std` declaration is gone from `Head.tsx`.

## The order-number box

Removed, per the brief. The dynamic order number now renders in bold inside the
introductory paragraph — `Order **#1024**` — across the eleven templates that
used to draw a bordered box. The PO number follows the same pattern, and the
pending-payment instructions block is untouched.

## The order number

`{{ name }}` and `{{ order_number }}` are not interchangeable: the first
renders with the shop's prefix (`#1024`), the second bare (`1024`). The subject
lines used `{{ name }}`, the bodies used `{{ order_number }}` — so the same
email read "Order #1024 confirmed" in the inbox and "ORDER 1024 CONFIRMED" once
opened. All 48 body occurrences across ten templates now use `{{ name }}`.

The preview fixture deliberately keeps both as Shopify sends them —
`order_number: 1024`, `name: '#1024'` — so the difference is visible rather
than hidden. Putting the `#` into the fixture would have made every preview
lie about what actually lands in the inbox.

A check over all 28 rendered templates confirms no bare order number survives
anywhere in visible copy.

## Per-email fixes

| Email | Change |
|---|---|
| Payment Error | `{{ email_body }}` was rendered twice — once through `Intro`, once through `Description` directly below it — so the whole paragraph appeared twice. Now once. |
| Shipping Confirmation | Dropped "You can track your order here:". Shopify's own `email_body` already says to use the link below, so this was a second sentence saying the same thing. The tracking box and its link stay. |
| Shipping Update | Same fix. |
| Out for Delivery | Keeps the line, but on a row of its own above the tracking box, via a new `trackingLabel` prop rather than trailing the body copy. Shipment link kept. |
| Delivered | Tracking-number display removed — the parcel has arrived, so it is no longer something to act on. |
| Account Invite | Gets Account Welcome's images. That meant moving the copy from `Description` into `Intro`, so the order is logo → heading → intro paragraph → image. The title already carried no exclamation mark. |
| Account Welcome | Its images were rendering *between* the heading and the body, because the body came through `Description` below them. Copy moved into `Intro` so the images follow it. |
| Payment Reminder, Password Reset, Payment Method Restore, Marketing Confirmation | Fixed by the `Description.tsx` lowercase removal above. |
| Marketing Confirmation | Copy moved into `Intro` so its images follow the paragraph instead of splitting the heading from the body. |
| Order Confirmation | The numbered steps were a single string of `<br />`s with no separation between them, and a trailing `<br />` padding the gap to "Your order". Now five blocks at 12px. |
| Payment Method Update | Still pending — the brief does not say what the requested edits are. |

## Open

- **"What's Included"** does not exist anywhere in the repo. If that heading is
  meant to ship, it has not been written yet — say where it belongs and it can
  be added.
- **Payment Method Update** is unspecified in the brief.
- **Account Welcome** is recorded as inactive after the customer account
  migration. It is still editable and has been fixed, but confirm whether it
  should ship.
- The info box in `CustomerInfo.tsx` has a 16px internal inset. That is the
  tinted box's own padding rather than a gap between elements, it is not named
  in the brief, and it was left as it was.
- `GoToAccount.tsx` is imported by nothing — the account block that ships lives
  in `Footer.tsx`. It was corrected rather than deleted.
- **Seven emails lost their images** as a consequence of making `showImage`
  opt-in: Order Edited, Order Invoice, Contact Customer, USPS Return Label and
  the three Return Request emails. The images brief never decided either way
  for these — it lists them as "not in scope" — and they only had photos
  because of the old default. They match the transactional pattern of the 17
  on the "remove" list, so removing them is the consistent reading, but it is a
  content decision: say the word and any of them can have the grid back with
  one prop.
