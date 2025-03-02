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
	{% capture email_title %}Your order has been refunded{% endcapture %}
	{% elsif refund_line_items.size == 0 %}
	{% capture email_title %}You have received a refund{% endcapture %}
	{% else %}
	{% capture email_title %}Some items in your order have been refunded{% endcapture %}
	{% endif %}
	{% capture email_body %}Total amount refunded: <strong>{{ amount | money_with_currency }}</strong>. It may take up to 10 days for this refund to appear in your account.{% endcapture %}

	${Head({ title: '{{ email_title }}' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: `{{ email_title }}`,
        description: '{{ email_body }}<br />',
        showOrderNumber: true,
      })}

			${OrderTable({ heading: 'Order summary' })}

			${Total({showRefund: true})}

			${CustomerInfo()}

			${Footer()}
	`,
	previewText: "",
  })}
`;
}
