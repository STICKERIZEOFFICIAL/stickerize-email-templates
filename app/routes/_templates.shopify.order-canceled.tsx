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
	{% capture email_title %}Your order has been canceled{% endcapture %}
	{% capture email_body %}
		{% if financial_status == 'voided' %}
			{% case cancel_reason %}
			{% when 'customer' %}
				The order was canceled at your request and your payment has been voided.
			{% when 'inventory' %}
				The order was canceled because we did not have enough stock to fulfill your order and your payment has been voided.
			{% when 'fraud' %}
				The order was canceled because of unforeseen circumstances and your payment has been voided.
			{% when 'declined' %}
			The order was canceled because your payment was declined.
			{% when 'staff' %}
			The order was canceled because of staff error and your payment has been voided.
			{% when 'other' %}
				The order was canceled because of unforeseen circumstances and your payment has been voided.
			{% endcase %}
		{% elsif financial_status == 'refunded' %}
			{% case cancel_reason %}
			{% when 'customer' %}
				The order was canceled at your request and your payment has been refunded.
			{% when 'inventory' %}
				The order was canceled because we did not have enough stock to fulfill your order and your payment has been refunded.
			{% when 'fraud' %}
				The order was canceled because of unforeseen circumstances and your payment has been refunded.
			{% when 'declined' %}
				The order was canceled because your payment was declined.
			{% when 'staff' %}
				The order was canceled because of staff error and your payment has been refunded.
			{% when 'other' %}
				The order was canceled because of unforeseen circumstances and your payment has been refunded.
			{% endcase %}
		{% elsif financial_status == 'paid' %}
			{% case cancel_reason %}
			{% when 'customer' %}
				The order was canceled at your request and your payment has not yet been refunded.
			{% when 'inventory' %}
				The order was canceled because we did not have enough stock to fulfill your order and your payment has not yet been refunded.
			{% when 'fraud' %}
				The order was canceled because of unforeseen circumstances and your payment has not yet been refunded.
			{% when 'declined' %}
				The order was canceled because your payment was declined.
			{% when 'staff' %}
				The order was canceled because of staff error and your payment has not yet been refunded.
			{% when 'other' %}
				The order was canceled because of unforeseen circumstances and your payment has not yet been refunded.
			{% endcase %}
		{% endif %}
	{% endcapture %}

	${Head({ title: '{{ email_title }}' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: `{{ email_title }}`,
        description: '{{ email_body }}<br />',
        showOrderNumber: true,
      })}

			${OrderTable({ heading: 'Removed Items' })}

			${Total()}

			${CustomerInfo()}

			${Footer()}
	`,
  })}
`;
}
