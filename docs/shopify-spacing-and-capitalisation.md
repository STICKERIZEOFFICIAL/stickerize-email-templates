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

### A CTA button is not a section

The gap **above a button is 24px**, not 36px. A button is not a section of its
own: it is the action belonging to the copy directly above it, so the element
gap is the one that applies. At 36px a button floats free of the sentence that
asks you to press it.

Every template used to put 36px there, which is what prompted this. Eleven now
pass the closing gap explicitly:

| Shape | How |
|---|---|
| Copy comes through `Intro` | `gapBottom: 24` on the `Intro` call |
| Copy comes through `Description` | `gap: 24` on the `Description` call |

The same rule applies on the other platforms. Klaviyo's two emails now close
their last text block at 24px rather than 36px; the kit was already at 24px.
Rise.ai is spaced by collapsing section margins that give 24px anyway, and
Stamped's coupon button deliberately sits 12px under the code box.

**Four templates are deliberately left at 36px**, because what precedes the
button in them is not a paragraph but a different section: the order table in
Return declined and Return received, and the customer-information panel in
Pending payment error and Payment receipt. Those read as section-to-section.
Say the word if they should be 24px too, for one number everywhere.

**Below the button is still 32px**, which is in `Button.tsx` and predates this.
It is neither of the brief's numbers — a section gap there would be 36px. Left
alone because it is not what this change was about, but worth a decision.

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

> **Partly reversed since.** An `ORDER NUMBER` row is back in the
> `CustomerInfo` panel — see [The customer-info panel's order-number
> row](#the-customer-info-panels-order-number-row) below. The bordered box is
> still gone, and the bold number in the body copy stays; the number now
> appears twice on most emails, which is the deliberate change.

## The customer-info panel's order-number row

The panel carried an **Estimated delivery** row that never rendered. It was
conditional on `consolidated_estimated_delivery_time`, which Shopify does not
populate on these notifications, so the condition was always false and the row
never appeared on a single email.

It is now an **ORDER NUMBER** row, the first row of the panel, on all eleven
templates that carry it. That reverses the brief's "remove the standalone
order-number box wherever it appears" to the extent of this one row: a reader
scanning the summary panel for order facts was the case the brief did not
cover.

The value is `ORDER_NUMBER_VALUE` from `orderNumber.ts` — the same fallback
chain the body copy uses — not the bare `{{ order_name }}` the row carried
before it was removed. That variable is empty on most of these notifications,
which is the other half of why the row was blank even when it did render.

`showEstimatedDelivery` is gone from `CustomerInfo`; nothing is conditional
about the new row.

## Liquid variable review

Every variable the 28 templates read, checked against
[Shopify's notification variable reference](https://help.shopify.com/en/manual/fulfillment/setup/notifications/email-variables).

**The templates came out correct.** Nothing was reading a variable that does
not exist, and nothing was using one outside the notification it belongs to.
Two things are worth writing down:

- The help page is **not exhaustive**. `shop.url`, `po_number`,
  `total_outstanding`, `custom_message`, `email_title`, `transaction_id`,
  `checkout_payment_collection_url`, `return_label.*`, `payment_terms.type` /
  `.translated_name` / `.next_payment` / `.automatic_capture_at_fulfillment`
  and the whole `transaction.*` family are absent from it, yet every one is
  used by Shopify's own default notification templates, which is where these
  came from. The page also documents no return-notification scope at all. A
  name missing from that page is not evidence of a bug.
- `line.bundle_components` and `line.bundle_parent?` are **draft-orders-only**
  per the page, and both sit behind `{% assign expand_bundles = false %}` in
  `OrderTable` — dead either way. Bundles reach the order emails through
  `line_item_groups` instead, which is the path the preview exercises. The dead
  branch is inherited from Shopify's default template, where `expand_bundles`
  is a real setting. Harmless, removable.

### What the review did find: four fixture gaps

All preview-only. The Liquid was right in every case; `sample-data.ts` was
supplying a different shape, so the preview rendered a blank where a real send
would not.

| Template | Read by the Liquid | The fixture had | Previewed as |
|---|---|---|---|
| Order refund | `amount` | `refund_amount` | **"We've refunded $0.00 USD"** |
| Return declined | `return.decline["note"]` | `return.decline_note` | no reason given at all |
| Return approved | `return.deliveries` | a top-level `return_delivery_first`, shadowed by the template's own `assign` | no carrier, no tracking number |
| USPS label, both return emails | `return_label.public_file_url`, `order.customer_order_url`, `order.order_status_url` | `return_label.label_url`, no URLs on `order` | buttons with an empty `href` |

`refund_method_title` is in the fixture too and is read by nothing: `Total`
assigns it from the transaction, so a fixture key of that name is shadowed
before anything can read it.

### How they were found, and what that misses

Two passes, because neither catches everything on its own:

1. every `{{ output }}` and `{% tag %}` across the 28 rendered templates,
   minus the locals each one assigns, cross-referenced against the fixture's
   top-level keys;
2. every rendered page scanned for an empty `href`, `mailto:` or `src`.

The first misses a dotted path whose parent exists but whose leaf does not;
the second misses a blank that is not a link. The decline note was caught by
neither and turned up on a read-through. **A blank is the failure mode that
hides** — the email still sends, the line simply is not there, which is how the
Estimated delivery row survived as long as it did.

## Line-item rules: grey between, black at the end

The rules in the order table were all 1px `#000001`, which made the one under
the last item look like one more divider between items. It is not: it is the
line that separates the order from its totals.

So rules **between** items are now `#c9c7c5` — the grey the table already uses
for a compare-at price, not a new token — and the **last** rule stays black.
Nothing else about the table changes: same 1px, same position, same 24px either
side, so the layout is identical.

### Knowing which row is last

Harder than it looks, and `forloop.last` is the wrong answer. Two loops run in
sequence over different collections:

1. `subtotal_line_items`, which **skips** any item belonging to a bundle, so
   its last iteration is often not its last rendered row;
2. `line_item_groups`, the bundles, which render after — so whenever there is
   one, the black rule belongs to this loop.

Both are counted before either runs: `ungrouped_count` and `group_count`. An
item takes the black rule only when it is the last ungrouped item *and* there
are no groups behind it; a group takes it on `forloop.last`.

Verified against eight shapes — one item, several, one group, several groups,
items followed by groups, a grouped item sitting last in the collection, and an
empty order. Exactly one black rule in every non-empty case, always last, and
none when there is nothing to draw.

## The summary row order

**Order discount** now comes **first**, above Shipping:

    Order discount   -$5
    Shipping         Free
    Today's total    $36

It used to sit between Shipping and the total, which is what
`docs/Stickerize-Shopify-Email-Changes-for-Claude (1).md` asked for. In
practice that read as though the discount were taken off the shipping line —
exactly what it is not. A shipping discount is netted off the Shipping row
itself; this row is the merchandise discount on the order.

One side still owns each gap, but which row is first now depends on whether
the discount qualifies, so the gap above Shipping is computed —
`first_row_gap`, 4px when the discount renders and 0 when it does not. The
24px down from the last line item stays the order table's either way.

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
