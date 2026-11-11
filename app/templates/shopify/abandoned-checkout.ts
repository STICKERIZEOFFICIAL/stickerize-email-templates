import { BodyWrapper } from '~/components/BodyWrapper';
import { Footer } from '~/components/shopify/Footer';
import { Head } from '~/components/Head';
import { Header } from '~/components/shopify/Header';
import { Intro } from '~/components/shopify/Intro';
import { OrderTable } from '~/components/shopify/OrderTable';

export default function () {
  return /*html*/ `
	{% capture email_title %}
	{% if item_count == 1 %}
	Designs are still in cart
	{% else %}
	Designs are still in cart
	{% endif %}
	{% endcapture %}
	{% capture email_body %}
	{% if billing_address.first_name %}
	{% if item_count == 1 %}
	You were really close. Designs are saved and ready to go from screen to sticker, so pick up right where you left off.
	{% else %}
	You were really close. Designs are saved and ready to go from screen to sticker, so pick up right where you left off.
	{% endif %}
	{% else %}
	{% if item_count == 1 %}
	You were really close. Designs are saved and ready to go from screen to sticker, so pick up right where you left off.
	{% else %}
	You were really close. Designs are saved and ready to go from screen to sticker, so pick up right where you left off.
	{% endif %}
	{% endif %}
	{% endcapture %}

	${Head({ title: '{{ email_title }}' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: '{{ email_title }}',
        description: `
					{% if custom_message != blank %}
					{{ custom_message }}
					{% else %}
					{{ email_body }}
					{% endif %}`,
        showOrderNumber: false,
        showImage: false,
      })}

			${OrderTable({ heading: 'Complete your purchase', hidePrices: true })}

			${Footer({ paddingTop: '16px' })}
	`,
	previewText: "Pick up where you left off. Designs are saved.",
  })}
`;
}
