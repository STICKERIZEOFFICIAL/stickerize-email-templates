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
	{% capture email_title %} Your payment couldn’t be processed for order {{ order_name }} {% endcapture %}
	{% capture email_body %}
		You have not been charged, please try paying for the order again.
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
				${Button({ url: '{{ checkout_payment_collection_url }}', label: 'Pay now', paddingTop: 0 })}
			{% endif %}

			${Footer()}
	`,
  })}
`;
}
