import { button, codeBox, expiration, riseEmail, smallPrint, text } from './shell';

/**
 * Restyled from `other emails/new-rise.ai/cashback.html`.
 *
 * Rise's default: Helvetica, a 20px grey lead, and the amounts set out as a
 * label-and-value grid — cashback amount, expiration, wallet balance, code.
 * Every sentence is kept. What changes is where the figures sit: the system
 * has one boxed code and one expiry line, so the amounts read in the copy the
 * way they do on the refund email rather than as a table of their own.
 *
 * The greeting line Rise opens on — "Hi {{ recipient_full_name }}" — is gone,
 * because neither approved template has one and the heading is the first thing
 * the design shows.
 *
 * No photo row. Rise's export has none for this email, and the design set has
 * no pair named for it — rather than borrow the refund's artwork, it opens on
 * the heading. `photos(left, right)` takes a pair the moment one is chosen.
 */
export default function () {
  return riseEmail([
    text('Your purchase just paid you back!', [
      "{{issued_credit_amount}} are waiting in your wallet to use on something you'll love next.",
      'That puts your balance at {{total_wallet_balance}}.',
      'Your code has been saved to your account. Log in with this email address and hit "Apply your credits" in the cart, or copy the code below and paste it at checkout.',
    ]),
    codeBox('Your code:', '{{wallet_code}}'),
    button('START SHOPPING', 'https://stickerize.com', { tight: true }),
    expiration('issued_credit_expiration'),
    smallPrint(),
  ]);
}
