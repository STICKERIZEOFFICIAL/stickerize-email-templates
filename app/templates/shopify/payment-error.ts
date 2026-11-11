import { BodyWrapper } from '~/components/BodyWrapper';
import { Button } from '~/components/Button';
import { Description } from '~/components/Description';
import { Footer } from '~/components/shopify/Footer';
import { Head } from '~/components/Head';
import { Header } from '~/components/shopify/Header';
import { Intro } from '~/components/shopify/Intro';

export default function () {
  return /*html*/ `
	{% capture email_title %} Payment didn't go through {% endcapture %}
	{% capture email_body %}
	Something went wrong with your payment, and you haven't been charged. Designs are still in your cart. Try again, or switch to a different payment method, and you're good to go.
	{% endcapture %}

	${Head({ title: '{{ email_title }}' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: `{{ email_title }}`,
        description: /*html*/ `{{email_body}}`,
        showOrderNumber: false,
      })}

			${Description({
        description: /*html*/ `
					{{ email_body }}
					`,
      })}

			${Button({ url: 'https://stickerize.com/account', label: 'Go to my account', paddingTop: 0 })}

			${Footer()}
	`,
	previewText: "You haven't been charged, and your designs are still in your cart.",
  })}
`;
}
