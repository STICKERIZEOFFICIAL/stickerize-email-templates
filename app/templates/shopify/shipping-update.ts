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
 * Shipping update — on the shipping confirmation's design.
 *
 * The bordered tracking box is gone: the package number reads in the copy and
 * the action is the CTA button, both from
 * `components/shopify/tracking.ts`, so this email and the other three
 * shipping notifications ask the same question of the same fields.
 *
 * The box's "Your package number:" label used to be printed here by hand,
 * conditional on there being a number but no URL. That line is now part of
 * the shared block and is printed whenever there is a number at all — the URL
 * decides what the *button* does, not whether the customer is told their
 * parcel's number.
 */
export default function () {
  return /*html*/ `
	{% capture email_title %}Update on your order{% endcapture %}
	{% capture email_body %}Quick update: there's movement on order ${ORDER_NUMBER}. The shipment is in transit and making its way to you. Check the latest status using the link below.{% endcapture %}

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
	previewText: "New tracking info for order {{ name }}.",
  })}
`;
}
