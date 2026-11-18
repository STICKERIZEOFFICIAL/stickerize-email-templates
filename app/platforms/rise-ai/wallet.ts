import { button, codeBox, riseEmail, smallPrint, text } from './shell';

/**
 * Restyled from `other emails/new-rise.ai/wallet-details.html`.
 *
 * The one email here that is not news — it is sent to show someone what they
 * already hold — so it carries no expiry line, which is what Rise's export
 * does too.
 *
 * Note the variables: this template reads the balance and the code off
 * `gift_card_*`, not the `wallet_*` names the credit emails use. That is how
 * Rise's export has it, so it is left alone — but it is worth a test send,
 * because the two naming schemes sitting side by side in one platform is the
 * kind of thing that turns into an empty line in a live email.
 *
 * No photo row. Rise's export has none for this email, and the design set has
 * no pair named for it — rather than borrow the refund's artwork, it opens on
 * the heading. `photos(left, right)` takes a pair the moment one is chosen.
 */
export default function () {
  return riseEmail([
    text("You've got store credit waiting for you.", [
      'Your balance is {{gift_card_balance}}.',
      'To use it, simply log in with this email address and hit "Apply your credits" in the cart, or copy the code below and paste it at checkout.',
    ]),
    codeBox('Your code:', '{{gift_card_code}}'),
    button('START SHOPPING', 'https://stickerize.com', { tight: true }),
    smallPrint(),
  ]);
}
