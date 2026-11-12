import { BodyWrapper } from '~/components/BodyWrapper';
import { CustomerInfo } from '~/components/shopify/CustomerInfo';
import { Footer } from '~/components/shopify/Footer';
import { Head } from '~/components/Head';
import { Header } from '~/components/shopify/Header';
import { Intro } from '~/components/shopify/Intro';
import { OrderTable } from '~/components/shopify/OrderTable';
import { Total } from '~/components/shopify/Total';

export default function () {
  return /*html*/ `
	{% capture email_title %}Update on order {{ name }}{% endcapture %}
	{% capture email_body %}Quick update: there's movement on your order. The shipment is in transit and making its way to you. Check the latest status using the link below.{% endcapture %}

	${Head({ title: '{{ email_title }}' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: `{{ email_title }}`,
        // Same duplicate-tracking-copy fix as Shipping Confirmation.
        description: /*html*/ `<div>{{email_body}}</div>
				{% if fulfillment.tracking_url == blank and fulfillment.tracking_numbers.size > 0 %}
				<div style="padding-top: 12px;">Your package number:</div>
				{% endif %}`,
        showOrderNumber: false,
        showImage: false,
				showTrackingNumber: true,
      })}

			${OrderTable({ heading: 'Items in this shipment' })}

			${Total()}

			${CustomerInfo()}

			${Footer()}
	`,
	previewText: "New tracking info for order {{ name }}.",
  })}
`;
}
