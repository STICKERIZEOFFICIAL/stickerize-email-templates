import { BodyWrapper } from '~/components/BodyWrapper';
import { CustomerInfo } from '~/components/shopify/CustomerInfo';
import { Footer } from '~/components/shopify/Footer';
import { Head } from '~/components/Head';
import { Header } from '~/components/shopify/Header';
import { Intro } from '~/components/shopify/Intro';
import { ORDER_NUMBER } from '~/components/shopify/orderNumber';
import { OrderTable } from '~/components/shopify/OrderTable';
import { PACKAGE_NUMBER, TrackingButton } from '~/components/shopify/tracking';
import { Total } from '~/components/shopify/Total';

/**
 * Shipping confirmation — the standard one.
 *
 * Tracking is offered as the system CTA button that every other actionable
 * notification already uses, with the package number reading in the copy
 * above it. `shipping-confirmation-old.ts` is the previous design, kept for
 * reference: it put the number in a bordered box and made the box the link.
 *
 * Both the number and the button come from `components/shopify/tracking.ts`,
 * shared with Shipping update and Out for delivery, so the four shipping
 * emails cannot drift apart on the one decision that matters — when a link
 * can work. See docs/shipping-and-tracking-logic.md.
 *
 * **No estimated delivery date.** The old template captured `email_emphasis`
 * with the date in it and never rendered it, which was the right outcome by
 * accident: `fulfillment.estimated_delivery_at` is not reliably populated, so
 * the line would be blank more often than not. This carries no capture at all
 * rather than one that renders nothing.
 */
export default function () {
  return /*html*/ `
	{% comment %}
	  The five-branch title conditional from the old template is deliberately
	  not carried over. Every one of its branches captured the same string, so
	  it was live Liquid with no visible effect; the partial-shipment wording
	  it was there to hold was never written. "Items in this shipment" on the
	  order table is what tells a customer this box is part of the order.

	  The strings themselves are unchanged.
	{% endcomment %}
	{% capture email_title %}Your order is on the move{% endcapture %}
	{% capture email_body %}Order ${ORDER_NUMBER} is packed, shipped and heading your way. Track your package with the link below.{% endcapture %}

	${Head({ title: '{{ email_title }}' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: `{{ email_title }}`,
        description: /*html*/ `<div>{{ email_body }}</div>${PACKAGE_NUMBER}`,
        showPendingPayment: false,
        showImage: false,
        // The number is in the copy above and the action is the button below,
        // so the bordered box would be the third thing saying the same thing.
        showTrackingNumber: false,
        // 24px to the button below, not the 36px section gap: the button is
        // this copy's action, not a section of its own.
        gapBottom: 24,
      })}

			${TrackingButton()}

			${OrderTable({ heading: 'Items in this shipment', gapBottom: 24 })}

			${Total()}

			${CustomerInfo()}

			${Footer()}
	`,
	previewText: "Packed, shipped and heading your way.",
  })}
`;
}
