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
  {% capture email_title %}Your order is on the way{% endcapture %}
  {% capture email_body %}Your order is on the way. Track your shipment to see the delivery status.{% endcapture %}
	{% elsif fulfillment.item_count > 1 %} 
		{% if fulfillment_status == 'fulfilled' %}
			{% capture email_title %}The last items in your order are on the way{% endcapture %}
			{% capture email_body %}The last items in your order are on the way. Track your shipment to see the delivery status.{% endcapture %}
		{% else %}
			{% capture email_title %}Some items in your order are on the way{% endcapture %}
			{% capture email_body %}Some items in your order are on the way. Track your shipment to see the delivery status.{% endcapture %}
		{% endif %}
	{% else %} 
		{% if fulfillment_status == 'fulfilled' %}
			{% capture email_title %}The last item in your order is on the way{% endcapture %}
			{% capture email_body %}The last item in your order is on the way. Track your shipment to see the delivery status.{% endcapture %}
		{% else %}
			{% capture email_title %}One item in your order is on the way{% endcapture %}
			{% capture email_body %}One item in your order is on the way. Track your shipment to see the delivery status.{% endcapture %}
		{% endif %}
	{% endif %}

	{% capture email_emphasis %}Estimated delivery date: <strong>{{fulfillment.estimated_delivery_at | date: format: 'date'}}</strong>{% endcapture %}

	${Head({ title: '{{ email_title }}' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: `{{ email_title }}`,
        description: `We’re working to get your order out ASAP.<br/>
				You can track your order here:<br/>`,
        showOrderNumber: false,
        showTrackingNumber: true,
      })}

			${OrderTable({ heading: 'Items in this shipment' })}

			${Total()}

			${CustomerInfo({ showEstimatedDelivery: true })}

			${Footer()}
	`,
	previewText: "",
  })}
`;
}
