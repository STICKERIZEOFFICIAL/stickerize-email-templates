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

  // The arrow needs its own size. At the label's 13px/300 the glyph renders
  // thin and undersized next to the uppercase label — it reads as squashed
  // rather than as a counterpart to the text.
  const arrowLink =
    "font-family:'Courier New', monospace; font-size: 20px; line-height: 18px; font-weight: 400; color:#fffffe; text-decoration:none; display: block; text-align: right;";

  return /*html*/ `
  <!-- Button -->
  <tr>
    <td style="padding: ${paddingTop}px 12px 32px;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" bgcolor="#000001" style="background-color: #000001;">
        <tr>
          <td class="l-white" align="left" valign="middle" style="mso-padding-alt: 23px 12px; padding: 23px 0 23px 12px; background-color: #000001;">
            <a href="${url}" target="_blank" rel="noopener" class="link" style="${link}">${label}</a>
          </td>
          <td class="l-white" align="right" valign="middle" width="44" style="padding: 21px 12px 21px 0; background-color: #000001;">
            <a href="${url}" target="_blank" rel="noopener" class="link" style="${arrowLink}">&rarr;</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <!-- END Button -->`;
}
