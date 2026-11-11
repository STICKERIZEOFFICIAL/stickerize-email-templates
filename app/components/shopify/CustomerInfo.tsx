export function CustomerInfo({
  showEstimatedDelivery,
}: { showEstimatedDelivery?: boolean } = {}) {
  return /*html*/ `
  <!-- Customer info -->
  <tr>
    <td class="mpx-0" style="padding: 0 12px 24px;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#efeae4">
        <tr>
          <td style="padding: 16px 16px 0;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td class="mfz-14 mlh-17 mmfz-13" style="text-transform: uppercase; color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 15px; line-height: 18px; padding-bottom: 16px;" valign="top">
                  order number
                </td>
                <td class="mfz-14 mlh-17 mmfz-13" style="text-transform: lowercase; color:#000001; font-family:'Courier New', monospace; font-size: 15px; line-height: 18px; text-align:right; padding-bottom: 16px; padding-left: 10px;" valign="top">
                  {{ order_name }}
                </td>
              </tr>

              {%- if po_number %}
              <tr>
                <td class="mfz-14 mlh-17 mmfz-13" style="text-transform: uppercase; color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 15px; line-height: 18px; padding-bottom: 16px;" valign="top">
                  PO number
                </td>
                <td class="mfz-14 mlh-17 mmfz-13" style="text-transform: lowercase; color:#000001; font-family:'Courier New', monospace; font-size: 15px; line-height: 18px; text-align:right; padding-bottom: 16px; padding-left: 10px;" valign="top">
                  #{{ po_number }}
                </td>
              </tr>
              {%- endif %}

              ${
                showEstimatedDelivery
                  ? /*html*/ `
              {% if consolidated_estimated_delivery_time %}
              <tr>
                <td class="mfz-14 mlh-17 mmfz-13" style="text-transform: uppercase; color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 15px; line-height: 18px; padding-bottom: 16px;" valign="top">
                  Estimated delivery
                </td>
                <td class="mfz-14 mlh-17 mmfz-13" valign="top" style="text-transform: lowercase; color:#000001; font-family:'Courier New', monospace; font-size: 15px; line-height: 18px; text-align:right; padding-bottom: 16px; padding-left: 10px;">
                  {{ consolidated_estimated_delivery_time | date: '%B %d, %Y' }}
                </td>
              </tr>
              {% endif %}
              `
                  : ""
              }

              {% if requires_shipping and shipping_address %}
              <tr>
                <td class="mfz-14 mlh-17 mmfz-13" style="text-transform: uppercase; color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 15px; line-height: 18px; padding-bottom: 16px;" valign="top">
                  shipping&nbsp;address
                </td>
                <td class="mfz-14 mlh-17 mmfz-13" style="text-transform: lowercase; color:#000001; font-family:'Courier New', monospace; font-size: 15px; line-height: 18px; text-align:right; padding-bottom: 16px; padding-left: 10px;" valign="top">
                  {{ shipping_address | format_address }}
                </td>
              </tr>
              {% endif %}

              {% if company_location %}
              <tr>
                <td class="mfz-14 mlh-17 mmfz-13" style="text-transform: uppercase; color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 15px; line-height: 18px; padding-bottom: 16px;" valign="top">
                  Location
                </td>
                <td class="mfz-14 mlh-17 mmfz-13" style="text-transform: lowercase; color:#000001; font-family:'Courier New', monospace; font-size: 15px; line-height: 18px; text-align:right; padding-bottom: 16px; padding-left: 10px;" valign="top">
                  {{ company_location.name }}
                </td>
              </tr>
              {% endif %}

              {% if transaction_size > 0 or payment_terms and payment_terms.automatic_capture_at_fulfillment == false or b2b? %}
              <tr>
                <td class="mfz-14 mlh-17 mmfz-13" style="text-transform: uppercase; color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 15px; line-height: 18px; padding-bottom: 16px;" valign="top">
                  payment method
                </td>
                <td class="mfz-14 mlh-17 mmfz-13" style="text-transform: lowercase; color:#000001; font-family:'Courier New', monospace; font-size: 15px; line-height: 18px; text-align:right; padding-bottom: 16px; padding-left: 10px;" valign="top">
                  {% if payment_terms %}
                    {% assign due_date = payment_terms.next_payment.due_at | default: nil %}
                    {% if payment_terms.type == 'receipt' or payment_terms.type == 'fulfillment' and payment_terms.next_payment.due_at == nil %}
                      {{ payment_terms.translated_name }}<br>
                    {% else %}
                      {{ payment_terms.translated_name }}: Due {{ due_date | date: format: 'date' }}<br>
                    {% endif %}
                  {% endif %}
                  {% if transaction_size > 0 %}
                    {% for transaction in transactions %}
                      {% if transaction.status == "success" or transaction.status == "pending" %}
                        {% if transaction.kind == "capture" or transaction.kind == "sale" %}
                          {% if transaction.payment_details.gift_card_last_four_digits %}
                            <img src="{{ transaction.payment_details.type | downcase | replace: '_', '-'  | payment_type_img_url }}" class="customer-info__item-credit" width="auto" height="16" style="vertical-align: middle;">
                            ending with {{ transaction.payment_details.gift_card_last_four_digits }}<br>
                          {% elsif transaction.payment_details.credit_card_company %}
                            <img src="{{ transaction.payment_details.credit_card_company | payment_icon_png_url  }}" class="customer-info__item-credit" width="auto" height="16" alt="{{ transaction.payment_details.credit_card_company }}" style="vertical-align: middle;">
                            <span>ending with {{ transaction.payment_details.credit_card_last_four_digits }}</span><br>
                          {% elsif transaction.gateway_display_name == "Gift card" %}
                            <img src="{{ transaction.gateway_display_name | downcase | replace: ' ', '-'  | payment_type_img_url }}" class="customer-info__item-credit" width="auto" height="16" style="vertical-align: middle;">
                            ending with {{ transaction.payment_details.gift_card.last_four_characters | upcase }}<br>
                              &emsp;&emsp;&emsp;&nbsp;Gift card balance - <b>{{ transaction.payment_details.gift_card.balance |  money }}</b>
                          {% elsif transaction.gateway_display_name != "Shop Cash" %}
                            {{ transaction.gateway_display_name }}<br>
                          {% endif %}
                        {% elsif transaction.kind == "authorization" and transaction.gateway_display_name == "Shop Cash" %}
                          <span>Shop Cash - <b>{{ transaction.amount | money_without_trailing_zeros }}</b></span>
                        {% endif %}
                      {% endif %}
                    {% endfor %}
                  {% endif %}
                </td>
              </tr>
              {% endif %}
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <!-- END Customer info -->`;
}
