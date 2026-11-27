import { button, codeBox, riseEmail, smallPrint, text } from './shell';

/**
 * Restyled from `other emails/new-rise.ai/referral.html`.
 *
 * Rise's default closes on a "Visit our social accounts" / "Visit our website"
 * row. It is dropped: this tab's footer has carried neither a social row nor a
 * second website link since the design-system pass, and the wordmark under the
 * footer is already the link home. Say the word and it comes back.
 *
 * No photo row. Rise's export has none for this email, and the design set has
 * no pair named for it — rather than borrow the refund's artwork, it opens on
 * the heading. `photos(left, right)` takes a pair the moment one is chosen.
 */
export default function () {
  return riseEmail([
    text('Your friend just made a purchase that earned you a reward!', [
      'You just got {{issued_credit_amount}} for your successful referral at {{business_name}}.',
      'That puts your balance at {{total_wallet_balance}}.',
      'Your code has been saved to your account. Log in with this email address and hit "Apply your credits" in the cart, or copy the code below and paste it at checkout.',
    ]),
    codeBox('Your code:', '{{wallet_code}}'),
    button('START SHOPPING', 'https://stickerize.com', { tight: true }),
    smallPrint(),
  ]);
}
