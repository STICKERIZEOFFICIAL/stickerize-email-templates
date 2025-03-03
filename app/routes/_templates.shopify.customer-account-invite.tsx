import { BodyWrapper } from '~/components/BodyWrapper';
import { Button } from '~/components/Button';
import { Description } from '~/components/Description';
import { Footer } from '~/components/shopify/Footer';
import { Head } from '~/components/Head';
import { Header } from '~/components/shopify/Header';
import { Intro } from '~/components/shopify/Intro';

export default function () {
  return /*html*/ `
	{% capture email_title %}Confirm your Stickerize account{% endcapture %}
	{% capture email_body %}Join the STICKERIZE© family. Set up your account to easily track orders, save designs, and enjoy exclusive perks. Click below to get started — it only takes a minute!{% endcapture %}

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
        description: /*html*/ `
				{% if custom_message != blank %}
					{{ custom_message }}
				{% else %}
					{{ email_body }}
				{% endif %}
				`,
      })}

			{% if customer.account_activation_url %}
				${Button({ url: '{{ customer.account_activation_url }}', label: 'Activate your account', paddingTop: 0 })}
			{% endif %}

			${Footer({ showLoginSection: false })}
	`,
	previewText: "Confirm your Stickerize account",
  })}
`;
}
