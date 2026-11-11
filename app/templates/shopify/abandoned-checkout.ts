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
	Don’t miss out on your custom stickers
	{% else %}
	Don’t miss out on your custom stickers
	{% endif %}
	{% endcapture %}
	{% capture email_body %}
	{% if billing_address.first_name %}
	{% if item_count == 1 %}
	We noticed you left some amazing designs in your cart. It only takes a few clicks to complete your order and turn your ideas into life. Finish your checkout today and let’s make something awesome.
	{% else %}
	We noticed you left some amazing designs in your cart. It only takes a few clicks to complete your order and turn your ideas into life. Finish your checkout today and let’s make something awesome.
	{% endif %}
	{% else %}
	{% if item_count == 1 %}
	We noticed you left some amazing designs in your cart. It only takes a few clicks to complete your order and turn your ideas into life. Finish your checkout today and let’s make something awesome.
	{% else %}
	We noticed you left some amazing designs in your cart. It only takes a few clicks to complete your order and turn your ideas into life. Finish your checkout today and let’s make something awesome.
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
      })}

			${OrderTable({ heading: 'Complete your purchase', hidePrices: true })}

			${Footer({ paddingTop: '16px' })}
	`,
	previewText: "Finish your checkout today and let’s make something awesome.",
  })}
`;
}
