import { BodyWrapper } from '~/components/BodyWrapper';
import { Button } from '~/components/Button';
import { Description } from '~/components/Description';
import { Footer } from '~/components/shopify/Footer';
import { Head } from '~/components/Head';
import { Header } from '~/components/shopify/Header';
import { Intro } from '~/components/shopify/Intro';
import { OrderTable } from '~/components/shopify/OrderTable';

export default function () {
  return /*html*/ `
	{%- assign email_title = 'Your return was approved' -%}
	{%- assign return_delivery_first = return.deliveries | first -%}
	{%- assign public_file_url = return_delivery_first.return_label.public_file_url -%}
	{%- assign has_label_attached = public_file_url != blank and public_file_url.size > 0 -%}
	{%- assign has_tracking_number = return_delivery_first.tracking_number -%}
	{% if order.customer_order_url %}
		{%- assign order_details_url = order.customer_order_url -%}
	{% else %}
		{%- assign order_details_url = order.order_status_url -%}
	{% endif %}

	${Head({ title: '{{ email_title }}' })}
	${BodyWrapper({
    children: /*html*/ `
			${Header()}

			${Intro({
        heading: `{{ email_title }}`,
        description: `We sent you a return shipping label, or you will receive one soon. Once you receive your return shipping label, follow the instructions to complete your return.<br />`,
        showOrderNumber: true,
      })}

			${OrderTable({ heading: 'Return summary' })}

			${Description({
        description: /*html*/ `Instructions
				<ol>
					<li>Pack the items you're returning.</li>
					<li>Print your return label and attach it to the package. Cover or remove any old shipping labels.</li>
					<li>
						{% if return_delivery_first.carrier_name %}
							Give the package to {{ return_delivery_first.carrier_name }}.
						{% else %}
							Give the package to the carrier identified on the label.
						{% endif %}
					</li>
					{% if has_tracking_number %}
						<li>Track your return to make sure we get it.</li>
					{% endif %}
				</ol>
				{% if has_tracking_number %}
						{% if return_delivery_first.carrier_name %}
								{{ return_delivery_first.carrier_name }} tracking number: <a target="_blank" href="{{ return_delivery_first.tracking_url }}">{{ return_delivery_first.tracking_number }}</a>
						{% else %}
								%Tracking number: <a target="_blank" href="{{ return_delivery_first.tracking_url }}">{{ return_delivery_first.tracking_number }}</a>
						{% endif %}
				{% endif %}`,
      })}

			${Button({ url: '{{ order_details_url }}', label: 'View your order', paddingTop: 0 })}

			${Footer()}
	`,
	previewText: "",
  })}
`;
}
