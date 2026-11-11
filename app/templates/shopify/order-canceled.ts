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
	{% capture email_title %}Order {{ order_number }} has been canceled{% endcapture %}
	{% capture email_body %}
		{% if financial_status == 'voided' %}
			{% case cancel_reason %}
			{% when 'customer' %}
			Order {{ order_number }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'inventory' %}
			Order {{ order_number }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'fraud' %}
			Order {{ order_number }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'declined' %}
			Order {{ order_number }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'staff' %}
			Order {{ order_number }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'other' %}
			Order {{ order_number }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% endcase %}
		{% elsif financial_status == 'refunded' %}
			{% case cancel_reason %}
			{% when 'customer' %}
			Order {{ order_number }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'inventory' %}
			Order {{ order_number }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'fraud' %}
				The order was canceled because of unforeseen circumstances and your payment has been refunded.
			{% when 'declined' %}
			Order {{ order_number }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'staff' %}
			Order {{ order_number }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'other' %}
				Order {{ order_number }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% endcase %}
		{% elsif financial_status == 'paid' %}
			{% case cancel_reason %}
			{% when 'customer' %}
			Order {{ order_number }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'inventory' %}
			Order {{ order_number }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'fraud' %}
			Order {{ order_number }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'declined' %}
			Order {{ order_number }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'staff' %}
			Order {{ order_number }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'other' %}
			Order {{ order_number }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
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
        showImage: false,
      })}

			${OrderTable({ heading: 'Removed Items' })}

			${Total()}

			${CustomerInfo()}

			${Footer()}
	`,
	previewText: "Order {{ order_number }} has been canceled and payment refunded.",
  })}
`;
}
