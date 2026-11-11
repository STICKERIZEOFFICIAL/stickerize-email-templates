import { BodyWrapper } from '~/components/BodyWrapper';
import { Head } from '~/components/Head';
import { Footer } from '~/components/shopify/Footer';

/**
 * Not a notification — the shared footer on its own. Renders the real
 * `Footer()` with its default props; templates that drop the account block
 * pass `showLoginSection: false`.
 */
export default function () {
  return /*html*/ `
	${Head({ title: 'Footer' })}
	${BodyWrapper({
    children: /*html*/ `
			${Footer()}
	`,
    previewText: 'The footer every notification shares.',
  })}
`;
}
