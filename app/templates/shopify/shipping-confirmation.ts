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
        description: `{{ email_body}} <br /> <br />
				{% if shipping_method.title contains 'Express' %}
				You can track your order here:<br/>
				{% else %}
				Your package number:<br/>
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
