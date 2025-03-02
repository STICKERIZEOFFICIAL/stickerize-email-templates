import { BodyWrapper } from '~/components/BodyWrapper';
import { Button } from '~/components/Button';
import { Description } from '~/components/Description';
import { Footer } from '~/components/shopify/Footer';
import { Head } from '~/components/Head';
import { Header } from '~/components/shopify/Header';
import { Intro } from '~/components/shopify/Intro';

export default function () {
  return /*html*/ `
	{% capture email_title %} There’s an issue with your payment {% endcapture %}
	{% capture email_body %}
	We couldn’t process your payment for your custom sticker order. Please double-check your payment details or try again with a different method. <br /><br />Need assistance? We’re here to help.
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

			{% if url %}
				${Button({ url: 'https://stickerize.com/account', label: 'Go to my account', paddingTop: 0 })}
			{% endif %}

			${Footer()}
	`,
	previewText: "We couldn’t process your payment for your custom sticker order.",
  })}
`;
}
