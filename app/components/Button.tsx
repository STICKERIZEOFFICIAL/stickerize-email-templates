export function Button({
  url,
  label,
  paddingTop = 24,
}: {
  url: string;
  label: string;
  paddingTop?: 0 | 24;
}) {
  // Two cells: label left, arrow right. The arrow is the text character rather
  // than an image — it inherits the link colour, so it survives the colour
  // inversion Gmail and Outlook force in dark mode, and it cannot skew.
  //
  // The outer padding matches the body copy either side of it, so the button
  // lines up with the text instead of running the full width.
  const link =
    "font-family:'Courier New', monospace; font-size: 13px; line-height: 18px; font-weight: 300; color:#fffffe; text-decoration:none; display: block; text-transform: uppercase;";

  return /*html*/ `
  <!-- Button -->
  <tr>
    <td style="padding: ${paddingTop}px 12px 32px;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" bgcolor="#000001" style="background-color: #000001;">
        <tr>
          <td class="l-white" align="left" valign="middle" style="mso-padding-alt: 23px 12px; padding: 23px 0 23px 12px; background-color: #000001;">
            <a href="${url}" target="_blank" rel="noopener" class="link" style="${link}">${label}</a>
          </td>
          <td class="l-white" align="right" valign="middle" width="40" style="padding: 23px 12px 23px 0; background-color: #000001;">
            <a href="${url}" target="_blank" rel="noopener" class="link" style="${link} text-align: right;">&rarr;</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <!-- END Button -->`;
}
