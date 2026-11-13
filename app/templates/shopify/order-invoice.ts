import { BodyWrapper } from '~/components/BodyWrapper';
import { CustomerInfo } from '~/components/shopify/CustomerInfo';
import { Footer } from '~/components/shopify/Footer';
import { Head } from '~/components/Head';
import { Header } from '~/components/shopify/Header';
import { Intro } from '~/components/shopify/Intro';
import { ORDER_NUMBER } from '~/components/shopify/orderNumber';
import { OrderTable } from '~/components/shopify/OrderTable';
import { Total } from '~/components/shopify/Total';

export default function () {
  return /*html*/ `
	${Head({ title: 'Invoice' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: 'Invoice',
        // The payment-due line moved out of the heading and into the body, so
        // the order number has a sentence to sit in rather than a row of its own.
        description: /*html*/ `{% if payment_terms.type == 'receipt' and payment_terms.next_payment.due_at == nil %}
				{% assign due_date = 'now' %}
				{% else %}
					{% assign due_date = payment_terms.next_payment.due_at | default: nil %}
				{% endif %}
				{% if total_outstanding %}
					{% assign outstanding_amount = total_outstanding %}
				{% else %}
					{% assign outstanding_amount = order.total_outstanding %}
				{% endif %}
				{% if payment_terms.type == 'fulfillment' and payment_terms.next_payment.due_at == nil %}
					Payment of {{ outstanding_amount | money_without_trailing_zeros }} for order ${ORDER_NUMBER} is due on fulfillment.
				{% else %}
					Payment of {{ outstanding_amount | money_without_trailing_zeros }} for order ${ORDER_NUMBER} is due {{ due_date | date: format: 'date' }}.
				{% endif %}
				{% if custom_message != blank %}
					<div style="padding-top: 12px;">{{ custom_message }}</div>
				{% endif %}`,
        showPendingPayment: true,
      })}

			${OrderTable({ heading: 'Order summary', gapBottom: 24 })}

			${Total()}

			${CustomerInfo()}

			${Footer()}
	`,
	previewText: "Your invoice is ready to be downloaded",
  })}
`;
}
