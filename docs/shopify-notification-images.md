# Shopify notification images: STICKERIZE

Remove the image section from the customer notification email templates in Shopify (Settings > Notifications > Customer notifications) listed below. Source: copy sheet "Shopify - Copy Stickerize", column "Martin: IMAGES in E-Mail: Yes/no?".

This is a separate change from the copy update in `shopify-notification-copy.md`. If both files are given, do both in the same edit pass. The "do not touch layout" rule in the copy file does not block this change.

## Rules

1. Remove only the image section: the image and the block that wraps it (table row, cell, spacer), so no empty gap or extra padding is left behind.
2. Keep the header logo, line item product thumbnails and footer icons.
3. If it is unclear which block is the image section in a template, stop and ask before deleting.
4. After editing, send a test email of each template and check the spacing between title, paragraph and button.

## Remove image section (NO)

- Order confirmation
- Order canceled
- Order payment receipt
- Order refund
- Abandoned checkout
- Payment error
- Pending payment error
- Pending payment success
- Payment reminder
- Shipping confirmation
- Shipping update
- Out for delivery
- Delivered
- Customer account invite
- Customer account password reset
- Customer payment method update request
- Customer payment method restore request

## Keep image section (YES)

- Customer account welcome
- Customer marketing confirmation

## Not in scope, leave unchanged

- Contact customer
- Order edited
- Order invoice
- USPS return label created
- Return request received
- Return request approved
- Return request declined
