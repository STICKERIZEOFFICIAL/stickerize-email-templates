import { BodyWrapper } from '~/components/BodyWrapper';
import { Button } from '~/components/Button';
import { Footer } from '~/components/shopify/Footer';
import { Head } from '~/components/Head';
import { Header } from '~/components/shopify/Header';
import { Intro } from '~/components/shopify/Intro';
import { OrderTable } from '~/components/shopify/OrderTable';

export default function () {
  return /*html*/ `
	{%- assign email_title = 'Your return request was declined' -%}
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
        description: `{% if return.decline["note"] != blank %}
				{{ return.decline["note"] }}<br />
			{% endif %}`,
        showOrderNumber: true,
      })}

			${OrderTable({ heading: 'Return summary' })}

			${Button({ url: '{{ order_details_url }}', label: 'View your order' })}

			${Footer()}
	`,
	previewText: "",
  })}
`;
}
