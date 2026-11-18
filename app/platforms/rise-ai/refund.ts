import {
  button,
  codeBox,
  expiration,
  photos,
  REFUND_PHOTOS,
  riseEmail,
  smallPrint,
  text,
} from './shell';

/**
 * Rebuilt from `other emails/new-rise.ai/refund.html`.
 *
 * This one arrived already on the design system — it is our own template, re-
 * exported after the migration — so the copy is untouched. Two things the new
 * editor flattened on the way through are put back:
 *
 * - the heading sat 12px above its body; the system puts a heading 24px from
 *   what it introduces, and 12px is the gap between sibling paragraphs.
 * - the header rule had moved back onto the padded header cell, so it ran the
 *   full width of the column instead of lining up with the 12px inset. It is
 *   on the inner cell again — the same fix this header needed the first time.
 *
 * Variable names are the new platform's: `issued_credit_amount` where the old
 * one said `store_credit_added`, `wallet_code` for `code`, `order_number` for
 * `order_name`, and `{{#gift_card_expiration}}` for the triple-brace section.
 */
export default function () {
  return riseEmail([
    photos(...REFUND_PHOTOS),
    text("Your refund is completed. Here's {{issued_credit_amount}} in store credit.", [
      "We've processed your refund for order {{order_number}} and added the amount to your account as store credit, ready for your next order.",
      'Your code has been saved to your account. Log in with this email address and hit "Apply your credits" in the cart.',
      'Or copy the code below and paste it at checkout.',
    ]),
    codeBox('Your code:', '{{wallet_code}}'),
    button('USE MY CREDIT', 'https://stickerize.com', { tight: true }),
    expiration('gift_card_expiration'),
    smallPrint(),
  ]);
}
