import { button, codeBox, expiration, image, note, riseEmail, text } from './shell';

/**
 * Restyled from `other emails/new-rise.ai/gift-card.html`.
 *
 * The only email in this tab sent to someone who may never have bought from
 * us, so it keeps its own artwork rather than the product squares: Rise
 * renders the chosen card design into `{{greeting_image_url}}`, and the
 * sender's own message follows it.
 *
 * No small print — nothing here is store credit in euros, so the conversion
 * line would be answering a question nobody asked.
 */
export default function () {
  return riseEmail([
    text('You just got a {{gift_card_balance}} gift card for {{business_name}}!', [
      '{{sender_first_name}} picked it out for you. Spend it on custom stickers made from your own designs.',
    ]),
    image('{{greeting_image_url}}', 'Gift card'),
    note(['{{greeting_message}}']),
    codeBox('Gift card code:', '{{gift_card_code}}'),
    button('VIEW YOUR GIFT CARD', '{{greeting_card_url}}', { tight: true }),
    expiration('gift_card_expiration'),
    note(["Got any questions? Get in touch with us and we'll do everything we can to help."]),
  ]);
}
