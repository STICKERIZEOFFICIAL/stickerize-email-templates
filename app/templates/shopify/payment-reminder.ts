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
		{% if payment_schedule.overdue? and payment_schedule.number_of_days_overdue == 0 %}
		{% capture email_title %}Payment reminder{% endcapture %}
		{% elsif payment_schedule.due_later? and payment_schedule.due_in_days == 0 %}
		{% capture email_title %}Payment reminder{% endcapture %}
		{% elsif payment_schedule.overdue? and payment_schedule.number_of_days_overdue == 1 %}
		{% capture email_title %}Payment reminder{% endcapture %}
		{% elsif payment_schedule.due_later? and payment_schedule.due_in_days == 1 %}
		{% capture email_title %}Payment reminder{% endcapture %}
		{% elsif payment_schedule.due_later? and payment_schedule.due_in_days > 1 %}
		{% capture email_title %}Payment reminder{% endcapture %}
		{% else %}
		{% capture email_title %}Your payment is {{ payment_schedule.number_of_days_overdue }} days overdue{% endcapture %}
		{% endif %}

	${Head({ title: '{{ email_title }}' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: `{{ email_title }}`,
        description: null,
        showPendingPayment: false,
        showImage: false,
      })}

			${Description({
        description: /*html*/ `
				{% if custom_message != blank %}
					{{ custom_message }}
				{% else %}
					{% if payment_schedule.overdue? and payment_schedule.number_of_days_overdue == 0 %}
					Friendly reminder: payment of {{ payment_schedule.amount_due |
						money_with_currency }} for order ${ORDER_NUMBER} is due today. Pay securely using the button below. Already paid? Thank you, and please ignore this email. Questions about the invoice? Just reply.
					{% elsif payment_schedule.due_later? %}
					Friendly reminder: payment of {{ payment_schedule.amount_due | money_with_currency }}
						for order ${ORDER_NUMBER} is due on {{ payment_schedule.due_at | date: '%B %e, %Y' }}. Pay securely using the button below. Already paid? Thank you, and please ignore this email. Questions about the invoice? Just reply.
					{% else %}
					Friendly reminder: payment of {{ payment_schedule.amount_due | money_with_currency }}
						for order ${ORDER_NUMBER} was due on {{ payment_schedule.due_at | date: '%B %e, %Y' }}. Pay securely using the button below. Already paid? Thank you, and please ignore this email. Questions about the invoice? Just reply.
					{% endif %}
				{% endif %}`,
      })}

			{% if checkout_payment_collection_url %}
				${Button({ url: '{{ checkout_payment_collection_url }}', label: 'Pay now', paddingTop: 0 })}
			{% endif %}

			${Footer()}
	`,
	previewText: "Quick reminder that payment for your order is due.",
  })}
`;
}
