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
	You left an item in your cart
	{% else %}
	You left items in your cart
	{% endif %}
	{% endcapture %}
	{% capture email_body %}
	{% if billing_address.first_name %}
	{% if item_count == 1 %}
	Hi {{ billing_address.first_name }}, you added an item to your shopping cart and haven't completed your purchase. You
	can complete it now while it's still available.
	{% else %}
	Hi {{ billing_address.first_name }}, you added items to your shopping cart and haven't completed your purchase. You can
	complete it now while they're still available.
	{% endif %}
	{% else %}
	{% if item_count == 1 %}
	Hi, you added an item to your shopping cart and haven't completed your purchase. You can complete it now while it's
	still available.
	{% else %}
	Hi, you added items to your shopping cart and haven't completed your purchase. You can complete it now while they're
	still available.
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
  })}
`;
}
