import { BodyWrapper } from '~/components/BodyWrapper';
import { Button } from '~/components/Button';
import { Description } from '~/components/Description';
import { Footer } from '~/components/shopify/Footer';
import { Head } from '~/components/Head';
import { Header } from '~/components/shopify/Header';
import { Intro } from '~/components/shopify/Intro';

export default function () {
  return /*html*/ `
	{% capture email_title %}Join our creative community!{% endcapture %}
	{% capture email_body %}You’re just one step ahead from exclusive offers, and inspiration from STICKERIZE©. You just need to confirm you want to receive marketing updates from us. </br> We’re excited to keep you in the loop as we create amazing custom stickers together. </br> If you didn’t subscribe, then you don’t need to do anything.{% endcapture %}

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
        description: /*html*/ `{{ email_body }}`,
      })}

			{% if shop.url  %}
				${Button({ url: '{{ shop.url }}', label: 'Subscribe', paddingTop: 0 })}
			{% endif %}

			${Footer()}
	`,
	previewText: "",
  })}
`;
}
