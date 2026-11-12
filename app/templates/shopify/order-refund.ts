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
	{% if refund_line_items.size == item_count %}
	{% capture email_title %}Refund for order {{ name }} is on its way{% endcapture %}
	{% elsif refund_line_items.size == 0 %}
	{% capture email_title %}Refund for order {{ name }} is on its way{% endcapture %}
	{% else %}
	{% capture email_title %}Some items in your order have been refunded{% endcapture %}
	{% endif %}
	{% capture email_body %}We've refunded <strong>{{ amount | money_with_currency }}</strong> for order {{ name }}. Depending on your bank or payment method, it may take up to 10 days to show up in your account. Anything else we can sort for you? Just reply.{% endcapture %}

	${Head({ title: '{{ email_title }}' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: `{{ email_title }}`,
        description: '{{ email_body }}',
        showOrderNumber: true,
        showImage: false,
      })}

			${OrderTable({ heading: 'Order summary' })}

			${Total({showRefund: true})}

			${CustomerInfo()}

			${Footer()}
	`,
	previewText: "Your money is heading back to you.",
  })}
`;
}
