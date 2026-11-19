import { Button } from '~/components/Button';

/**
 * The package number, and the button that tracks it.
 *
 * One implementation for all four shipping notifications, so the decision
 * about when a link can work cannot drift between them. See
 * docs/shipping-and-tracking-logic.md.
 *
 * This replaces the bordered box in `Intro` (`showTrackingNumber: true`). The
 * box was a link dressed as a number: it read as reference data rather than
 * as the thing to press, and on a phone a 13px number is a small target. The
 * number now sits in the copy, where a customer can read it off, quote it to
 * support or paste it into a carrier's site, and the action is the system CTA
 * button that every other actionable notification already uses.
 *
 * **The decision is unchanged from the box.** A link needs a URL and nothing
 * else — not a carrier name, not a shipping-rate name. Every case the box
 * handled is handled here:
 *
 * | Shopify gives us | Number | Action |
 * |---|---|---|
 * | one number, a URL anywhere | in the copy, plain | TRACK YOUR ORDER → the carrier |
 * | one number, no URL | in the copy, plain | VIEW YOUR ORDER → order status |
 * | several numbers | each on its own line, **each linked to its own URL** | VIEW YOUR ORDER → order status |
 * | no tracking at all | nothing | VIEW YOUR ORDER → order status |
 */

/**
 * The package-number line, for the end of a template's `Intro` description.
 *
 * Conditional in one piece, including the 12px that separates it from the
 * copy above: a `bodyCopy` block would keep its padding when its Liquid
 * resolved to nothing and leave a gap behind a line nobody can see.
 *
 * The single-number case is deliberately **not** a link — the button below it
 * is the way to track, and a second link on the number would be two controls
 * for one action. The multi-parcel case is the exception, and has to be: one
 * button cannot point at three parcels, so each number keeps the link the
 * bordered box used to give it. Nothing that used to be clickable stops being
 * clickable.
 */
export const PACKAGE_NUMBER = /*html*/ `
				{% if fulfillment.tracking_numbers.size == 1 %}
				<div style="padding-top: 12px;">Your package number: <strong>{{ fulfillment.tracking_numbers.first }}</strong></div>
				{% elsif fulfillment.tracking_numbers.size > 1 %}
				<div style="padding-top: 12px;">Your package numbers:{% for tracking_number in fulfillment.tracking_numbers %}<br />{% if fulfillment.tracking_urls[forloop.index0] %}<a href="{{ fulfillment.tracking_urls[forloop.index0] }}" target="_blank" rel="noopener"><strong>{{ tracking_number }}</strong></a>{% else %}<strong>{{ tracking_number }}</strong>{% endif %}{% endfor %}</div>
				{% endif %}`;

/**
 * The CTA: the carrier when there is one parcel to track, the order status
 * page when there is not.
 *
 * **One parcel, or none.** The button tracks it, taking
 * `fulfillment.tracking_url` when Shopify fills that convenience field and
 * otherwise the first non-blank entry in `fulfillment.tracking_urls`. The
 * search is a loop rather than `.first` so it cannot be defeated by a short,
 * misaligned or partly-empty array: if a URL is in there anywhere, the button
 * reaches it.
 *
 * **More than one parcel.** The button goes to the order status page, which
 * lists every parcel with its own link, and each number in the copy above
 * keeps its own link. A "TRACK YOUR ORDER" button cannot point at three
 * parcels, and pointing it at the first would quietly hide the other two.
 *
 * **No URL anywhere.** The order status page, which is still somewhere useful
 * to send someone.
 *
 * **No destination at all** — no tracking and no `order_status_url`, which is
 * a shape Shopify should never produce: no button, rather than a button that
 * goes nowhere.
 *
 * The one thing this trusts is Shopify's own contract that `tracking_urls`
 * pairs to `tracking_numbers` by index. That pairing is what links each
 * number in a multi-parcel shipment, and nothing here can repair a
 * fulfilment where it does not hold.
 */
export function TrackingButton({
  /** The label when a carrier URL exists. */
  label = 'Track your order',
}: { label?: string } = {}) {
  return /*html*/ `
			{%- assign cta_tracking_url = fulfillment.tracking_url -%}
			{%- if cta_tracking_url == blank and fulfillment.tracking_numbers.size <= 1 -%}
				{%- comment -%}
				  First non-blank, not .first: the array can be shorter than the
				  numbers, longer than them, or hold an empty string where a
				  carrier gave no URL. Any of those defeats an index lookup.
				{%- endcomment -%}
				{%- for candidate_url in fulfillment.tracking_urls -%}
					{%- if cta_tracking_url == blank and candidate_url != blank -%}
						{%- assign cta_tracking_url = candidate_url -%}
					{%- endif -%}
				{%- endfor -%}
			{%- endif -%}
			{% if cta_tracking_url != blank %}
				${Button({ url: '{{ cta_tracking_url }}', label, paddingTop: 0 })}
			{% elsif order_status_url %}
				${Button({ url: '{{ order_status_url }}', label: 'View your order', paddingTop: 0 })}
			{% endif %}`;
}
