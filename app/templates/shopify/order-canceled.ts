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
	{% comment %}The heading drops the order number: the body copy below names it
	   once, in bold. The subject line keeps it — it lives in the admin, not
	   here.{% endcomment %}
	{% capture email_title %}Your order has been canceled{% endcapture %}
	{% capture email_body %}
		{% if financial_status == 'voided' %}
			{% case cancel_reason %}
			{% when 'customer' %}
			Order ${ORDER_NUMBER} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'inventory' %}
			Order ${ORDER_NUMBER} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'fraud' %}
			Order ${ORDER_NUMBER} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'declined' %}
			Order ${ORDER_NUMBER} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'staff' %}
			Order ${ORDER_NUMBER} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'other' %}
			Order ${ORDER_NUMBER} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% endcase %}
		{% elsif financial_status == 'refunded' %}
			{% case cancel_reason %}
			{% when 'customer' %}
			Order ${ORDER_NUMBER} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'inventory' %}
			Order ${ORDER_NUMBER} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'fraud' %}
				The order was canceled because of unforeseen circumstances and your payment has been refunded.
			{% when 'declined' %}
			Order ${ORDER_NUMBER} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'staff' %}
			Order ${ORDER_NUMBER} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'other' %}
				Order ${ORDER_NUMBER} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% endcase %}
		{% elsif financial_status == 'paid' %}
			{% case cancel_reason %}
			{% when 'customer' %}
			Order ${ORDER_NUMBER} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'inventory' %}
			Order ${ORDER_NUMBER} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'fraud' %}
			Order ${ORDER_NUMBER} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'declined' %}
			Order ${ORDER_NUMBER} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'staff' %}
			Order ${ORDER_NUMBER} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'other' %}
			Order ${ORDER_NUMBER} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% endcase %}
		{% endif %}
	{% endcapture %}

	${Head({ title: '{{ email_title }}' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: `{{ email_title }}`,
        description: '{{ email_body }}',
        showPendingPayment: true,
        showImage: false,
      })}

			${OrderTable({ heading: 'Removed items', gapBottom: 24 })}

			${Total()}

			${CustomerInfo()}

			${Footer()}
	`,
	previewText: "Order {{ name }} has been canceled and payment refunded.",
  })}
`;
}
