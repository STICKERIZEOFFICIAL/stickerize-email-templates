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
	${Head({ title: 'Invoice' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: /*html*/ `{% if payment_terms.type == 'receipt' and payment_terms.next_payment.due_at == nil %}
				{% assign due_date = 'now' %}
				{% else %}
					{% assign due_date = payment_terms.next_payment.due_at | default: nil %}
				{% endif %}
				{% if payment_terms.type == 'fulfillment' and payment_terms.next_payment.due_at == nil %}
					Payment of {{ order.total_outstanding | money_without_trailing_zeros }} is due on fulfillment
				{% else %}
					Payment of {{ order.total_outstanding | money_without_trailing_zeros }} is due {{ due_date | date: format: 'date' }}
				{% endif %}
				{% if custom_message != blank %}
					{{ custom_message }}
				{% endif %}`,
        description: null,
        showOrderNumber: true,
      })}

			${OrderTable({ heading: 'Order summary' })}

			${Total()}

			${CustomerInfo()}

			${Footer()}
	`,
	previewText: "Your invoice is ready to be downloaded",
  })}
`;
}
