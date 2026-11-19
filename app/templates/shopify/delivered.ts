import { BodyWrapper } from '~/components/BodyWrapper';
import { CustomerInfo } from '~/components/shopify/CustomerInfo';
import { Footer } from '~/components/shopify/Footer';
import { Head } from '~/components/Head';
import { Header } from '~/components/shopify/Header';
import { Intro } from '~/components/shopify/Intro';
import { Button } from '~/components/Button';
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
        showPendingPayment: false,
        showImage: false,
        // No package number, and no tracking box before it: the parcel has
        // arrived, so its number is no longer something to act on. This is
        // the one shipping email of the four that carries neither.
        showTrackingNumber: false,
        // 24px to the button below, not the 36px section gap: the button is
        // this copy's action, not a section of its own.
        gapBottom: 24,
      })}

			{% comment %}
			  The same CTA the other three shipping emails carry, on the one label
			  that still means anything after delivery. It does not go through
			  the shared TrackingButton: that component's whole job is deciding
			  whether a carrier link can work, and on a delivered parcel the
			  answer is moot — there is nothing left to track. So this email
			  asks the simpler question directly.

			  (No backticks in this comment: the file is a JS template literal.)
			{% endcomment %}
			{% if order_status_url %}
				${Button({ url: '{{ order_status_url }}', label: 'View your order', paddingTop: 0 })}
			{% endif %}

			${OrderTable({ heading: 'Items in this shipment', gapBottom: 24 })}

			${Total()}

			${CustomerInfo()}

			${Footer()}
	`,
	previewText: "Your order has landed. Show us where it ends up.",
  })}
`;
}
