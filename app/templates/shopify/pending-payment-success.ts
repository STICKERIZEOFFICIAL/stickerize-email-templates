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
	{% capture email_title %}Payment confirmed for order {{ order_number }}{% endcapture %}

	${Head({ title: '{{ email_title }}' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: `{{ email_title }}`,
        description: "All good. The payment went through and designs are headed for print. We'll send an email as soon as they ship.",
        showOrderNumber: true,
        showImage: false,
      })}

			${OrderTable({ heading: 'Order summary' })}

			${Total()}

			${CustomerInfo()}

			${Footer()}
	`,
	previewText: "Designs are headed for print.",
  })}
`;
}
