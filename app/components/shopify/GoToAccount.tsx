export function GoToAccount() {
  return /*html*/ `
  <!-- GoToAccount -->
  <tr>
    <td  style="text-transform: lowercase; color:#000001; font-family:'letter-gothic-std', 'Courier New', monospace; text-align:left; font-size: 15px; line-height: 18px; padding-left: 16px; padding-right: 16px;">
      If you signed up for a subscription, you can<br />customize you refill frequency anytime: 

      <p style="padding-top: 24px; padding-bottom: 41px;">
        <a href="{{account_link}}" style="color: #000000; text-decoration: underline; text-transform: uppercase;">Go to account <i style="vertical-align: 3px;">→</i></a>
      </p>
  
      <p style="padding-top: 15px; border-top: 1px solid #dedede; margin: 0;" /></p>
    </td>
  </tr>
  <!-- END GoToAccount -->`;
}
