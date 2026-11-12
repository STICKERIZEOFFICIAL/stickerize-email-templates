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
		{% capture email_title %}It's arrived. Time to Stickerize everything.{% endcapture %}
	{% elsif fulfillment.item_count > 1 %} 
		{% if fulfillment_status == 'fulfilled' %}
			{% capture email_title %}It's arrived. Time to Stickerize everything.{% endcapture %}
		{% else %}
			{% capture email_title %}It's arrived. Time to Stickerize everything.{% endcapture %}
		{% endif %}
	{% else %} 
		{% if fulfillment_status == 'fulfilled' %}
			{% capture email_title %}It's arrived. Time to Stickerize everything.{% endcapture %}
		{% else %}
			{% capture email_title %}It's arrived. Time to Stickerize everything.{% endcapture %}
		{% endif %}
	{% endif %}

	${Head({ title: '{{ email_title }}' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: `{{ email_title }}`,
        description: [
          'Laptop, water bottle, notebook, phone. Your call. Show us where they end up: post it and tag @stickerizee. We feature our favourites.',
          /*html*/ `Not seeing your package? <a href="mailto:{{ shop.email }}">Let us know</a> and we'll track it down.`,
        ],
        showOrderNumber: false,
        showImage: false,
        // The tracking number display is gone: the parcel has arrived, so a
        // tracking number is no longer something to act on.
        showTrackingNumber: false,
      })}

			${OrderTable({ heading: 'Items in this shipment' })}

			${Total()}

			${CustomerInfo()}

			${Footer()}
	`,
	previewText: "Your order has landed. Show us where it ends up.",
  })}
`;
}
