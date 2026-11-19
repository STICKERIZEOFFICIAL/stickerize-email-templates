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
 * Out for delivery — on the shipping confirmation's design.
 *
 * The bordered tracking box and the "You can track your order here:" row
 * above it are both gone: the package number reads in the copy and the action
 * is the CTA button, both from `components/shopify/tracking.ts`.
 *
 * That row was this template's own `trackingLabel`, and it existed because
 * the box needed introducing. A button does not — it says what it does — so
 * the label goes with the box, and `Intro`'s `trackingLabel` now has no
 * caller.
 *
 * The five-branch title conditional is dropped for the same reason it was
 * dropped from Shipping confirmation: every branch captured the same string.
 */
export default function () {
  return /*html*/ `
	{% capture email_title %}Heads up. Your order arrives today.{% endcapture %}
	{% capture email_body %}Order ${ORDER_NUMBER} is out for delivery and should land with you today. Start choosing where to place it.{% endcapture %}

	${Head({ title: '{{ email_title }}' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: `{{ email_title }}`,
        description: /*html*/ `<div>{{ email_body }}</div>${PACKAGE_NUMBER}`,
        showPendingPayment: false,
        showImage: false,
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
	previewText: "Order is out for delivery and should arrive today.",
  })}
`;
}
