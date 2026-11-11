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
	{% capture email_greeting %}Hi {{display_name}},{% endcapture %}
	{% capture email_body %}
	For a smoother experience, we need you to update your payment method. Click the link below to update securely, and we’ll ensure there are no disruptions to your orders.
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
        description: /*html*/ `{{ email_greeting }}<br />
				{{email_body}}`,
      })}

			${Button({ url: '{{ email_confirmation_url }}', label: 'Confirm payment information', paddingTop: 0 })}

			${Footer()}
	`,
	previewText: "Click the link inside email to update payment method securely, and we’ll ensure there are no disruptions to your orders.",
  })}
`;
}
