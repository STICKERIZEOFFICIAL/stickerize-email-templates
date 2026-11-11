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
	${Head({ title: 'Your order was updated' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: 'Your order was updated',
        description: null,
        showOrderNumber: true,
      })}

			${OrderTable({ heading: 'Updated order' })}

			${Total()}

			${CustomerInfo()}

			${Footer()}
	`,
	previewText: "See the details to get to know what has changed",
  })}
`;
}
