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
			We’re sorry to see your order go. Your custom sticker order has been canceled, and any applicable payments will be refunded promptly. If you didn’t mean to cancel or have any questions, please don’t hesitate to contact us.
			{% when 'inventory' %}
			We’re sorry to see your order go. Your custom sticker order has been canceled, and any applicable payments will be refunded promptly. If you didn’t mean to cancel or have any questions, please don’t hesitate to contact us.
			{% when 'fraud' %}
			We’re sorry to see your order go. Your custom sticker order has been canceled, and any applicable payments will be refunded promptly. If you didn’t mean to cancel or have any questions, please don’t hesitate to contact us.
			{% when 'declined' %}
			We’re sorry to see your order go. Your custom sticker order has been canceled, and any applicable payments will be refunded promptly. If you didn’t mean to cancel or have any questions, please don’t hesitate to contact us.
			{% when 'staff' %}
			We’re sorry to see your order go. Your custom sticker order has been canceled, and any applicable payments will be refunded promptly. If you didn’t mean to cancel or have any questions, please don’t hesitate to contact us.
			{% when 'other' %}
			We’re sorry to see your order go. Your custom sticker order has been canceled, and any applicable payments will be refunded promptly. If you didn’t mean to cancel or have any questions, please don’t hesitate to contact us.
			{% endcase %}
		{% elsif financial_status == 'refunded' %}
			{% case cancel_reason %}
			{% when 'customer' %}
			We’re sorry to see your order go. Your custom sticker order has been canceled, and any applicable payments were refunded promptly. If you didn’t mean to cancel or have any questions, please don’t hesitate to contact us.
			{% when 'inventory' %}
			We’re sorry to see your order go. Your custom sticker order has been canceled, and any applicable payments were refunded promptly. If you didn’t mean to cancel or have any questions, please don’t hesitate to contact us.
			{% when 'fraud' %}
				The order was canceled because of unforeseen circumstances and your payment has been refunded.
			{% when 'declined' %}
			We’re sorry to see your order go. Your custom sticker order has been canceled, and any applicable payments were refunded promptly. If you didn’t mean to cancel or have any questions, please don’t hesitate to contact us.
			{% when 'staff' %}
			We’re sorry to see your order go. Your custom sticker order has been canceled, and any applicable payments were refunded promptly. If you didn’t mean to cancel or have any questions, please don’t hesitate to contact us.
			{% when 'other' %}
				TWe’re sorry to see your order go. Your custom sticker order has been canceled, and any applicable payments were refunded promptly. If you didn’t mean to cancel or have any questions, please don’t hesitate to contact us.
			{% endcase %}
		{% elsif financial_status == 'paid' %}
			{% case cancel_reason %}
			{% when 'customer' %}
			We’re sorry to see your order go. Your custom sticker order has been canceled, and any applicable payments will be refunded promptly. If you didn’t mean to cancel or have any questions, please don’t hesitate to contact us.
			{% when 'inventory' %}
			We’re sorry to see your order go. Your custom sticker order has been canceled, and any applicable payments will be refunded promptly. If you didn’t mean to cancel or have any questions, please don’t hesitate to contact us.
			{% when 'fraud' %}
			We’re sorry to see your order go. Your custom sticker order has been canceled, and any applicable payments will be refunded promptly. If you didn’t mean to cancel or have any questions, please don’t hesitate to contact us.
			{% when 'declined' %}
			We’re sorry to see your order go. Your custom sticker order has been canceled, and any applicable payments will be refunded promptly. If you didn’t mean to cancel or have any questions, please don’t hesitate to contact us.
			{% when 'staff' %}
			We’re sorry to see your order go. Your custom sticker order has been canceled, and any applicable payments will be refunded promptly. If you didn’t mean to cancel or have any questions, please don’t hesitate to contact us.
			{% when 'other' %}
			We’re sorry to see your order go. Your custom sticker order has been canceled, and any applicable payments will be refunded promptly. If you didn’t mean to cancel or have any questions, please don’t hesitate to contact us.
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
	previewText: "Your custom sticker order has been canceled, and any applicable payments will be refunded promptly.",
  })}
`;
}
