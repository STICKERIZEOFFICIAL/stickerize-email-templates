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
		{% capture email_title %}Your custom stickers have arrived.{% endcapture %}
	{% elsif fulfillment.item_count > 1 %} 
		{% if fulfillment_status == 'fulfilled' %}
			{% capture email_title %}Your custom stickers have arrived.{% endcapture %}
		{% else %}
			{% capture email_title %}Your custom stickers have arrived.{% endcapture %}
		{% endif %}
	{% else %} 
		{% if fulfillment_status == 'fulfilled' %}
			{% capture email_title %}Your custom stickers have arrived.{% endcapture %}
		{% else %}
			{% capture email_title %}Your custom stickers have arrived.{% endcapture %}
		{% endif %}
	{% endif %}

	${Head({ title: '{{ email_title }}' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: `{{ email_title }}`,
        description: /*html*/ `
		It’s time to get creative — your custom stickers have been delivered. We hope you love them as much as we loved making them. Share your designs with us using #STICKERIZE.<br /><br />
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
	previewText: "It’s time to get creative — your custom stickers have been delivered.",
  })}
`;
}
