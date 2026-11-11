# How tracking works in the shipping emails

What the Liquid in the four shipping notifications does, and which conditions
decide what a customer sees.

Covers **Shipping confirmation**, **Shipping update**, **Out for delivery** and
**Delivered**. All four share one tracking block, in
`app/components/shopify/Intro.tsx`, switched on by `showTrackingNumber: true`.

---

## The rule

**If Shopify gives us a tracking URL, the number is a link. If not, it is
plain text. If there is no tracking at all, nothing renders.**

```liquid
{% if fulfillment.tracking_url %}
  You can track your order here:
{% elsif fulfillment.tracking_numbers.size > 0 %}
  Your package number:
{% endif %}
```

That is the whole decision. It is carrier-agnostic on purpose: it keeps
working whoever ships the parcel.

| Situation | Label | Number |
|---|---|---|
| Tracking URL present | "You can track your order here:" | **linked** |
| Number but no URL | "Your package number:" | plain text |
| No tracking number | *(nothing)* | *(nothing)* |

**Delivered** is slightly different: its label is always "Tracking number:",
and it is hidden when there is no number. The number still links on the same
condition as the others.

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

## How many tracking numbers there are

The block handles three cases:

| Case | Condition | Result |
|---|---|---|
| **One number with a URL** | `tracking_numbers.size == 1` and `tracking_url` | one box, number linked |
| **One number, no URL** | `tracking_numbers.size == 1` | one box, plain text |
| **Several numbers** | more than one | one box each, linked where that index has a URL |
| **None** | `size == 0` | nothing renders, label included |

Multiple numbers pair to URLs by index:

```liquid
{% for tracking_number in fulfillment.tracking_numbers %}
  {% if fulfillment.tracking_urls[forloop.index0] %}
```

A number whose matching URL is missing is skipped by that branch.

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

## Variables these emails rely on

| Variable | Used for | Notes |
|---|---|---|
| `fulfillment.tracking_url` | **the decision** | present → the number links |
| `fulfillment.tracking_numbers` | the numbers | `.size` drives the three cases |
| `fulfillment.tracking_numbers.first` | the single-number case | |
| `fulfillment.tracking_urls[forloop.index0]` | per-number links | index-matched to the numbers |
| `fulfillment.tracking_company` | carrier name | no longer gates the link |
| `fulfillment.estimated_delivery_at` | delivery estimate | absent for many carriers |
| `fulfillment.item_count` | items in **this** shipment | |
| `item_count` | items in the **whole order** | equal values mean a complete shipment |
| `shipping_method.title` | **no longer used for tracking** | |

---

## Verified behaviour

Rendered against every combination:

| Scenario | Link | Number | Label |
|---|---|---|---|
| Standard rate, URL present | yes | yes | track-here |
| Express rate, URL present | yes | yes | track-here |
| URL present, no carrier | yes | yes | track-here |
| Number but no URL | no | yes | package-number |
| No tracking at all | no | no | *(none)* |

The first row is the fix: that customer previously got no link.
