import { BodyWrapper } from '~/components/BodyWrapper';
import { Button } from '~/components/Button';
import { Description } from '~/components/Description';
import { Footer } from '~/components/shopify/Footer';
import { Head } from '~/components/Head';
import { Header } from '~/components/shopify/Header';
import { Intro } from '~/components/shopify/Intro';

export default function () {
  return /*html*/ `
		{% if payment_schedule.overdue? and payment_schedule.number_of_days_overdue == 0 %}
		{% capture email_title %}Don’t forget to complete your order{% endcapture %}
		{% elsif payment_schedule.due_later? and payment_schedule.due_in_days == 0 %}
		{% capture email_title %}Don’t forget to complete your order{% endcapture %}
		{% elsif payment_schedule.overdue? and payment_schedule.number_of_days_overdue == 1 %}
		{% capture email_title %}Don’t forget to complete your order{% endcapture %}
		{% elsif payment_schedule.due_later? and payment_schedule.due_in_days == 1 %}
		{% capture email_title %}Don’t forget to complete your order{% endcapture %}
		{% elsif payment_schedule.due_later? and payment_schedule.due_in_days > 1 %}
		{% capture email_title %}Don’t forget to complete your order.{% endcapture %}
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
        showOrderNumber: false,
      })}

			${Description({
        description: /*html*/ `
				{% if custom_message != blank %}
					{{ custom_message }}
				{% else %}
					{% if payment_schedule.overdue? and payment_schedule.number_of_days_overdue == 0 %}
					Your custom sticker order is waiting. To avoid any delays, please complete your payment. Once done, we’ll start crafting your stickers right away. Payment of {{ payment_schedule.amount_due |
						money_with_currency }} due today for order {{ name }}.
					{% elsif payment_schedule.due_later? %}
					Your custom sticker order is waiting. To avoid any delays, please complete your payment. Once done, we’ll start crafting your stickers right away. Payment of {{ payment_schedule.amount_due | money_with_currency }}
						for order {{ name }} is due on {{ payment_schedule.due_at | date: '%B %e, %Y' }}.
					{% else %}
					Your custom sticker order is waiting. To avoid any delays, please complete your payment. Once done, we’ll start crafting your stickers right away. Payment of {{ payment_schedule.amount_due | money_with_currency }}
						for order {{ name }} was due on {{ payment_schedule.due_at | date: '%B %e, %Y' }}.
					{% endif %}
					Thank you.
				{% endif %}`,
      })}

			{% if checkout_payment_collection_url %}
				${Button({ url: '{{ checkout_payment_collection_url }}', label: 'Pay now', paddingTop: 0 })}
			{% endif %}

			${Footer()}
	`,
	previewText: "Your custom stickers order is waiting.",
  })}
`;
}
