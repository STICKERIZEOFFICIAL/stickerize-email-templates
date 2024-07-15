import { BodyWrapper } from '~/components/BodyWrapper';
import { Button } from '~/components/Button';
import { Description } from '~/components/Description';
import { Footer } from '~/components/shopify/Footer';
import { Head } from '~/components/Head';
import { Header } from '~/components/shopify/Header';
import { Intro } from '~/components/shopify/Intro';

export default function () {
  return /*html*/ `
	{% capture email_title %}Thank you{% endcapture %}
	{% capture email_body %}arrowroot powder neutralizes unpleasant Odours while letting your body breathe and release toxins.{% endcapture %}

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
  })}
`;
}
