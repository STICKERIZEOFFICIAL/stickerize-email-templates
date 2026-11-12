# Stickerize Shopify email updates

## Objective

Update the Shopify notification templates in the email app so they follow the same spacing, capitalization, and layout rules. Use Martin’s approved copy as the source of truth and keep existing dynamic values and links working.

## Spacing

Apply these values to the rendered gap. Check both the template and its shared components for padding or margins that add together.

| Where | Gap |
| --- | --- |
| Between content blocks within the same body text container, such as a paragraph and its list | 12 px |
| Between a heading and its body or first content element | 24 px |
| Between distinct sections | 36 px |
| From the introductory paragraph to the “Your order” heading | 36 px |
| From the “Your order” heading to the first order item or its image | 24 px |
| From the manage-orders sentence to “Go to your account,” when the link is a separate block | 12 px |

Keep “Go to your account” inline with the manage-orders sentence where the copy and layout allow it. If it needs its own block, use the 12 px gap.

### Order line items

Use the approved Order Confirmation preview as the visual reference for the spacing between the item image and its title, such as “Holographic Sticker Pack.” Apply that same spacing wherever the line-item layout appears. The review did not specify a pixel value for this gap. Check the reference template or preview before changing it.

## Capitalization

- Use uppercase for bold section headings and the existing uppercase labels in the summary box.
- Use sentence case for regular labels and body copy, including “Shipping” and “Today’s total.” Start each sentence with a capital letter. Keep the existing per-item text formatting.
- Capitalize the first letter of right-hand text values in the summary box and preserve normal casing for dates and proper names. For example, render “November 14.”

## Order number and image placement

- Remove the standalone order-number box wherever it appears. Render the dynamic order number in bold within the introductory paragraph, for example **#1234**. Keep clickable shipment tracking where applicable and follow the template-specific rules below.
- Use this sequence for email-level images, including the images requested for Account Invite: logo → first heading → introductory paragraph → image. Product thumbnails belong in the order line items.

## Template coverage

- Use Order Confirmation as the spacing and line-item reference. Verify Order Edited and any other supported template that uses the affected layout, including Order Invoice and Marketing Consent where the relevant elements appear.
- Include Shipping Update in this pass for the duplicate tracking copy fix below. Returns is unsupported in the app.
- Account Welcome is inactive following the customer account migration. Use its images for Account Invite. Apply the capitalization fix to Account Welcome if the template is still editable and record its inactive status in the handoff.

## Per-email fixes

| Email | Change |
| --- | --- |
| Payment Error | Remove the duplicate body copy so it appears once. |
| Payment Reminder | Start each body sentence with a capital letter. |
| Shipping Confirmation | Remove the duplicate “You can track your order here:” line. If the template requires that line, remove the preceding sentence instead. Verify that the tracking link still works. |
| Shipping Update | Apply the same duplicate tracking copy fix as Shipping Confirmation and verify the tracking link. |
| Out for Delivery | Keep the shipment link. Move “You can track your order here:” to a separate row below the body text with a 12 px gap. |
| Delivered | Remove the “Tracking number” display. |
| Account Invite | Remove the exclamation mark from the title. Add the same images as Account Welcome after the introductory paragraph. Start each body sentence with a capital letter. |
| Account Welcome | Start each body sentence with a capital letter if the template is still editable. |
| Password Reset | Start each body sentence with a capital letter. |
| Payment Method Update | Pending. The requested edits are unspecified. |
| Payment Method Restore | Start each body sentence with a capital letter. |
| Marketing Confirmation | Start each body sentence with a capital letter. Use the corresponding Marketing Consent template if that is its name in the app. |

## QA and handoff

- [ ] Check rendered desktop and mobile previews for the 12 px, 24 px, and 36 px gaps. Confirm that “Your order” has 36 px above it and 24 px below it, with no stacked spacing.
- [ ] Check account link placement and spacing, label capitalization, right-hand summary values, and date formatting.
- [ ] Verify that Order Edited and other applicable templates show the dynamic order number in bold within the intro and that existing email-level images follow the intro.
- [ ] Compare image-to-title spacing across templates with order line items, using the approved Order Confirmation preview.
- [ ] Verify the per-email changes in rendered previews. Check that tracking copy appears once where applicable and that the remaining shipment links work. Record Payment Method Update as pending.
- [ ] Share the updated previews for approval before release.

---

This brief now lives at [docs/shopify-email-scope.md](../docs/shopify-email-scope.md),
alongside the other reference briefs, and has been applied to the Shopify
templates. See [docs/shopify-spacing-and-capitalisation.md](../docs/shopify-spacing-and-capitalisation.md)
for what changed.
