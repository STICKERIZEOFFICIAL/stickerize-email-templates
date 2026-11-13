import { BodyWrapper } from '~/components/BodyWrapper';
import { Button } from '~/components/Button';
import { Description } from '~/components/Description';
import { Footer } from '~/components/shopify/Footer';
import { Head } from '~/components/Head';
import { Header } from '~/components/shopify/Header';
import { Intro } from '~/components/shopify/Intro';
import { ORDER_NUMBER } from '~/components/shopify/orderNumber';

export default function () {
  return /*html*/ `
	{% capture email_title %}Your return label is ready{% endcapture %}

	${Head({ title: '{{ email_title }}' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: `{{ email_title }}`,
        description: `The return label for order ${ORDER_NUMBER} is ready. Here's what to do with it.`,
        showPendingPayment: true,
      })}

			${Description({
        description: /*html*/ `Instructions
				<ol>
					<li>Pack the items you're returning.</li>
					<li>Print your return label and attach it to the package. Cover any existing shipping labels.</li>
					<li>Give the package to the carrier identified on the label.</li>
				</ol>`,
      })}

			${Button({ url: '{{ return_label.public_file_url }}', label: 'Print return label', paddingTop: 0 })}

			${Footer()}
	`,
	previewText: "",
  })}
`;
}
