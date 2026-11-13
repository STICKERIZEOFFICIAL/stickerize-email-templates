import { BodyWrapper } from '~/components/BodyWrapper';
import { Button } from '~/components/Button';
import { Footer } from '~/components/shopify/Footer';
import { Head } from '~/components/Head';
import { Header } from '~/components/shopify/Header';
import { Intro } from '~/components/shopify/Intro';

export default function () {
  return /*html*/ `
	{% capture email_title %}One click and you're in{% endcapture %}
	{% capture email_body %}Confirm your subscription to be first to hear about new drops, creative inspo from our community and the occasional offer. Didn't sign up? Just ignore this email.{% endcapture %}

	${Head({ title: '{{ email_title }}' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        // The copy belongs in Intro so the images land after it, per the
        // brief's logo → heading → introductory paragraph → image order.
        // Supplied through a Description block below, the photos rendered
        // between the heading and its own body.
        heading: `{{ email_title }}`,
        description: /*html*/ `{{ email_body }}`,
        showPendingPayment: false,
        showImage: true,
      })}

			{% if shop.url  %}
				${Button({ url: '{{ shop.url }}', label: 'Subscribe', paddingTop: 0 })}
			{% endif %}

			${Footer( { showLoginSection: false })}
	`,
	previewText: "Confirm your subscription to join the Stickerize community.",
  })}
`;
}
