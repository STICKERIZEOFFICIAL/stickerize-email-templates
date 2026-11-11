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
	{% if fulfillment.item_count == item_count %} 
		{% capture email_title %}Heads up. Order {{ order_number }} arrives today.{% endcapture %}
	{% elsif fulfillment.item_count > 1 %} 
		{% if fulfillment_status == 'fulfilled' %}
			{% capture email_title %}Heads up. Order {{ order_number }} arrives today.{% endcapture %}
		{% else %}
			{% capture email_title %}Heads up. Order {{ order_number }} arrives today.{% endcapture %}
		{% endif %}
	{% else %} 
		{% if fulfillment_status == 'fulfilled' %}
			{% capture email_title %}Heads up. Order {{ order_number }} arrives today.{% endcapture %}
		{% else %}
			{% capture email_title %}Heads up. Order {{ order_number }} arrives today.{% endcapture %}
		{% endif %}
	{% endif %}

	{% capture email_emphasis %}Order {{ order_number }} is out for delivery and should land with you today. Start choosing where to place it.{% endcapture %}

	${Head({ title: '{{ email_title }}' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: `{{ email_title }}`,
        description: /*html*/ `
				{% if fulfillment.estimated_delivery_at %}
					{{ email_emphasis }}
					<br />
				{% endif %}
				{% if fulfillment.tracking_url %}
				You can track your order here:
				{% elsif fulfillment.tracking_numbers.size > 0 %}
				Your package number:
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
	previewText: "Order is out for delivery and should arrive today.",
  })}
`;
}
