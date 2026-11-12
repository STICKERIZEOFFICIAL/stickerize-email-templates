import { renderBody } from '~/components/BodyCopy';

/**
 * A body-copy block, used by the notifications whose copy does not come
 * through `Intro`.
 *
 * It used to carry `text-transform: lowercase`, which flattened every sentence
 * in the ten templates that use it — "Friendly reminder:" rendered as
 * "friendly reminder:". The copy in those templates was already written in
 * sentence case; the stylesheet was overriding it. That is the whole of the
 * "start each body sentence with a capital letter" fix for Payment Reminder,
 * Account Invite, Account Welcome, Password Reset, Payment Method Restore and
 * Marketing Confirmation.
 */
export function Description({
  description,
  /**
   * Bottom gap. 36px — a section gap — because this block is the last thing
   * before whatever section follows it. Pass 24 when another element of the
   * same section comes next.
   */
  gap = 36,
}: {
  /**
   * One block of copy, or several. Several is the better form: each block
   * then sits 12px below the last, which is what a deliberate new line, a
   * list item or a bullet is supposed to get. See `BodyCopy.tsx`.
   */
  description: string | readonly string[];
  gap?: 12 | 24 | 36;
}) {
  return /*html*/ `
    <tr>
      <td style="color:#000001; font-family: 'Courier New', monospace; text-align:left; font-size: 13px; font-weight: 400; line-height: 17px; padding-bottom: ${gap}px; padding-left: 12px; padding-right: 12px;">
        ${renderBody(description)}
      </td>
    </tr>
  `;
}
