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
	{% capture email_title %}Order {{ name }} has been canceled{% endcapture %}
	{% capture email_body %}
		{% if financial_status == 'voided' %}
			{% case cancel_reason %}
			{% when 'customer' %}
			Order {{ name }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'inventory' %}
			Order {{ name }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'fraud' %}
			Order {{ name }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'declined' %}
			Order {{ name }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'staff' %}
			Order {{ name }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'other' %}
			Order {{ name }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% endcase %}
		{% elsif financial_status == 'refunded' %}
			{% case cancel_reason %}
			{% when 'customer' %}
			Order {{ name }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'inventory' %}
			Order {{ name }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'fraud' %}
				The order was canceled because of unforeseen circumstances and your payment has been refunded.
			{% when 'declined' %}
			Order {{ name }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'staff' %}
			Order {{ name }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'other' %}
				Order {{ name }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% endcase %}
		{% elsif financial_status == 'paid' %}
			{% case cancel_reason %}
			{% when 'customer' %}
			Order {{ name }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'inventory' %}
			Order {{ name }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'fraud' %}
			Order {{ name }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'declined' %}
			Order {{ name }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'staff' %}
			Order {{ name }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
			{% when 'other' %}
			Order {{ name }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.
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
        showOrderNumber: true,
        showImage: false,
      })}

			${OrderTable({ heading: 'Removed items' })}

			${Total()}

			${CustomerInfo()}

			${Footer()}
	`,
	previewText: "Order {{ name }} has been canceled and payment refunded.",
  })}
`;
}
