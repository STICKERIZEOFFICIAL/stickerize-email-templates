/**
 * The order summary: the rows that follow the line items — Shipping, the
 * optional order-wide discount, and the total.
 *
 * Spacing, from the brief. One side owns each gap, as everywhere else: a row's
 * `padding-top` is the whole of the gap above it, and the order table above
 * contributes nothing beyond its own 24px.
 *
 *   final item or bundle -> Shipping         24px  (OrderTable's `gapBottom`)
 *   Shipping             -> Order discount   24px  (when the row shows)
 *   Order discount       -> Today's total    36px  (when the row shows)
 *   Shipping             -> Today's total     4px  (when it does not)
 *
 * The discount row used to sit above Shipping, 4px from it like every other
 * row. It now sits between Shipping and the total. When no discount qualifies,
 * the row and both of its gaps go away together — the summary reads exactly as
 * it did before, rather than holding the missing row's space open.
 */

/** Gap above a further row of the summary — today, the discount. */
const ROW_GAP = 24;
/** Rows that belong with the one above them: the payment breakdown. */
const TIGHT_GAP = 4;

/**
 * Gap above Today's total — resolved at send time, not here.
 *
 * 36px separates the total from an Order discount row above it. With no
 * discount there is nothing to separate it from, and a fixed 36px would hold
 * the hidden row's space open: the total would float away from Shipping for
 * every order that has no discount, which is most of them. So when the row is
 * skipped the total closes back up to Shipping at the 4px the summary rows
 * always ran at.
 */
const TOTAL_GAP = `{% if total_order_discount_amount > epsilon %}36{% else %}${TIGHT_GAP}{% endif %}`;

export function Total({ showRefund }: { showRefund?: boolean } = {}) {
  return /*html*/ `
  <!-- Total -->
  <tr>
    <td style="padding: 0 12px 36px; font-size: 0pt; line-height: 0pt;">
    {% assign order_discount_count = 0 %}
    {% assign total_order_discount_amount = 0 %}
    {% assign has_shipping_discount = false %}
    {% assign shipping_amount = 0 %}
    {% assign epsilon = 0.00001 %}

    {% comment %}
      The order-wide merchandise discount, and only that. target_selection
      'all' excludes a discount allocated to specific items — those already
      show against the line item — and target_type 'line_item' excludes a
      shipping discount, which is netted off the Shipping row instead.
    {% endcomment %}
    {% for discount_application in discount_applications %}
      {% if discount_application.target_selection == 'all' and discount_application.target_type == 'line_item' %}
        {% assign order_discount_count = order_discount_count | plus: 1 %}
        {% assign total_order_discount_amount = total_order_discount_amount | plus: discount_application.total_allocated_amount  %}
      {% endif %}
      {% if discount_application.target_type == 'shipping_line' %}
        {% assign has_shipping_discount = true %}
        {% assign shipping_discount = discount_application.title %}
        {% assign shipping_amount = shipping_amount | plus: discount_application.total_allocated_amount %}
      {% endif %}
    {% endfor %}
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <!-- Shipping, or Pickup. The first row of the summary, so nothing on
             top: the 24px down from the last item is the order table's. -->
        {% if delivery_method == 'pick-up' %}
        <tr>
          <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 17px; padding-top: 0;">
            Pickup
          </td>
          <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'Courier New', monospace; font-size: 13px; line-height: 17px; text-align:right; padding-top: 0;">
            {{ shipping_price | money_without_trailing_zeros }}
          </td>
        </tr>
        {% else %}
        {% assign shipping_amount_due = shipping_price %}
        {% if has_shipping_discount %}
          {% assign shipping_amount_due = shipping_price | minus: shipping_amount %}
        {% endif %}
        <tr>
          <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 17px; padding-top: 0;">
            Shipping
          </td>
          <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'Courier New', monospace; font-size: 13px; line-height: 17px; text-align:right; padding-top: 0;">
            {% if shipping_amount_due < epsilon %}
              Free
            {% else %}
              {{ shipping_amount_due | money_without_trailing_zeros }}
            {% endif %}
          </td>
        </tr>
        {% endif %}

        <!-- Order discount: shown only for a confirmed, positive, order-wide
             merchandise discount. No row, no gap, when there is none. -->
        {% if total_order_discount_amount > epsilon %}
        <tr>
          <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 17px; padding-top: ${ROW_GAP}px;">
            Order discount
          </td>
          <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'Courier New', monospace; font-size: 13px; line-height: 17px; text-align:right; padding-top: ${ROW_GAP}px;">
            -{{ total_order_discount_amount | money_without_trailing_zeros }}
          </td>
        </tr>
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
          <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 17px; padding-top: ${TOTAL_GAP}px;">
            Today’s total (VAT incl.)
          </td>
          <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'Courier New', monospace; font-size: 13px; line-height: 17px; text-align:right; padding-top: ${TOTAL_GAP}px;">
            {{ transaction_amount | money_without_trailing_zeros }}
          </td>
        </tr>
        <tr>
          <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 17px; padding-top: ${TIGHT_GAP}px;">
            Total due {{ due_at_date }}
          </td>
          <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'Courier New', monospace; font-size: 13px; line-height: 17px; text-align:right; padding-top: ${TIGHT_GAP}px;">
            {{ payment_terms.next_payment.amount_due | money_without_trailing_zeros }}
          </td>
        </tr>
        {% else %}
        <tr>
          <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 17px; padding-top: ${TOTAL_GAP}px;">
            Today’s total (VAT incl.)
          </td>
          <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'Courier New', monospace; font-size: 13px; line-height: 17px; text-align:right; padding-top: ${TOTAL_GAP}px;">
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
            <td style="border-top: 1px solid #000001; padding-bottom: 16px;"></td>
            <td style="border-top: 1px solid #000001; padding-bottom: 16px;"></td>
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
            <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 17px; padding-top: ${TIGHT_GAP}px;">
              {{ transaction_name }}
            </td>
            <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'Courier New', monospace; font-size: 13px; line-height: 17px; text-align:right; padding-top: ${TIGHT_GAP}px;">
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
            <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 17px; padding-top: ${TIGHT_GAP}px;">
              Refund
              <br>
              <small>{{ refund_method_title | replace: '_', ' ' | capitalize }}</small>
            </td>
            <td class="mfz-14 mlh-17" valign="top" style="color:#000001; font-family:'Courier New', monospace; font-size: 13px; line-height: 17px; text-align:right; padding-top: ${TIGHT_GAP}px;">
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
