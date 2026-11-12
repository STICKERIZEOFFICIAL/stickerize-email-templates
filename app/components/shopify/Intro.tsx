import { renderBody } from "~/components/BodyCopy";

/**
 * Spacing rules from docs/shopify-email-scope.md, applied here rather than
 * written out block by block.
 *
 * The bug this replaces: every block carried its own `padding-bottom`, and the
 * block after it often carried a `padding-top` as well, so the rendered gap was
 * the sum of the two and never the number anyone intended. The fix is for one
 * side to own each gap — a block's bottom padding — and for the next block to
 * contribute nothing on top.
 */
const GAP = {
  /**
   * Between blocks inside the same body text container — a paragraph and the
   * list under it, one list item and the next, any line that deliberately
   * starts a new line rather than wrapping. See `BodyCopy.tsx`; this value is
   * applied there, not here.
   */
  BLOCK: 12,
  /**
   * Between elements of a section: the heading and its body, the body and the
   * images, the images and the tracking box. Every element in a section is
   * this far from its neighbour.
   */
  ELEMENT: 24,
  /** Between distinct sections. */
  SECTION: 36,
} as const;

export function Intro({
  heading,
  description,
  showOrderNumber,
  showTrackingNumber,
  trackingLabel,
  showImage = false,
}: {
  heading: string;
  description: string | readonly string[] | null;
  /**
   * Renders the order number in bold at the end of the introductory
   * paragraph. It used to draw a bordered box of its own; the box is gone.
   */
  showOrderNumber: boolean;
  showTrackingNumber?: boolean;
  /**
   * A line introducing the tracking box, on a row of its own above it,
   * rather than trailing the body copy.
   *
   * Out for Delivery is the template that wants this. Shipping Confirmation
   * and Shipping Update do not: Shopify's own `email_body` already tells the
   * customer to use the link, so a line here would be the second one saying
   * the same thing.
   */
  trackingLabel?: string;
  /**
   * The two-up photo grid under the intro.
   *
   * Opt **in**, not opt out. It used to default to true, so a template that
   * simply did not mention it rendered the grid — which is how seven
   * notifications the images brief never decided on ended up carrying photos
   * nobody asked for. Only three emails want them:
   * docs/shopify-notification-images.md lists Account Welcome and Marketing
   * Confirmation, and docs/shopify-email-scope.md adds Account Invite.
   */
  showImage?: boolean;
}) {
  // Which blocks this instance actually renders, in order. The last one owns
  // the 36px gap to the next section; the rest own a gap to their neighbour.
  // Built as a list so a block can never guess what follows it.
  const blocks = [
    description ? 'description' : null,
    showOrderNumber ? 'orderNumber' : null,
    trackingLabel ? 'trackingLabel' : null,
    showTrackingNumber ? 'tracking' : null,
    showImage ? 'image' : null,
  ].filter(Boolean) as string[];

  const isLast = (name: string) => blocks[blocks.length - 1] === name;

  /** Bottom padding: the section gap when last, else the element gap. */
  const gapAfter = (name: string) => (isLast(name) ? GAP.SECTION : GAP.ELEMENT);

  // Always the heading gap, never the section gap — including when Intro
  // renders nothing but the heading. Ten templates supply their body through
  // `Description` instead of through this component, and in every one of them
  // the next thing on the page is that heading's body, which the brief puts at
  // 24px. Widening to 36px here would separate a heading from its own copy.

  return /*html*/ `
    <!-- Intro -->
    <tr>
      <td style="font-weight: bold; text-transform: uppercase; color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 13px; padding-top: 24px; padding-bottom: ${GAP.ELEMENT}px; padding-left: 12px; padding-right: 12px;">
        ${heading}
      </td>
    </tr>
    ${
      description
        ? /*html*/ `
          <tr>
            <td style="color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 18px; padding-bottom: ${gapAfter(
              'description',
            )}px; padding-left: 12px; padding-right: 12px;">
              ${renderBody(description)}
            </td>
          </tr>`
        : ""
    }
  ${
    showOrderNumber
      ? /*html*/ `
        <!-- Order number, in bold inside the intro copy rather than in a box
             of its own. Same for the PO number below it. -->
        <tr>
          <td style="color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 18px; padding-bottom: ${gapAfter(
            'orderNumber',
          )}px; padding-left: 12px; padding-right: 12px;">
            Order
            <strong>{% if order_name %}{{ order_name }}{% else %}{{ order.name }}{% endif %}</strong>
            {%- if po_number %}<br />PO number <strong>#{{ po_number }}</strong>{%- endif %}
          </td>
        </tr>
        {% if transactions.size > 0 %}
          {% for transaction in transactions %}
            {% if transaction.show_buyer_pending_payment_instructions? %}
            <tr>
              <td  style="color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 18px; padding-bottom: ${
                GAP.ELEMENT
              }px; padding-left: 12px; padding-right: 12px;">
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
    trackingLabel
      ? /*html*/ `
        <!-- Its own row above the tracking box, rather than trailing
             the body copy. -->
        <tr>
          <td style="color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 18px; padding-bottom: ${gapAfter(
            'trackingLabel',
          )}px; padding-left: 12px; padding-right: 12px;">
            ${trackingLabel}
          </td>
        </tr>`
      : ""
  }
  ${
    showTrackingNumber
      ? /*html*/ `
        {% if fulfillment.tracking_numbers.size > 0 %}
          {% if fulfillment.tracking_numbers.size == 1 and fulfillment.tracking_url %}
          <tr>
            <td style="padding: 0 12px ${gapAfter('tracking')}px;" align="left">
              <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td  style="border: 1px solid #000001; color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 19px; padding-top: 5px; padding-bottom: 5px; padding-left: 15px; padding-right: 15px;">
                    <a href="{{ fulfillment.tracking_url }}" target="_blank" rel="noopener">
                      {{ fulfillment.tracking_numbers.first }}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          {% elsif fulfillment.tracking_numbers.size == 1 %}
          <tr>
            <td style="padding: 0 12px ${gapAfter('tracking')}px;" align="left">
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
            <td style="padding: 0 12px ${GAP.ELEMENT}px;" align="left">
              <table border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td  style="border: 1px solid #000001; color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 19px; padding-top: 5px; padding-bottom: 5px; padding-left: 15px; padding-right: 15px;">
                    <a href="{{ fulfillment.tracking_urls[forloop.index0] }}" target="_blank" rel="noopener">
                      {{ tracking_number }}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          {% else %}
          <tr>
          <td style="padding: 0 12px ${GAP.ELEMENT}px;" align="left">
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
  ${
    showImage
      ? /*html*/ `
        <tr>
          <td style="font-size:0pt; line-height:0pt; text-align:left; padding-top: 0; padding-bottom: ${gapAfter(
            'image',
          )}px; padding-left: 12px; padding-right: 12px;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
              <tr>
                <td class="fluid-img" width="49%" valign="top" style="padding: 0;">
                  <img src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Left_Image.jpg?v=1765296929" width="344" height="344" border="0" alt="" style="width: 100%; max-width: 344px; height: auto; display: block;" />
                </td>
                <td width="2%" style="font-size: 0pt; line-height: 0pt;">&nbsp;</td>
                <td class="fluid-img" width="49%" valign="top" style="padding: 0;">
                  <img src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Right_Image.jpg?v=1765296929" width="344" height="344" border="0" alt="" style="width: 100%; max-width: 344px; height: auto; display: block;" />
                </td>
              </tr>
            </table>
          </td>
        </tr>`
      : ""
  }
  <!-- END Intro -->`;
}
