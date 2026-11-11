import { BodyWrapper } from '~/components/BodyWrapper';
import { Button } from '~/components/Button';
import { Footer } from '~/components/shopify/Footer';
import { Head } from '~/components/Head';
import { Header } from '~/components/shopify/Header';
import { Intro } from '~/components/shopify/Intro';

export default function () {
  return /*html*/ `
	${Head({ title: 'Payment received. Designs are next.' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: `Payment received. Designs are next.`,
        description: /*html*/ `Thanks, we've received the payment for order {{ order_number }}. Designs are lined up for print and we'll send an email as soon as they ship.`,
        showOrderNumber: true,
        showImage: false,
      })}

			<tr>
				<td
					style="color:#000001; font-family:'letter-gothic-std', 'Courier New', monospace; text-align:left; font-size: 15px; line-height: 18px; padding-bottom: 8px; padding-left: 16px; padding-right: 16px;">
					Customer information
				</td>
			</tr>

			<tr>
				<td>
					<table width="100%" border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td
								style="color:#000001; font-family:'letter-gothic-std', 'Courier New', monospace; text-align:left; font-size: 15px; line-height: 18px; padding-bottom: 8px; padding-left: 16px; padding-right: 16px;">
								Billing Address<br />
								{{ billing_address | format_address }}
							</td>

							{% assign transaction_count = transactions | size %}
							{% if transaction_count > 0 %}
							<td valign="top"
								style="color:#000001; font-family:'letter-gothic-std', 'Courier New', monospace; text-align:left; font-size: 15px; line-height: 18px; padding-bottom: 8px; padding-left: 16px; padding-right: 16px;">
								Payment<br />
								{% for transaction in transactions %}
								{% if transaction.id == transaction_id %}
								{% if transaction.status == "success" or transaction.status == "pending" %}
								{% if transaction.kind == "capture" or transaction.kind == "sale" %}
								{% if transaction.payment_details.credit_card_company %}
								<p>
									<img
										src="{{ transaction.payment_details.credit_card_company | downcase | replace: ' ', '-'  | payment_type_img_url }}"
										height="24" style="vertical-align: middle;">
									<span>ending with {{ transaction.payment_details.credit_card_last_four_digits }}
										&mdash; <strong>{{ transaction.amount | money_without_trailing_zeros }}</strong></span>
								</p>
								{% else %}
								<p>
									{{ transaction.gateway_display_name }} &mdash; <strong>{{ transaction.amount |
										money }}</strong>
								</p>
								{% endif %}
								{% endif %}
								{% endif %}
								{% endif %}
								{% endfor %}
							</td>
							{% endif %}
						</tr>
					</table>
				</td>
			</tr>

			<tr>
				{% if company_location %}
				<td>
					<table width="100%" border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td
								style="color:#000001; font-family:'letter-gothic-std', 'Courier New', monospace; text-align:left; font-size: 15px; line-height: 18px; padding-bottom: 8px; padding-left: 16px; padding-right: 16px;">
								Location<br />
								<p>{{ company_location.name }}</p>
							</td>
						</tr>
					</table>
				</td>
				{% endif %}
			</tr>

			{% if order_status_url %}
				${Button({url: '{{ order_status_url }}', label: 'View your order'})}
			{% endif %}

			${Footer()}
	`,
	previewText: "Designs are lined up for print.",
  })}
`;
}
