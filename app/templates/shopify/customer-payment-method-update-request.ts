import { BodyWrapper } from '~/components/BodyWrapper';
import { Button } from '~/components/Button';
import { Description } from '~/components/Description';
import { Footer } from '~/components/shopify/Footer';
import { Head } from '~/components/Head';
import { Header } from '~/components/shopify/Header';
import { Intro } from '~/components/shopify/Intro';

export default function () {
  return /*html*/ `
	{% capture email_title %}Update your payment method for {{ shop.name }}{% endcapture %}
	{% capture email_greeting %}{% if customer.first_name %}Hi {{ customer.first_name }},<br />{% endif %}{% endcapture %}
	{% capture email_body %}
	The payment method saved to your account needs updating. Use the secure link below to check details or add a new card.
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
        description: /*html*/ `{{ email_greeting }}{{ email_body }}`,
      })}

			${Button({ url: '{{ email_confirmation_url }}', label: 'Confirm payment information', paddingTop: 0 })}

			${Footer()}
	`,
	previewText: "Takes a minute, using the secure link inside.",
  })}
`;
}
