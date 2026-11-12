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
  {% capture email_title %}Order {{ order_number }} is on the move{% endcapture %}
  {% capture email_body %}Packed, shipped and heading your way. Track your package with the link below.{% endcapture %}
	{% elsif fulfillment.item_count > 1 %} 
		{% if fulfillment_status == 'fulfilled' %}
		{% capture email_title %}Order {{ order_number }} is on the move{% endcapture %}
		{% capture email_body %}Packed, shipped and heading your way. Track your package with the link below.{% endcapture %}
		{% else %}
		{% capture email_title %}Order {{ order_number }} is on the move{% endcapture %}
		{% capture email_body %}Packed, shipped and heading your way. Track your package with the link below.{% endcapture %}
		{% endif %}
	{% else %} 
		{% if fulfillment_status == 'fulfilled' %}
		{% capture email_title %}Order {{ order_number }} is on the move{% endcapture %}
		{% capture email_body %}Packed, shipped and heading your way. Track your package with the link below.{% endcapture %}
		{% else %}
		{% capture email_title %}Order {{ order_number }} is on the move{% endcapture %}
		{% capture email_body %}Packed, shipped and heading your way. Track your package with the link below.{% endcapture %}
		{% endif %}
	{% endif %}

	{% capture email_emphasis %}Estimated delivery date: <strong>{{fulfillment.estimated_delivery_at | date: format: 'date'}}</strong>{% endcapture %}

	${Head({ title: '{{ email_title }}' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: `{{ email_title }}`,
        // No "You can track your order here:" line: Shopify's own email_body
        // already says to use the link below, so this was the second sentence
        // telling the customer the same thing. The tracking box itself stays,
        // and so does its link.
        description: /*html*/ `<div>{{ email_body}}</div>
				{% if fulfillment.tracking_url == blank and fulfillment.tracking_numbers.size > 0 %}
				<div style="padding-top: 12px;">Your package number:</div>
				{% endif %}`,
        showOrderNumber: false,
        showImage: false,
        showTrackingNumber: true,
      })}

			${OrderTable({ heading: 'Items in this shipment' })}

			${Total()}

			${CustomerInfo({ showEstimatedDelivery: true })}

			${Footer()}
	`,
	previewText: "Packed, shipped and heading your way.",
  })}
`;
}
