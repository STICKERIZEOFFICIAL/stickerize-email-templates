# How tracking works in the shipping emails

What the Liquid in the four shipping notifications actually does, and which
conditions decide what a customer sees.

Covers **Shipping confirmation**, **Shipping update**, **Out for delivery** and
**Delivered**. All four share one tracking block, in
`app/components/shopify/Intro.tsx`, switched on by `showTrackingNumber: true`.

---

## 1. The one condition that changes behaviour

Everything about tracking turns on a single test:

```liquid
{% if shipping_method.title contains 'Express' %}
```

`shipping_method.title` is the name of the rate the customer picked at
checkout, as typed in Shopify's shipping settings.

| Shipping rate name | What the customer gets |
|---|---|
| contains the word **Express** | the tracking number as a **clickable link** to the carrier |
| anything else | the tracking number as **plain text**, not a link |

It appears twice per email, and the two uses have to agree:

**In the body copy** — it picks the line above the number:

```liquid
{% if shipping_method.title contains 'Express' %}
  You can track your order here:
{% else %}
  Your package number:
{% endif %}
```

**In the tracking block** — it decides whether to wrap the number in an `<a>`.

> ⚠️ This is a literal, case-sensitive substring match on a rate name. A rate
> called "express" or "EXPRESS" fails it; so does renaming "Express" to
> something like "Priority". Rename a rate in Shopify and these emails quietly
> stop linking their tracking numbers. There is no fallback.

**Delivered is the exception** — it has no Express branch. It always prints
`Tracking number:` followed by the number, and the number still links when the
conditions in §2 are met.

---

## 2. How many tracking numbers there are

The block in `Intro.tsx` handles three cases, in this order:

```liquid
{% if fulfillment.tracking_numbers.size > 0 %}
  {% if fulfillment.tracking_numbers.size == 1
        and fulfillment.tracking_company
        and fulfillment.tracking_url %}
```

| Case | Condition | Result |
|---|---|---|
| **One number, fully known** | exactly 1 number **and** a carrier **and** a URL | boxed number, linked if Express |
| **One number, incomplete** | exactly 1 number, but no carrier or no URL | boxed number, **never linked** |
| **Several numbers** | more than 1 | one box per number, each linked if that index has a URL |
| **None** | `tracking_numbers.size == 0` | **nothing renders at all** — no box, no label |

Two consequences worth knowing:

- A fulfillment with a tracking number but **no carrier** shows the number as
  plain text even on Express. Both `tracking_company` and `tracking_url` must
  be present for the link.
- When there is no tracking number, the body still prints "You can track your
  order here:" or "Your package number:" — the label is in the copy, outside
  the block that checks for numbers, so it is left pointing at nothing. This
  is the one genuine bug in the tracking logic.

For multiple numbers, each is paired with its own URL by index:

```liquid
{% for tracking_number in fulfillment.tracking_numbers %}
  {% if fulfillment.tracking_urls[forloop.index0] %}
```

A number whose matching URL is missing is skipped by that branch.

---

## 3. Estimated delivery date

Separate from tracking, and only in two of the four emails.

**Shipping confirmation** captures it unconditionally:

```liquid
{% capture email_emphasis %}Estimated delivery date:
  <strong>{{ fulfillment.estimated_delivery_at | date: format: 'date' }}</strong>
{% endcapture %}
```

It also passes `showEstimatedDelivery: true` to `CustomerInfo`, so the date
appears a second time in the order details block lower down.

**Out for delivery** guards it:

```liquid
{% if fulfillment.estimated_delivery_at %}
  {{ email_emphasis }}
{% endif %}
```

so nothing shows when Shopify has no estimate.

| Email | Estimated delivery |
|---|---|
| Shipping confirmation | always, twice (intro + order details) |
| Out for delivery | only when `fulfillment.estimated_delivery_at` exists |
| Shipping update | never |
| Delivered | never |

> ⚠️ Shipping confirmation does **not** guard its capture. If Shopify has no
> estimate, the email prints "Estimated delivery date:" followed by nothing.
> Out for delivery gets this right; shipping confirmation does not.

---

## 4. The title conditions, which do nothing

Shipping confirmation, Out for delivery and Delivered each open with a
five-branch conditional:

```liquid
{% if fulfillment.item_count == item_count %}
  {% capture email_title %}…{% endcapture %}
{% elsif fulfillment.item_count > 1 %}
  {% if fulfillment_status == 'fulfilled' %}
    {% capture email_title %}…{% endcapture %}
  {% else %}
    {% capture email_title %}…{% endcapture %}
  {% endif %}
{% else %}
  …
{% endif %}
```

The intent is Shopify's standard split between a **complete** shipment
(`fulfillment.item_count == item_count` — everything ordered is in this box)
and a **partial** one (only some items shipped, more to follow).

**In these templates every branch captures the same string.** The conditional
is live Liquid but has no visible effect: a partial shipment reads exactly like
a complete one. Shipping confirmation does the same for `email_body`.

So today a customer who receives three separate part-shipments gets three
identical "Order #1024 is on the move" emails with no indication that each
covers only part of the order.

If you ever want partial shipments worded differently, the branches are already
there — only the strings need to change. Nothing structural is required.

---

## 5. Variables these emails rely on

| Variable | Used for | Notes |
|---|---|---|
| `fulfillment.tracking_numbers` | the numbers | an array; `.size` drives the three cases |
| `fulfillment.tracking_numbers.first` | the single-number case | |
| `fulfillment.tracking_urls[forloop.index0]` | per-number links | index-matched to the numbers |
| `fulfillment.tracking_url` | the single-number link | must exist for the link to render |
| `fulfillment.tracking_company` | carrier | must exist for the link to render |
| `fulfillment.estimated_delivery_at` | delivery estimate | absent for many carriers |
| `fulfillment.item_count` | items in **this** shipment | |
| `item_count` | items in the **whole order** | equal values mean a complete shipment |
| `fulfillment_status` | `'fulfilled'` or not | only read inside the dead branches |
| `shipping_method.title` | the Express test | case-sensitive substring match |

---

## 6. Summary of what to watch

| | Behaviour | Status |
|---|---|---|
| Express rate renamed | tracking numbers stop linking, silently | fragile by design |
| No tracking number | label renders pointing at nothing | **bug** |
| No carrier or no URL | number shows as plain text | by design |
| No delivery estimate | shipping confirmation prints an empty date | **bug** |
| Partial shipment | reads identically to a complete one | intentional today |

None of the above is changed by the styling work; this file only documents
what the templates already do.
