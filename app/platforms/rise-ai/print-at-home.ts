import { button, codeBox, note, riseEmail, text } from './shell';

/**
 * Restyled from `other emails/new-rise.ai/print-at-home.html`.
 *
 * Goes to the **sender**, not the recipient — it is the card they are about to
 * print and hand over — so it addresses `{{sender_full_name}}` and names who
 * it is for. No product squares and no small print, for the same reason the
 * gift card email has neither.
 */
export default function () {
  return riseEmail([
    text('Your gift card for {{recipient_full_name}} is ready to print!', [
      'It is worth {{gift_card_balance}}. Print it, fold it, hand it over.',
      'The code below is on the card, so it works whether they type it in or hold it up at checkout.',
    ]),
    codeBox('Gift card code:', '{{gift_card_code}}'),
    button('PRINT GIFT CARD', '{{greeting_card_url}}', { tight: true }),
    note(["Got any questions? Get in touch with us and we'll do everything we can to help."]),
  ]);
}
