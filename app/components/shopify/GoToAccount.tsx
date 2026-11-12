/**
 * Currently imported by no template — the account block that ships lives in
 * `Footer.tsx`. Kept, and kept correct, so reviving it does not reintroduce
 * the `text-transform: lowercase` and 41px gap it used to carry.
 */
export function GoToAccount() {
  return /*html*/ `
  <!-- GoToAccount -->
  <tr>
    <td  style="color:#000001; font-family: 'Courier New', monospace; text-align:left; font-size: 13px; line-height: 17px; padding-left: 12px; padding-right: 12px;">
      If you signed up for a subscription, you can<br />customize your refill frequency anytime:

      <p style="padding-top: 12px; padding-bottom: 36px;">
        <a href="{{account_link}}" style="color: #000001; text-decoration: underline; text-transform: uppercase;">Go to your account <i style="vertical-align: 3px;">→</i></a>
      </p>
    </td>
  </tr>
  <!-- END GoToAccount -->`;
}
