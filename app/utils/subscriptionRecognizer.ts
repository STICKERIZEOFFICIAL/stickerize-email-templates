interface recognizerData {
    subscription: string;
    oneTime: string;
}

export function subRecognizer(data: recognizerData) {
    const textRecognizer = `
	{% assign has_subscription = false %}

	{% for line_item in order.line_items %}
	  {% assign price = line_item.price | times: 1.0 %}
	  {% assign variant_price = line_item.variant.price | times: 1.0 %}
	  
	  {% if price != variant_price %}
		{% assign has_subscription = true %}
		{% break %}
	  {% endif %}
	{% endfor %}
	
	{% if has_subscription %}
	  {{ ${data.subscription} | raw }}
	{% else %}
	  {{ ${data.oneTime} | raw }}
	{% endif %}
	  `;
    return textRecognizer
}