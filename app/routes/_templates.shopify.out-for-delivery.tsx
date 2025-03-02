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
		{% capture email_title %}Your order is out for delivery{% endcapture %}
	{% elsif fulfillment.item_count > 1 %} 
		{% if fulfillment_status == 'fulfilled' %}
			{% capture email_title %}The last items in your order are out for delivery{% endcapture %}
		{% else %}
			{% capture email_title %}Some items in your order are out for delivery{% endcapture %}
		{% endif %}
	{% else %} 
		{% if fulfillment_status == 'fulfilled' %}
			{% capture email_title %}The last item in your order is out for delivery{% endcapture %}
		{% else %}
			{% capture email_title %}One item in your order is out for delivery{% endcapture %}
		{% endif %}
	{% endif %}

	{% capture email_emphasis %}Estimated delivery date: <strong>{{fulfillment.estimated_delivery_at | date: format: 'date'}}</strong>{% endcapture %}

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
				You can track your order here:`,
        showOrderNumber: false,
        showTrackingNumber: true,
      })}

			${OrderTable({ heading: 'Items in this shipment' })}

			${Total()}

			${CustomerInfo()}

			${Footer()}
	`,
	previewText: "",
  })}
`;
}
