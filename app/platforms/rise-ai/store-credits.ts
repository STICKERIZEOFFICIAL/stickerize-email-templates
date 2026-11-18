import {
  button,
  codeBox,
  expiration,
  photos,
  riseEmail,
  smallPrint,
  STORE_CREDITS_PHOTOS,
  text,
} from './shell';

/**
 * CAUTION: `other emails/new-rise.ai/store-credits.html` is a **0-byte file**,
 * so there was no new export to rebuild from.
 *
 * The copy below is our own approved Store credits received email, carried
 * across from the old platform and moved onto the new variable names —
 * `issued_credit_amount` for `store_credit_added`, `total_wallet_balance` for
 * `balance`, `wallet_code` for `code`. The structure is the one every other
 * email in this tab uses.
 *
 * Diff it against Rise before release: if the live template says anything else,
 * this is the file to correct, and a real export would settle it.
 */
export default function () {
  return riseEmail([
    photos(...STORE_CREDITS_PHOTOS),
    text("Thanks for ordering. Here's {{issued_credit_amount}} back.", [
      'Your cash back is in, and you now have {{total_wallet_balance}} in credit for your next order.',
      'Your code has been saved to your account. Log in with this email address and hit "Apply your credits" in the cart.',
      'Or copy the code below and paste it at checkout.',
    ]),
    codeBox('Your code:', '{{wallet_code}}'),
    button('USE MY CREDIT', 'https://stickerize.com', { tight: true }),
    expiration('issued_credit_expiration'),
    smallPrint(),
  ]);
}
