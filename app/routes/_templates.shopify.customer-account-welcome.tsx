import { BodyWrapper } from '~/components/BodyWrapper';
import { Button } from '~/components/Button';
import { Description } from '~/components/Description';
import { Footer } from '~/components/shopify/Footer';
import { Head } from '~/components/Head';
import { Header } from '~/components/shopify/Header';
import { Intro } from '~/components/shopify/Intro';

export default function () {
  return /*html*/ `
	{% capture email_title %}Welcome to {{ shop.name }}!{% endcapture %}
	{% capture email_body %}We’re thrilled to have you on board. Your account is all set up, giving you access to exclusive features, faster checkouts, and more. Let’s start creating amazing custom stickers together.{% endcapture %}

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

			{% if shop.url  %}
				${Button({ url: '{{ shop.url }}', label: 'Visit our store', paddingTop: 0 })}
			{% endif %}

			${Footer()}
	`,
	previewText: "Get ready to create high-quality custom stickers with ease. Let’s make something awesome together.",
  })}
`;
}
