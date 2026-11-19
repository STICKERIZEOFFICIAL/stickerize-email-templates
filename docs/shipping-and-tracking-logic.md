# How tracking works in the shipping emails

What the Liquid in the four shipping notifications does, and which conditions
decide what a customer sees.

Covers **Shipping confirmation**, **Shipping update**, **Out for delivery** and
**Delivered**.

The first three share one implementation, `app/components/shopify/tracking.ts`:
`PACKAGE_NUMBER` for the number in the copy and `TrackingButton()` for the CTA.
Delivered carries neither — the parcel has arrived, so its number is no longer
something to act on — and has a plain "View your order" button instead.

**The bordered tracking box is retired.** It lives on in
`Intro`'s `showTrackingNumber`, which now has no caller, and in
`shipping-confirmation-old.ts`, which is kept for reference and is not sent.
See [The box, and what replaced it](#the-box-and-what-replaced-it).

---

## The rule, as it stands today

Two things reach the customer: **the package number, in the copy**, and **the
button under it**. One implementation drives both, in
`app/components/shopify/tracking.ts`, so Shipping confirmation, Shipping
update and Out for delivery cannot answer the question differently.

### What decides it

**A link needs a URL and nothing else.** Not a carrier name, not a
shipping-rate name — just a URL. That is the whole test, and it is
carrier-agnostic on purpose: it keeps working whoever ships the parcel.

The second thing that decides it is **how many parcels there are**, because a
single button cannot point at three of them.

### The number, in the copy

```liquid
{% if fulfillment.tracking_numbers.size == 1 %}
  Your package number: <strong>{{ fulfillment.tracking_numbers.first }}</strong>
{% elsif fulfillment.tracking_numbers.size > 1 %}
  Your package numbers:
  {% for tracking_number in fulfillment.tracking_numbers %}
    {% if fulfillment.tracking_urls[forloop.index0] %}  <!-- linked -->
    {% else %}                                          <!-- plain  -->
  {% endfor %}
{% endif %}
```

| Parcels | What the copy shows |
|---|---|
| **one** | `Your package number: 9400…` — bold, **not** a link, because the button below it is the way to track |
| **several** | `Your package numbers:` then one per line, **each linked to its own URL**, plain where that parcel has none |
| **none** | nothing at all, label included |

The multi-parcel case is the one that has to keep its links: the button is
going elsewhere, so without them a URL would be unreachable.

### The button

```liquid
{%- assign cta_tracking_url = fulfillment.tracking_url -%}
{%- if cta_tracking_url == blank and fulfillment.tracking_numbers.size <= 1 -%}
  {%- for candidate_url in fulfillment.tracking_urls -%}
    {%- if cta_tracking_url == blank and candidate_url != blank -%}
      {%- assign cta_tracking_url = candidate_url -%}
    {%- endif -%}
  {%- endfor -%}
{%- endif -%}
{% if cta_tracking_url != blank %}   TRACK YOUR ORDER → the carrier
{% elsif order_status_url %}         VIEW YOUR ORDER  → the order status page
{% endif %}
```

| Parcels | URL available | Button |
|---|---|---|
| one, or none | anywhere | **TRACK YOUR ORDER** → that URL |
| one, or none | none | VIEW YOUR ORDER → order status |
| several | — | VIEW YOUR ORDER → order status, which lists every parcel |
| any | no URL *and* no `order_status_url` | **no button at all** |

Three details, each of which exists because of a shape that would otherwise
lose a link:

- **`tracking_url` is only the first place it looks.** That field is Shopify's
  single-parcel convenience value and it comes back blank more often than you
  would expect — including on parcels whose URL *did* arrive in
  `tracking_urls`. The old bordered box printed those as dead text. The
  fallback picks them up.
- **The fallback is a loop, not `.first`.** `tracking_urls` can be shorter than
  the numbers, longer than them, or hold an empty string where a carrier
  returned no URL. Any of those defeats an index lookup, so the loop takes the
  first **non-blank** entry wherever it sits.
- **Several parcels always go to the order status page.** Pointing a
  "TRACK YOUR ORDER" button at the first of three parcels would quietly hide
  the other two. The order status page lists them all, and the numbers above
  are individually linked.

### What this guarantees

**If Shopify gives us a URL, the customer can reach it.** With one parcel it
is the button; with several it is the number's own link. There is no shape in
which a URL arrives and goes nowhere.

The one thing this trusts is Shopify's own contract that `tracking_urls` pairs
to `tracking_numbers` **by index**. That pairing is what links each number in
a multi-parcel shipment, and nothing in a template can repair a fulfilment
where it does not hold.

### Verified, not assumed

Every shape below was rendered through the preview against all three
templates, and all three produced identical results:

| | Fixture | Copy | Button |
|---|---|---|---|
| A | url + 1 number | number plain | **Track →** carrier |
| B | url blank, 1 url in the array | number plain | **Track →** carrier |
| C | url is an empty string, 1 in the array | number plain | **Track →** carrier |
| D | 2 numbers, only 1 has a url | #1 linked, #2 plain | View → order status |
| E | url present **and** 3 numbers with urls | all 3 linked | **Track →** carrier |
| F | 3 numbers with urls, url blank | all 3 linked | View → order status |
| G | url present, no numbers | — | **Track →** carrier |
| H | `tracking_urls` key absent entirely | number plain | **Track →** carrier |
| I | no urls at all, 1 number | number plain | View → order status |
| J | `fulfillment` absent entirely | — | View → order status |
| K | no tracking **and** no `order_status_url` | — | **no button** |
| L | url present, `order_status_url` null | number plain | **Track →** carrier |
| M | array holds only an empty string | number plain | View → order status |
| N | 1 number but 2 urls (mismatched lengths) | number plain | **Track →** carrier |
| O | 1 number, url only at index 1 | number plain | **Track →** carrier |
| P | 0 numbers but a url present | — | **Track →** carrier |

N and O are the pathological ones, and they are in the list because the first
implementation failed them: it read `tracking_urls.first` behind a
`size == 1` guard, so a misaligned array sent the customer to the order status
page while a perfectly good URL sat unused. That is what the loop fixes.

No Liquid errors in any shape, including J, where `fulfillment` itself is
absent.

### Delivered is the exception

**Delivered carries no package number and no tracking button.** The parcel has
arrived, so its number is no longer something to act on. It has a plain
`View your order` button instead, written directly in the template rather than
taken from `TrackingButton()` — that component's whole job is deciding whether
a carrier link can work, and after delivery the question is moot.

---

## What this replaced, and why

Until now the rule was:

```liquid
{% if shipping_method.title contains 'Express' %}   <!-- removed -->
```

That made sense when the carrier depended on the rate: standard shipping went
with Deutsche Post and could not be tracked, Express went with FedEx or DHL and
could. The rate name stood in for "is this trackable".

Everything ships with FedEx now, so that test had become wrong in the worst
direction: **every standard-shipping customer had a working FedEx tracking URL
that the email refused to show as a link.** The number was printed as plain
text and the copy said "Your package number:" instead of offering tracking.

### Why not match on the carrier or the URL

Two other options were considered and rejected:

- **`tracking_url contains 'fedex.com'`** — breaks the day a second carrier is
  added back, and FedEx uses regional domains (`fedex.com/fedextrack`,
  `fedex.de`, …). It would also fail silently, in exactly the way the Express
  test just did.
- **Requiring `fulfillment.tracking_company`** — the old code did, and it meant
  a fulfillment with a perfectly good URL still rendered as plain text if the
  carrier field happened to be empty. A link needs a URL; nothing else.

Asking "is there a URL" is the question that actually determines whether a
link can work, so it is the one the template asks.

---

## Estimated delivery date

Separate from tracking, and only in two of the four.

| Email | Estimated delivery |
|---|---|
| Shipping confirmation | always, twice (intro + order details) |
| Out for delivery | only when `fulfillment.estimated_delivery_at` exists |
| Shipping update | never |
| Delivered | never |

> ⚠️ **Still open.** Shipping confirmation does not guard its capture:
>
> ```liquid
> {% capture email_emphasis %}Estimated delivery date:
>   <strong>{{ fulfillment.estimated_delivery_at | date: format: 'date' }}</strong>
> {% endcapture %}
> ```
>
> If Shopify has no estimate, the email prints "Estimated delivery date:"
> followed by nothing. Out for delivery wraps the same line in
> `{% if fulfillment.estimated_delivery_at %}` and gets it right. Fixing this
> is a one-line change, not yet made.
>
> It has not bitten anyone yet only because Shipping confirmation **captures
> `email_emphasis` and never renders it**. The estimate is not dependable
> enough to show, so variant 2 carries no capture at all; if the field ever
> becomes reliable, the guard above is what either template needs before the
> line goes back on the page.

---

## The title conditions, which do nothing

Shipping confirmation, Out for delivery and Delivered each open with a
five-branch conditional splitting a **complete** shipment
(`fulfillment.item_count == item_count` — everything ordered is in this box)
from a **partial** one.

**Every branch captures the same string.** The conditional is live Liquid with
no visible effect: a partial shipment reads exactly like a complete one. A
customer receiving three part-shipments gets three identical "Order #1024 is on
the move" emails with no sign that each covers only part of the order.

The branches are already there if you ever want partial shipments worded
differently — only the strings need changing.

---

## The box, and what replaced it

Tracking used to be a bordered box with the number linked inside it. It is now
the package number in the copy and **the system CTA button** — the same
`Button` the account, payment and returns notifications already use. Shipping
confirmation went first; Shipping update and Out for delivery followed, and
all three now run off `app/components/shopify/tracking.ts`.

```
YOUR ORDER IS ON THE MOVE

Order #1024 is packed, shipped and heading your way. Track your
package with the link below.

Your package number: 9400111899223817171718

[ →  TRACK YOUR ORDER                                   ]
```

`shipping-confirmation-old.ts` keeps the previous design, unchanged and
unregistered for sending, so it can be looked at rather than reconstructed
from git. The copy is identical in both.

### Why

- **One primary action, where the eye lands.** A shipping confirmation has one
  job. Every major carrier and retailer resolves it the same way: a sentence,
  the parcel's identity, then a single button. The box was a link dressed as a
  number — it reads as reference data rather than as the thing to press, and on
  a phone a 13px number is a small target.
- **The number stays, as reference rather than as the control.** It is what a
  customer pastes into a carrier's site, quotes to support, or matches against
  a delivery notice. So it keeps its own paragraph under the body copy — the
  same "Your package number:" line as before and the number in bold on the
  same line, **minus the box border**, because the border is what made a
  reference read as a control. The carrier is not named: "package number" is what the label
  says on every one of these emails, and it keeps working whoever ships the
  parcel. The button carries the action. Both, each doing its own job.
- **No estimated delivery date.** The estimate is not reliably available, so a
  line built on `fulfillment.estimated_delivery_at` would be blank more often
  than not. No `email_emphasis` capture is carried at all, rather than one
  that renders nothing — which is the state the old template is in, by
  accident rather than by decision. See
  [Estimated delivery date](#estimated-delivery-date).

### What it is compared with

The old design is not gone: `shipping-confirmation-old.ts` still renders it,
so the two can be put side by side. Every tracking shape was rendered through
both before the switch, and the result is in
[Verified, not assumed](#verified-not-assumed) above — **no link the box gave
is lost, and two shapes gain a link the box used to drop.**

- **The five-branch title conditional went too.** Every branch of it captured
  the same string (see [The title conditions, which do
  nothing](#the-title-conditions-which-do-nothing)), so it was live Liquid
  with no visible effect. "Items in this shipment" on the order table is what
  tells a customer the box is part of the order. The branches survive in the
  old template if partial-shipment wording is ever written.
- **Out for delivery lost a line as well.** It used to print "You can track
  your order here:" on a row of its own above the box, through `Intro`'s
  `trackingLabel`. A button introduces itself, so the label went with the box
  — and `trackingLabel` now has no caller, as `showTrackingNumber` has none.

---

## Variables these emails rely on

| Variable | Used for | Notes |
|---|---|---|
| `fulfillment.tracking_url` | **the button's first choice** | blank more often than you would expect; the array is the fallback |
| `fulfillment.tracking_urls` | the button's fallback, and the per-number links | searched for the first non-blank entry, not indexed, when there is one parcel |
| `fulfillment.tracking_numbers` | the numbers | `.size` decides one parcel from several, which decides where the button goes |
| `fulfillment.tracking_numbers.first` | the single-number case | |
| `fulfillment.tracking_urls[forloop.index0]` | per-number links | index-matched to the numbers |
| `fulfillment.tracking_company` | nothing, now | it never gated the link, and the copy no longer names the carrier either |
| `order_status_url` | the button's destination when no carrier URL exists | no button at all when this is missing too |
| `fulfillment.estimated_delivery_at` | delivery estimate | absent for many carriers |
| `fulfillment.item_count` | items in **this** shipment | |
| `item_count` | items in the **whole order** | equal values mean a complete shipment |
| `shipping_method.title` | **no longer used for tracking** | |

---

## Verified behaviour of the retired box

Kept for the record. This is what `shipping-confirmation-old.ts` does, and
what the four emails did before the CTA replaced the box:

| Scenario | Link | Number | Label |
|---|---|---|---|
| Standard rate, URL present | yes | yes | track-here |
| Express rate, URL present | yes | yes | track-here |
| URL present, no carrier | yes | yes | track-here |
| Number but no URL | no | yes | package-number |
| No tracking at all | no | no | *(none)* |

The fourth row is where the box fell short of what Shopify actually provided:
a parcel whose URL arrived in `tracking_urls` but not in `tracking_url` landed
there and was printed as dead text. See
[The rule, as it stands today](#the-rule-as-it-stands-today).
