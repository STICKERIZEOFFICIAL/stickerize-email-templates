import { BodyWrapper } from '~/components/BodyWrapper';
import { CustomerInfo } from '~/components/shopify/CustomerInfo';
import { Footer } from '~/components/shopify/Footer';
import { Head } from '~/components/Head';
import { Header } from '~/components/shopify/Header';
import { OrderTable } from '~/components/shopify/OrderTable';
import { Total } from '~/components/shopify/Total';

export default function () {
  return /*html*/ `
	${Head({ title: 'Your order was updated' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			<!-- No Intro. The brief removes the opening header and its
			     introductory paragraph outright, with no replacement: "Updated
			     order" is the first content heading in the body. The intro here
			     carried nothing but the heading and a standalone order-number
			     row, both of which are gone, so the component goes with them —
			     and its spacing with it. The table heading takes the 24px that
			     used to sit above the intro heading. -->
			${OrderTable({ heading: 'Updated order', gapTop: 24, gapBottom: 24 })}

			${Total()}

			${CustomerInfo()}

			${Footer()}
	`,
	previewText: "See the details to get to know what has changed",
  })}
`;
}
