import { BodyWrapper } from '~/components/BodyWrapper';
import { Button } from '~/components/Button';
import { Footer } from '~/components/shopify/Footer';
import { Head } from '~/components/Head';
import { Header } from '~/components/shopify/Header';
import { Intro } from '~/components/shopify/Intro';
import { ORDER_NUMBER } from '~/components/shopify/orderNumber';
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
        // One block, with the optional note carrying its own 12px when it is
        // there — a second entry in the list would leave an empty paragraph,
        // and its gap, behind when it is not.
        description: /*html*/ `Your return request for order ${ORDER_NUMBER} was declined.
			{% if return.decline["note"] != blank %}
				<div style="padding-top: 12px;">{{ return.decline["note"] }}</div>
			{% endif %}`,
        showPendingPayment: true,
      })}

			${OrderTable({ heading: 'Return summary' })}

			${Button({ url: '{{ order_details_url }}', label: 'View your order' })}

			${Footer()}
	`,
	previewText: "",
  })}
`;
}
