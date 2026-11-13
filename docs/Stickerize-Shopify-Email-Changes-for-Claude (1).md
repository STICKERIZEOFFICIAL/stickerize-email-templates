# Stickerize Shopify email changes for Claude

Apply the changes to the shared email components and affected Shopify templates. Verify both the visualization and the exported Liquid.

## Shared spacing

| Between | Spacing |
| --- | --- |
| Outer thumbnail border and line-item description | 24px horizontally |
| Two consecutive paragraph blocks | 12px vertically |
| A paragraph block and the next distinct section | Existing global section spacing, typically 36px |

Apply the 12px rule only when two paragraph blocks are stacked directly together. Keep the global spacing for transitions to a distinct section.

## Line items and order totals

Use the **Bundle Starter** preview to check the spacing after the final bundle. Keep the items, Shipping, optional Order discount, and Today's Total VAT Included in the same order-summary section.

| Between | Vertical spacing |
| --- | --- |
| Final item or bundle and Shipping | 24px |
| Shipping and Today's Total VAT Included when the discount row is hidden | 36px |
| Shipping and Order discount, when shown | 24px |
| Order discount and Today's Total VAT Included, when shown | 36px |

Check the combined padding from the final bundle row, its wrapper, and the totals block. The visible gap before Shipping should be 24px even when the last item is a bundle. The discount-row spacing above follows the same within-section spacing and keeps 36px immediately before the total.

### Optional order discount row

Show **Order discount** between **Shipping** and **Today's Total VAT Included** only when a positive order-wide discount can be confirmed in the Shopify notification payload. Shopify documents `discount_applications` and `total_allocated_amount`. Use the following as a starting point and verify it against a real notification payload. The filters select merchandise discounts with an order-wide target and exclude shipping discounts and item-specific discounts.

```liquid
{% assign order_discount_amount = 0 %}
{% for discount_application in discount_applications %}
  {% if discount_application.target_selection == 'all' and discount_application.target_type == 'line_item' %}
    {% assign order_discount_amount = order_discount_amount | plus: discount_application.total_allocated_amount %}
  {% endif %}
{% endfor %}

{% if order_discount_amount > 0 %}
  {% comment %}Render the existing totals-row component and its spacing inside this condition.{% endcomment %}
  Order discount: -{{ order_discount_amount | money }}
{% endif %}
```

Use the template's existing money formatting and localized label. Keep the existing total calculation. If the qualifying discount cannot be verified, defer the row. When the row is hidden, omit its spacer too.

[Shopify notification variables reference](https://help.shopify.com/en/manual/fulfillment/setup/notifications/email-variables#discount-properties)

## Order confirmation

In `app/templates/shopify/order-confirmation.ts`, delete the entire paragraph highlighted in the screenshot. It appears after **“3. You Stickerize everything.”** and before **“YOUR ORDER.”**

> **Spotted a typo in your design or picked the wrong size? Reply to this email as soon as you can and we'll try to fix it before it hits the printer.**

Remove the paragraph block and any spacer used solely for it. Apply the same deletion to localized versions of this template.

## Order Edited

Remove the opening header and introductory paragraph, including their dedicated spacing. **Updated Order** should be the first visible content heading in the email body.

## Order number across all emails

Remove any standalone order-number row and its dedicated spacing across the email templates. Where the email copy includes an order number, show it once, in bold, inside the relevant paragraph. If a template currently has the order number only in a heading, as shown in Order confirmation, move it into the existing body paragraph and remove it from the heading. Apply the Order Edited removal above without adding a replacement intro.

## Verification

- Check mobile and desktop renders for consecutive paragraphs, thumbnail spacing, and the transition from the final item to Shipping. Compare an order ending in a regular item with one ending in Bundle Starter.
- Check an order with no discount, a merchandise order-wide discount, an item-only discount, and a shipping-only discount. Verify that the optional row and its spacing appear only for the qualifying order-wide discount.
- Check Order confirmation and Order Edited in the preview and exported Liquid. Review all templates for standalone order-number rows and duplicate visible order numbers.
