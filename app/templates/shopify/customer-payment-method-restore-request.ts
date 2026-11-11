import { BodyWrapper } from '~/components/BodyWrapper';
import { Button } from '~/components/Button';
import { Description } from '~/components/Description';
import { Footer } from '~/components/shopify/Footer';
import { Head } from '~/components/Head';
import { Header } from '~/components/shopify/Header';
import { Intro } from '~/components/shopify/Intro';

export default function () {
  return /*html*/ `
	{% capture email_title %}Restore your payment method for {{ shop.name }}{% endcapture %}
	{% capture email_body %}
	We couldn't verify the payment method saved to your Stickerize account. Use the secure link below to restore it or add a new one.
	{% endcapture %}

	${Head({ title: '{{ email_title }}' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: `{{ email_title }}`,
        description: null,
        showOrderNumber: false,
        showImage: false,
      })}

			${Description({
        description: /*html*/ `{{email_body}}`,
      })}

			${Button({ url: '{{ email_confirmation_url }}', label: 'Confirm payment information', paddingTop: 0 })}

			${Footer()}
	`,
	previewText: "Restore or update it using the secure link inside.",
  })}
`;
}
