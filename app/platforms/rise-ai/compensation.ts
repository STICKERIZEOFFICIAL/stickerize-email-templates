import { button, codeBox, expiration, note, riseEmail, smallPrint, text } from './shell';

/**
 * Restyled from `other emails/new-rise.ai/compensation.html`.
 *
 * Same treatment as the rest: Rise's sentences kept, its label-and-value grid
 * folded into the copy, its greeting line dropped.
 *
 * The one closing line this email has that the others do not — "Thanks for
 * your patience" — stays a paragraph of its own above the small print, because
 * it is the point of the email rather than an aside.
 *
 * No photo row. Rise's export has none for this email, and the design set has
 * no pair named for it — rather than borrow the refund's artwork, it opens on
 * the heading. `photos(left, right)` takes a pair the moment one is chosen.
 */
export default function () {
  return riseEmail([
    text("We're sorry for the inconvenience.", [
      "To make it right, we've added {{issued_credit_amount}} in store credit to your wallet for you to enjoy on your next order.",
      'That puts your balance at {{total_wallet_balance}}.',
      'Your code has been saved to your account. Log in with this email address and hit "Apply your credits" in the cart, or copy the code below and paste it at checkout.',
    ]),
    codeBox('Your code:', '{{wallet_code}}'),
    button('START SHOPPING', 'https://stickerize.com', { tight: true }),
    expiration('issued_credit_expiration'),
    note(['Thanks for your patience - we look forward to making your next experience amazing.']),
    smallPrint(),
  ]);
}
