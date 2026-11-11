# Shopify notification copy update: STICKERIZE

Update the customer notification email templates in Shopify (Settings > Notifications > Customer notifications) with the new copy below. Source: copy sheet, column "Martin, suggestions for improvements", compared against the live copy as of November 6, 2026.

## Scope

Change only three fields per email:

- **Title**: the heading text, `{% capture email_title %}`
- **Paragraph**: the intro text under the heading, `{% capture email_body %}`
- **Preview**: the inbox preview text (hidden preheader)

Do not touch subject lines, layout, styling, buttons, line items, order summary, footer or any other Liquid logic.

## Rules

1. Use the **Current** text to locate what to replace. If a template has several conditional variants of the title or body (pickup, local delivery, gift card, etc.), replace only the variant that holds the Current text. Current text is shown on one line; in the template it may be split by line breaks or HTML tags.
2. Paste the **New** text exactly as written. Do not rewrite, shorten, add punctuation, em dashes or hyphens.
3. `{{ order_number }}` is a Shopify Liquid variable. Keep it as written.
4. Square bracket notes such as `[keep amount variable]` mean: keep the Liquid variable the template already uses for that value. Never hardcode amounts, dates or currencies.
5. Fields marked **no change** stay as they are.
6. After editing, send a test email of each template and check that title, paragraph and preview render with real order data.

## Not in scope, leave unchanged

- Order edited
- Contact customer (uses `{{ email_title }}` and `{{ custom_message }}`, no change)
- Order invoice
- USPS return label created
- Return request received
- Return request approved
- Return request declined

## Changes per email

### Order confirmation

**Title**
- Current: Your custom sticker order is confirmed
- New: Order {{ order_number }} confirmed. Now we make it real.

**Paragraph**
- Current: Thank you for choosing STICKERIZE©. We’ve received your order and are already working to bring your custom stickers to life. You’ll receive another email once your order ships. If you have any questions, feel free to reach out.
- New: The order is in, and designs are headed for print. Here's what happens next: 1. We print and cut the order. 2. We ship it and send tracking information. 3. You Stickerize everything. Spotted a typo in your design or picked the wrong size? Reply to this email as soon as you can and we'll try to fix it before it hits the printer.

**Preview**
- Current: We’ve received your order and are already working to bring your custom stickers to life.
- New: Designs are headed for print. Here's what happens next.

### Order canceled

**Title**
- Current: Your order has been canceled
- New: Order {{ order_number }} has been canceled

**Paragraph**
- Current: We’re sorry to see your order go. Your custom sticker order has been canceled, and any applicable payments will be refunded promptly. If you didn’t mean to cancel or have any questions, please don’t hesitate to contact us.
- New: Order {{ order_number }} has been canceled and nothing will be printed. Payment has been refunded, and you'll get a separate email when the refund goes through. Didn't mean to cancel, or want to tweak your design and order again? Just reply and we'll help you get it right.

**Preview**
- Current: Your custom sticker order has been canceled, and any applicable payments will be refunded promptly.
- New: Order {{ order_number }} has been canceled and payment refunded.

### Order payment receipt

**Title**
- Current: Payment received for your custom stickers
- New: Payment received. Designs are next.

**Paragraph**
- Current: Your payment has been successfully processed, and we’re thrilled to start crafting your custom stickers. Keep an eye on your inbox for updates, including when your order ships.
- New: Thanks, we've received the payment for order {{ order_number }}. Designs are lined up for print and we'll send an email as soon as they ship.

**Preview**
- Current: View your order
- New: Designs are lined up for print.

### Order refund

**Title**
- Current: Your refund has been processed
- New: Refund for order {{ order_number }} is on its way

**Paragraph**
- Current: Your refund has been successfully issued for your custom sticker order - Total amount refunded: XX currency. Depending on your payment method, it may take a few days to reflect in your account. If you have any questions, we’re here to help.
- New: We've refunded [keep Shopify's refund amount variable] for order {{ order_number }}. Depending on your bank or payment method, it may take up to 10 days to show up in your account. Anything else we can sort for you? Just reply.

**Preview**
- Current: Depending on your payment method, it may take a few days to reflect in your account.
- New: Your money is heading back to you.

### Abandoned checkout

**Title**
- Current: Don’t miss out on your custom stickers
- New: Designs are still in cart

**Paragraph**
- Current: We noticed you left some amazing designs in your cart. It only takes a few clicks to complete your order and turn your ideas into life. Finish your checkout today and let’s make something awesome.
- New: You were really close. Designs are saved and ready to go from screen to sticker, so pick up right where you left off.

**Preview**
- Current: Finish your checkout today and let’s make something awesome.
- New: Pick up where you left off. Designs are saved.

### Payment error

**Title**
- Current: There’s an issue with your payment
- New: Payment didn't go through

**Paragraph**
- Current: We couldn’t process your payment for your custom sticker order. Please double-check your payment details or try again with a different method. Need assistance? We’re here to help.
- New: Something went wrong with your payment, and you haven't been charged. Designs are still in your cart. Try again, or switch to a different payment method, and you're good to go.

**Preview**
- Current: We couldn’t process your payment for your custom sticker order.
- New: You haven't been charged, and your designs are still in your cart.

### Pending payment error

**Title**
- Current: Action needed: Payment issue with your order
- New: Payment issue for order {{ order_number }}

**Paragraph**
- Current: We’re having trouble processing your payment. To ensure your custom stickers are made without delay, please update your payment information or contact us for support.
- New: We couldn't complete the payment, so no charge was made and the order is on hold. Try paying again using the button below and we'll send designs to print right away.

**Preview**
- Current: Please update your payment information.
- New: No payment was charged. Retry the payment to get the order moving.

### Pending payment success

**Title**
- Current: Your payment has been confirmed
- New: Payment confirmed for order {{ order_number }}

**Paragraph**
- Current: Great news. Your payment has been successfully processed, and we’re moving ahead with your custom sticker order. Stay tuned for updates on your shipment.
- New: All good. The payment went through and designs are headed for print. We'll send an email as soon as they ship.

**Preview**
- Current: We’re moving ahead with your custom sticker order.
- New: Designs are headed for print.

### Payment reminder

**Title**
- Current: Don’t forget to complete your order
- New: Payment reminder for order {{ order_number }}

**Paragraph**
- Current: Your custom sticker order is waiting. To avoid any delays, please complete your payment. Once done, we’ll start crafting your stickers right away.
- New: Friendly reminder: payment of [keep amount variable] for order {{ order_number }} was due on [keep due date variable]. Pay securely using the button below. Already paid? Thank you, and please ignore this email. Questions about the invoice? Just reply.

**Preview**
- Current: Your custom stickers order is waiting.
- New: Quick reminder that payment for your order is due.

### Shipping confirmation

**Title**
- Current: Your custom stickers are on their way
- New: Order {{ order_number }} is on the move

**Paragraph**
- Current: Good news - Your order has been shipped and is on its way to you. Track your package using the link below, and get ready to enjoy your new stickers.
- New: Packed, shipped and heading your way. Track your package with the link below.

**Preview**
- Current: Good news - Your order has been shipped and is on its way to you.
- New: Packed, shipped and heading your way.

### Shipping update

**Title**
- Current: Update on your stickers shipment
- New: Update on order {{ order_number }}

**Paragraph**
- Current: We’ve got an update on your custom sticker order. Your shipment is in transit and making its way to you. Click below to see the latest tracking information.
- New: Quick update: there's movement on your order. The shipment is in transit and making its way to you. Check the latest status using the link below.

**Preview**
- Current: Good news - Your order has been shipped and is on its way to you.
- New: New tracking info for order {{ order_number }}.

### Out for delivery

**Title**
- Current: Your stickers are almost here.
- New: Heads up. Order {{ order_number }} arrives today.

**Paragraph**
- Current: Exciting news — your custom sticker order is out for delivery and should arrive soon. Get ready to unbox your creativity.
- New: Order {{ order_number }} is out for delivery and should land with you today. Start choosing where to place it.

**Preview**
- Current: our custom stickers are out for delivery and should arrive soon.
- New: Order is out for delivery and should arrive today.

### Delivered

**Title**
- Current: Your custom stickers have arrived.
- New: It's arrived. Time to Stickerize everything.

**Paragraph**
- Current: It’s time to get creative — your custom stickers have been delivered! We hope you love them as much as we loved making them. Share your designs with us using #STICKERIZE. Haven't received your package yet? Let us know
- New: Laptop, water bottle, notebook, phone. Your call. Show us where they end up: post it and tag @stickerizee. We feature our favourites. Not seeing your package? Let us know and we'll track it down.

**Preview**
- Current: It’s time to get creative — your custom stickers have been delivered.
- New: Your order has landed. Show us where it ends up.

### Customer account invite

**Title**
- Current: Create your Stickerize account
- New: Your Stickerize account is ready

**Paragraph**
- Current: Join the STICKERIZE© family. Set up your account to easily track orders, save designs, and enjoy exclusive perks. Click below to get started—it only takes a minute!
- New: Activate the account to reorder in a few clicks and use earned store credit right in the cart. It takes seconds.

**Preview**
- Current: Confirm your Stickerize account
- New: Reorder faster and use store credit.

### Customer account welcome

**Title**: no change

**Paragraph**
- Current: We’re thrilled to have you on board. Your account is all set up, giving you access to exclusive features, faster checkouts, and more. Let’s start creating amazing custom stickers together.
- New: Your account has been set up. Log in next time to check out faster, keep track of orders and apply earned store credit in the cart.

**Preview**
- Current: We’re thrilled to have you on board. Your account is all set up, giving you access to exclusive features, faster checkouts, and more
- New: Your account is live.

### Customer account password reset

**Title**: no change

**Paragraph**
- Current: Need to update your account access? No problem. Click the link below to reset your password and get back to creating custom stickers in no time.
- New: Use the link to set a new password. Didn't ask for this? You can safely ignore this email. Account stays as it is.

**Preview**
- Current: Click the link inside the email to reset your password and get back to creating custom stickers in no time.
- New: Use the link inside to set a new password.

### Customer payment method update request

**Title**: no change

**Paragraph**
- Current: For a smoother experience, we need you to update your payment method. Click the link below to update securely, and we’ll ensure there are no disruptions to your orders.
- New: The payment method saved to your account needs updating. Use the secure link below to check details or add a new card.

**Preview**
- Current: Click the link inside email to update securely, and we’ll ensure there are no disruptions to your orders.
- New: Takes a minute, using the secure link inside.

### Customer payment method restore request

**Title**: no change

**Paragraph**
- Current: Your payment method needs attention. Please restore or update your details to continue enjoying seamless ordering for your custom stickers.
- New: We couldn't verify the payment method saved to your Stickerize account. Use the secure link below to restore it or add a new one.

**Preview**
- Current: Please restore or update your details to continue enjoying seamless ordering for your custom stickers.
- New: Restore or update it using the secure link inside.

### Customer marketing confirmation

**Title**
- Current: Join our creative community
- New: One click and you're in

**Paragraph**
- Current: You’re just one step ahead from exclusive offers, and inspiration from STICKERIZE©. You just need to confirm you want to recieve marketing updates from us. We’re excited to keep you in the loop as we create amazing custom stickers together. If you didn’t subscribe, then you don’t need to do anything.
- New: Confirm your subscription to be first to hear about new drops, creative inspo from our community and the occasional offer. Didn't sign up? Just ignore this email.

**Preview**
- Current: You just need to confirm you want to receive marketing updates from us.
- New: Confirm your subscription to join the Stickerize community.
