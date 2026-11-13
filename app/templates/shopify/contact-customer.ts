import { BodyWrapper } from '~/components/BodyWrapper';
import { Footer } from '~/components/shopify/Footer';
import { Head } from '~/components/Head';
import { Header } from '~/components/shopify/Header';
import { Intro } from '~/components/shopify/Intro';

export default function () {
  return /*html*/ `
	${Head({ title: '{{ email_title }}' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: `{{ email_title }}`,
        description: '{{ custom_message }}',
        showPendingPayment: false,
      })}

			${Footer({ showLoginSection: false })}
	`,
	previewText: `{{ custom_message}}`,
  })}
`;
}
