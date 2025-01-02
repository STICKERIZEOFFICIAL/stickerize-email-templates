export function Total({ showRefund }: { showRefund?: boolean } = {}) {
  return /*html*/ `
  <!-- Total -->
  <tr>
    <td style="padding: 0 16px 30px; font-size: 0pt; line-height: 0pt;">
    {% assign order_discount_count = 0 %}
    {% assign total_order_discount_amount = 0 %}
    {% assign has_shipping_discount = false %}
    {% assign epsilon = 0.00001 %}

    {% for discount_application in discount_applications %}
      {% if discount_application.target_selection == 'all' and discount_application.target_type == 'line_item' %}
        {% assign order_discount_count = order_discount_count | plus: 1 %}
        {% assign total_order_discount_amount = total_order_discount_amount | plus: discount_application.total_allocated_amount  %}
      {% endif %}
      {% if discount_application.target_type == 'shipping_line' %}
        {% assign has_shipping_discount = true %}
        {% assign shipping_discount = discount_application.title %}
        {% assign shipping_amount = discount_application.total_allocated_amount %}
      {% endif %}
    {% endfor %}
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        {% if delivery_method == 'pick-up' %}
        <tr>
          <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'letter-gothic-std', 'Courier New', monospace; text-align:left; font-size: 15px; line-height: 18px; padding-bottom: 4px;">
            pickup
          </td>
          <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'letter-gothic-std', 'Courier New', monospace; font-size: 15px; line-height: 18px; text-align:right; padding-bottom: 4px;">
            {{ shipping_price | money_without_trailing_zeros }}
          </td>
        </tr>
        {% else %}
        {% if has_shipping_discount %}
        <tr>
          <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'letter-gothic-std', 'Courier New', monospace; text-align:left; font-size: 15px; line-height: 18px; padding-bottom: 4px;">
            shipping
          </td>
          <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'letter-gothic-std', 'Courier New', monospace; font-size: 15px; line-height: 18px; text-align:right; padding-bottom: 4px;">
            free
          </td>
        </tr>
        {% else %}
        <tr>
          <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'letter-gothic-std', 'Courier New', monospace; text-align:left; font-size: 15px; line-height: 18px; padding-bottom: 4px;">
            shipping
          </td>
          <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'letter-gothic-std', 'Courier New', monospace; font-size: 15px; line-height: 18px; text-align:right; padding-bottom: 4px;">
          {% if shipping_price | floor == 0 %}
            free
          {% else %}
            {{ shipping_price | money_without_trailing_zeros }}
          {% endif %}
          </td>
        </tr>
        {% endif %}
        {% endif %}

        {% assign transaction_size = 0 %}
        {% assign transaction_amount = 0 %}
        {% for transaction in transactions %}
          {% if transaction.status == "success" %}
          {% unless transaction.kind == "authorization" or transaction.kind == "void" %}
            {% assign transaction_size = transaction_size | plus: 1 %}
            {% assign transaction_amount = transaction_amount | plus: transaction.amount %}
          {% endunless %}
          {% endif %}
        {% endfor %}

        {% if payment_terms and payment_terms.automatic_capture_at_fulfillment == false or b2b?%}
          {% assign due_at_date = payment_terms.next_payment.due_at | date: "%b %d, %Y" %}
        <tr>
          <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'letter-gothic-std', 'Courier New', monospace; text-align:left; font-size: 15px; line-height: 18px; padding-bottom: 4px;">
            today’s total (vat incl.)
          </td>
          <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'letter-gothic-std', 'Courier New', monospace; font-size: 15px; line-height: 18px; text-align:right; padding-bottom: 4px;">
            {{ transaction_amount | money_without_trailing_zeros }}
          </td>
        </tr>
        <tr>
          <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'letter-gothic-std', 'Courier New', monospace; text-align:left; font-size: 15px; line-height: 18px; padding-bottom: 4px;">
            total due {{ due_at_date }}
          </td>
          <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'letter-gothic-std', 'Courier New', monospace; font-size: 15px; line-height: 18px; text-align:right; padding-bottom: 4px;">
            {{ payment_terms.next_payment.amount_due | money_without_trailing_zeros }}
          </td>
        </tr>
        {% else %}
        <tr>
          <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'letter-gothic-std', 'Courier New', monospace; text-align:left; font-size: 15px; line-height: 18px; padding-bottom: 4px;">
            today’s total (vat incl.)
          </td>
          <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'letter-gothic-std', 'Courier New', monospace; font-size: 15px; line-height: 18px; text-align:right; padding-bottom: 4px;">
            {{ total_price | money_without_trailing_zeros }}
          </td>
        </tr>
        {% endif %}

        ${
          showRefund
            ? /*html*/ `{% unless payment_terms %}
        {% if transaction_size > 1 or transaction_amount < total_price %} 
        <tr>
          <td style="padding-top: 16px;"></td>
          <td style="padding-top: 16px;"></td>
        </tr>
        <tr>
            <td style="border-top: 2px solid #dedede; padding-bottom: 16px;"></td>
            <td style="border-top: 2px solid #dedede; padding-bottom: 16px;"></td>
        </tr>
        
          {% for transaction in transactions %}
          {% if transaction.status == "success" and transaction.kind == "capture" or transaction.kind == "sale"
          %}
          {% if transaction.payment_details.gift_card_last_four_digits %}
          {% capture transaction_name %}Gift card (ending with {{
          transaction.payment_details.gift_card_last_four_digits }}){% endcapture %}
          {% elsif transaction.payment_details.credit_card_company %}
          {% capture transaction_name %}{{ transaction.payment_details.credit_card_company }} (ending in {{
          transaction.payment_details.credit_card_last_four_digits }}){% endcapture %}
          {% else %}
          {% capture transaction_name %}{{ transaction.gateway_display_name }}{% endcapture %}
          {% endif %}
        
          <tr>
            <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'letter-gothic-std', 'Courier New', monospace; text-align:left; font-size: 15px; line-height: 18px; padding-bottom: 4px;">
              {{transaction_name | downcase}}
            </td>
            <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'letter-gothic-std', 'Courier New', monospace; font-size: 15px; line-height: 18px; text-align:right; padding-bottom: 4px;">
              {{ transaction.amount | money_without_trailing_zeros }}
            </td>
          </tr>
        
          {% endif %}
          {% if transaction.kind == 'refund' %}
          {% if transaction.payment_details.gift_card_last_four_digits %}
          {% assign refund_method_title = transaction.payment_details.type %}
          {% elsif transaction.payment_details.credit_card_company %}
          {% assign refund_method_title = transaction.payment_details.credit_card_company %}
          {% else %}
          {% assign refund_method_title = transaction.gateway %}
          {% endif %}
          <tr>
            <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'letter-gothic-std', 'Courier New', monospace; text-align:left; font-size: 15px; line-height: 18px; padding-bottom: 4px;">
              refund
              <br>
              <small>{{ refund_method_title | replace: '_', ' ' | downcase }}</small>
            </td>
            <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'letter-gothic-std', 'Courier New', monospace; font-size: 15px; line-height: 18px; text-align:right; padding-bottom: 4px;">
              - {{ transaction.amount | money_without_trailing_zeros }}
            </td>
          </tr>
          {% endif %}
          {% endfor %}
          {% endif %}
          {% endunless %}`
            : ""
        }
      </table>
    </td>
  </tr>
  <!-- END Total -->`;
}
