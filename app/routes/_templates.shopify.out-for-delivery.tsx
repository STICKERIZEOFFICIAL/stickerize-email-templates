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
		{% capture email_title %}Your stickers are almost here.{% endcapture %}
	{% elsif fulfillment.item_count > 1 %} 
		{% if fulfillment_status == 'fulfilled' %}
			{% capture email_title %}Your stickers are almost here.{% endcapture %}
		{% else %}
			{% capture email_title %}Your stickers are almost here.{% endcapture %}
		{% endif %}
	{% else %} 
		{% if fulfillment_status == 'fulfilled' %}
			{% capture email_title %}Your stickers are almost here.{% endcapture %}
		{% else %}
			{% capture email_title %}Your stickers are almost here.{% endcapture %}
		{% endif %}
	{% endif %}

	{% capture email_emphasis %}Exciting news — your custom sticker order is out for delivery and should arrive soon. Get ready to unbox your creativity.{% endcapture %}

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
	previewText: "Your custom stickers are out for delivery and should arrive soon.",
  })}
`;
}
