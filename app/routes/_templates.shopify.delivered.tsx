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
		{% capture email_title %}Your order has been delivered{% endcapture %}
	{% elsif fulfillment.item_count > 1 %} 
		{% if fulfillment_status == 'fulfilled' %}
			{% capture email_title %}The last items in your order have been delivered{% endcapture %}
		{% else %}
			{% capture email_title %}Some items in your order have been delivered{% endcapture %}
		{% endif %}
	{% else %} 
		{% if fulfillment_status == 'fulfilled' %}
			{% capture email_title %}The last item in your order has been delivered{% endcapture %}
		{% else %}
			{% capture email_title %}One item in your order has been delivered{% endcapture %}
		{% endif %}
	{% endif %}

	${Head({ title: '{{ email_title }}' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: `{{ email_title }}`,
        description: /*html*/ `
				Haven't received your package yet? <a href="mailto:{{ shop.email }}">Let us know.</a>
				<br/>
				Tracking number:`,
        showOrderNumber: false,
        showTrackingNumber: true,
      })}

			${OrderTable({ heading: 'Items in this shipment' })}

			${Total()}

			${CustomerInfo()}

			${Footer()}
	`,
  })}
`;
}
