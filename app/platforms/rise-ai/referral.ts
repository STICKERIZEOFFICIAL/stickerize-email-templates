import { button, codeBox, expiration, photos, riseEmail, smallPrint, text } from './shell';

/**
 * Restyled from `other emails/new-rise.ai/referral.html`.
 *
 * Rise's default closes on a "Visit our social accounts" / "Visit our website"
 * row. It is dropped: this tab's footer has carried neither a social row nor a
 * second website link since the design-system pass, and the wordmark under the
 * footer is already the link home. Say the word and it comes back.
 */
export default function () {
  return riseEmail([
    photos(),
    text('Your friend just made a purchase that earned you a reward!', [
      'You just got {{issued_credit_amount}} for your successful referral at {{business_name}}.',
      'That puts your balance at {{total_wallet_balance}}.',
      'Your code has been saved to your account. Log in with this email address and hit "Apply your credits" in the cart, or copy the code below and paste it at checkout.',
    ]),
    codeBox('Your code:', '{{wallet_code}}'),
    button('START SHOPPING', 'https://stickerize.com', { tight: true }),
    expiration('issued_credit_expiration'),
    smallPrint(),
  ]);
}
