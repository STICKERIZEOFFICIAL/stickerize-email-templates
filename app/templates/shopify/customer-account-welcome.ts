import { BodyWrapper } from '~/components/BodyWrapper';
import { Button } from '~/components/Button';
import { Footer } from '~/components/shopify/Footer';
import { Head } from '~/components/Head';
import { Header } from '~/components/shopify/Header';
import { Intro } from '~/components/shopify/Intro';

export default function () {
  return /*html*/ `
	{% capture email_title %}Welcome to {{ shop.name }}!{% endcapture %}
	{% capture email_body %}Your account has been set up. Log in next time to check out faster, keep track of orders and apply earned store credit in the cart.{% endcapture %}

	${Head({ title: '{{ email_title }}' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        // The copy moves into Intro so the images land after it: the brief's
        // order is logo → heading → introductory paragraph → image. Supplied
        // through Description, the body rendered *below* the photos.
        heading: `{{ email_title }}`,
        description: /*html*/ `
				{% if custom_message != blank %}
					{{ custom_message }}
				{% else %}
					{{ email_body }}
				{% endif %}
				`,
        showPendingPayment: false,
        showImage: true,
      })}

			{% if shop.url  %}
				${Button({ url: '{{ shop.url }}', label: 'Visit our store', paddingTop: 0 })}
			{% endif %}

			${Footer()}
	`,
	previewText: "Your account is live.",
  })}
`;
}
