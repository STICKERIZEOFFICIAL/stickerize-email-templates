export function Intro({
  heading,
  description,
  showOrderNumber,
  showTrackingNumber,
}: {
  heading: string;
  description: string | null;
  showOrderNumber: boolean;
  showTrackingNumber?: boolean;
}) {
  return /*html*/ `
    <!-- Intro -->
    <tr>
      <td style="font-weight: bold; text-transform: uppercase; color:#000001; font-family:'Arial Black', Arial, sans-serif; text-align:left; font-size: 18px; line-height: 22px; padding-top: 24px; padding-bottom: 20px; padding-left: 12px; padding-right: 12px;">
        ${heading}
      </td>
    </tr>
    ${
      description
        ? /*html*/ `
          <tr>
            <td style="color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 18px; padding-bottom: 20px; padding-left: 12px; padding-right: 12px;">
              ${description}
            </td>
          </tr>`
        : ""
    }
  ${
    showOrderNumber
      ? /*html*/ `
        <tr>
          <td style="padding: 0 16px 16px;" align="left">
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td  style="border: 1px solid #000001; color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 19px; padding-top: 5px; padding-bottom: 5px; padding-left: 15px; padding-right: 15px;">
                  {% if order_name %}
                    {{ order_name }}
                  {% else %}
                    {{ order.name }}
                  {% endif %}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        {%- if po_number %}
        <tr>
          <td  style="color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 18px; padding-bottom: 8px; padding-left: 16px; padding-right: 16px;">
            PO number:
          </td>
        </tr>
        <tr>
          <td style="padding: 0 16px 16px;" align="left">
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td  style="border: 1px solid #000001; color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 19px; padding-top: 5px; padding-bottom: 5px; padding-left: 15px; padding-right: 15px;">
                  #{{ po_number }}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        {%- endif %}
        {% if transaction_count > 0 %}
          {% for transaction in transactions %}
            {% if transaction.show_buyer_pending_payment_instructions? %}
            <tr>
              <td  style="color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 18px; padding-bottom: 16px; padding-left: 16px; padding-right: 16px;">
                <p>{{transaction.buyer_pending_payment_notice}}</p>
                <table class="row">
                  <tr>
                    {% for instruction in transaction.buyer_pending_payment_instructions %}
                      <td>{{ instruction.header }}</td>
                    {% endfor %}
                    <td>Amount</td>
                  </tr>
                  <tr>
                    {% for instruction in transaction.buyer_pending_payment_instructions %}
                      <td>{{ instruction.value }}</td>
                    {% endfor %}
                    <td>{{transaction.amount | money}}</td>
                  </tr>
                </table>
              </td>
            </tr>									      
            {% endif %}
          {% endfor%}
        {% endif %}`
      : ""
  }
  ${
    showTrackingNumber
      ? /*html*/ `
        {% if fulfillment.tracking_numbers.size > 0 %}
          {% if fulfillment.tracking_numbers.size == 1 and fulfillment.tracking_company and
          fulfillment.tracking_url %}
          <tr>
            <td style="padding: 0 16px 16px;" align="left">
              <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td  style="border: 1px solid #000001; color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 19px; padding-top: 5px; padding-bottom: 5px; padding-left: 15px; padding-right: 15px;">
                    {% if shipping_price > 0 %}
                    <a href="{{ fulfillment.tracking_url }}">
                      {{ fulfillment.tracking_numbers.first }}
                    </a>
                    {% else %}
                      {{ fulfillment.tracking_numbers.first }}
                    {% endif %}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          {% elsif fulfillment.tracking_numbers.size == 1 %}
          <tr>
            <td style="padding: 0 16px 16px;" align="left">
              <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td  style="border: 1px solid #000001; color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 19px; padding-top: 5px; padding-bottom: 5px; padding-left: 15px; padding-right: 15px;">
                      {{ fulfillment.tracking_numbers.first }}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          {% else %}
          {% for tracking_number in fulfillment.tracking_numbers %}
          {% if fulfillment.tracking_urls[forloop.index0] %}
          <tr>
            <td style="padding: 0 16px 16px;" align="left">
              <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td  style="border: 1px solid #000001; color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 19px; padding-top: 5px; padding-bottom: 5px; padding-left: 15px; padding-right: 15px;">
                    {% if shipping_price > 0 %}
                    <a href="{{ fulfillment.tracking_urls[forloop.index0] }}">
                      {{ tracking_number }}
                    </a>
                    {% else %}
                      {{ tracking_number }}
                    {% endif %}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          {% else %}
          <tr>
          <td style="padding: 0 16px 16px;" align="left">
            <table border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td  style="border: 1px solid #000001; color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 19px; padding-top: 5px; padding-bottom: 5px; padding-left: 15px; padding-right: 15px;">
                    {{ tracking_number }}
                </td>
              </tr>
            </table>
          </td>
        </tr>
          {% endif %}
          {% endfor %}
          {% endif %}
        {% endif %}
      `
      : ""
  }
 <tr>
    <td class="fluid-img" style="font-size:0pt; line-height:0pt; text-align:left; padding-top: 4px; padding-bottom: 24px; padding-left: 12px; padding-right: 12px;">
      <img src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/241121_Stickerize_packaging_6.jpg?v=1740917483" width="700" height="450" border="0" alt="" />
    </td>
  </tr>
  <!-- END Intro -->`;
}
