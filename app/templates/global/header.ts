import { BodyWrapper } from '~/components/BodyWrapper';
import { Head } from '~/components/Head';
import { Header } from '~/components/shopify/Header';

/**
 * Not a notification — the shared masthead on its own, so the logo can be
 * checked without opening an email. Renders the real `Header()`, so whatever
 * shows here is what every template ships.
 */
export default function () {
  return /*html*/ `
	${Head({ title: 'Header' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}
	`,
    previewText: 'The masthead every notification shares.',
  })}
`;
}
