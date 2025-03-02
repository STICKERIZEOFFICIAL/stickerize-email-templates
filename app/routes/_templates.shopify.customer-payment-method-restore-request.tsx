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
	Your payment method needs attention. Please restore or update your details to continue enjoying seamless ordering for your custom stickers.
	{% endcapture %}

	${Head({ title: '{{ email_title }}' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: `{{ email_title }}`,
        description: null,
        showOrderNumber: false,
      })}

			${Description({
        description: /*html*/ `{{email_body}}`,
      })}

			${Button({ url: '{{ email_confirmation_url }}', label: 'Confirm payment information', paddingTop: 0 })}

			${Footer()}
	`,
	previewText: "Please restore or update your details to continue enjoying seamless ordering for your custom stickers.",
  })}
`;
}
