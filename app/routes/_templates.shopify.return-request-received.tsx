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
	{% capture email_title %}Your return request was sent{% endcapture %}
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
        description: `Your return request was sent and is being reviewed. We'll email you once it's been completed.<br />`,
        showOrderNumber: true,
      })}

			${OrderTable({ heading: 'Return summary' })}

			${Button({ url: '{{ order_details_url }}', label: 'View your order', paddingTop: 0 })}

			${Footer()}
	`,
  })}
`;
}
