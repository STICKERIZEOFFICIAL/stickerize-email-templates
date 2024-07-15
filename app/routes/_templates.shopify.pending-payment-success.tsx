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
	{% capture email_title %}Your payment for {{ order.name }} has been received {% endcapture %}

	${Head({ title: '{{ email_title }}' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: `{{ email_title }}`,
        description: null,
        showOrderNumber: true,
      })}

			${OrderTable({ heading: 'Order summary' })}

			${Total()}

			${CustomerInfo()}

			${Footer()}
	`,
  })}
`;
}
