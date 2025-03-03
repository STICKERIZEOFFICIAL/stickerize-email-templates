import { BodyWrapper } from '~/components/BodyWrapper';
import { CustomerInfo } from '~/components/shopify/CustomerInfo';
import { Footer } from '~/components/shopify/Footer';
import { Head } from '~/components/Head';
import { Header } from '~/components/shopify/Header';
import { Intro } from '~/components/shopify/Intro';
import { OrderTable } from '~/components/shopify/OrderTable';
import { Total } from '~/components/shopify/Total';

export default function () {
  return /*html*/ `
	{% capture email_title %}Update on your stickers shipment{% endcapture %}
	{% capture email_body %}We’ve got an update on your custom sticker order. Your shipment is in transit and making its way to you.{% endcapture %}

	${Head({ title: '{{ email_title }}' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: `{{ email_title }}`,
        description: `{{email_body}}<br/>
				You can track your order here:<br/>`,
        showOrderNumber: false,
				showTrackingNumber: true,
      })}

			${OrderTable({ heading: 'Items in this shipment' })}

			${Total()}

			${CustomerInfo()}

			${Footer()}
	`,
	previewText: "We’ve got an update on your custom sticker order.",
  })}
`;
}
