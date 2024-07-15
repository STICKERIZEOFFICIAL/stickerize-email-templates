import { BodyWrapper } from '~/components/BodyWrapper';
import { CustomerInfo } from '~/components/shopify/CustomerInfo';
import { Footer } from '~/components/shopify/Footer';
import { Head } from '~/components/Head';
import { Header } from '~/components/shopify/Header';
import { Intro } from '~/components/shopify/Intro';
import { OrderTable } from '~/components/shopify/OrderTable';
import { Total } from '~/components/shopify/Total';
import { subRecognizer } from '~/utils/subscriptionRecognizer';
import { GoToAccount } from '~/components/shopify/GoToAccount';

export default function () {
	const headerVariables = {
		subscription: 'subscription_header',
		oneTime: 'one_time_header'
	}
	const descVariables = {
		subscription: 'subscription_description',
		oneTime: 'one_time_description'
	}

	const introHeader = subRecognizer(headerVariables)
	const introDesc = subRecognizer(descVariables)

  return /*html*/ `
	{% assign account_link = 'https://feelswoop.com/account/register' %}
	{% assign subscription_header = 'Subscription<br />' %}
	{% assign one_time_header = 'Thank You<br />' %}
	{% assign subscription_description = 'we’re working to get your subscription order out asap.<br /> you can track your order here:<br />' %}
	{% assign one_time_description = 'we’re working to get your order out asap.<br /> you can track your order here:<br />' %}


	
	${Head({ title: 'Thank you' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({ heading: `${introHeader}`, description: `${introDesc}`, showOrderNumber: true })}

			${OrderTable({ heading: 'Your order' })}

			${Total()}

			${CustomerInfo({ showEstimatedDelivery: true })}
			
			${GoToAccount()}

			${Footer()}
	`,
  })}
`;
}
