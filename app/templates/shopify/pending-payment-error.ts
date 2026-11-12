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
	{% capture email_title %} Payment issue for order {{ order_number }} {% endcapture %}
	{% capture email_body %}
	We couldn't complete the payment, so no charge was made and the order is on hold. Try paying again using the button below and we'll send designs to print right away.
	{% endcapture %}

	${Head({ title: '{{ email_title }}' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: `{{ email_title }}`,
        description: /*html*/ `{{ email_body }}`,
        showOrderNumber: true,
        showImage: false,
      })}

			${OrderTable({ heading: 'Order summary' })}

			${Total()}

			${CustomerInfo()}

			{% if checkout_payment_collection_url %}
				${Button({ url: 'https://stickerize.com/account', label: 'Go to my account', paddingTop: 0 })}
			{% endif %}

			${Footer()}
	`,
	previewText: "No payment was charged. Retry the payment to get the order moving.",
  })}
`;
}
