import { BodyWrapper } from '~/components/BodyWrapper';
import { Button } from '~/components/Button';
import { CustomerInfo } from '~/components/shopify/CustomerInfo';
import { Footer } from '~/components/shopify/Footer';
import { Head } from '~/components/Head';
import { Header } from '~/components/shopify/Header';
import { Intro } from '~/components/shopify/Intro';
import { OrderTable } from '~/components/shopify/OrderTable';
import { Total } from '~/components/shopify/Total';

export default function () {
  return /*html*/ `
	{% capture email_title %} Action needed: Payment issue with your order: {{ order_name }} {% endcapture %}
	{% capture email_body %}
	We’re having trouble processing your payment. To ensure your custom stickers are made without delay, please update your payment information or contact us for support.
	{% endcapture %}

	${Head({ title: '{{ email_title }}' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: `{{ email_title }}`,
        description: /*html*/ `{{ email_body }}<br />`,
        showOrderNumber: true,
      })}

			${OrderTable({ heading: 'Order summary' })}

			${Total()}

			${CustomerInfo()}

			{% if checkout_payment_collection_url %}
				${Button({ url: 'https://stickerize.com/account', label: 'Go to my account', paddingTop: 0 })}
			{% endif %}

			${Footer()}
	`,
	previewText: "Please update your payment information.",
  })}
`;
}
