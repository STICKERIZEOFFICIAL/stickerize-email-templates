/**
 * Ported from `other emails/klaviyo/cta.html`, with the arrow moved.
 *
 * The arrow leads the label now, 12px in front of it, rather than sitting at
 * the far right of the bar — the same change made to every CTA on every
 * platform. The bar's width, height and 12px outer inset are untouched.
 *
 * The two anchors carry their padding inline here, which the exported block
 * did not: `.btn-24-12 a { padding: 24px 12px; }` in the kit's head was
 * giving *both* of them 12px on *both* sides, so once the cells swapped, the
 * arrow's right padding and the label's left padding stacked with the cell's
 * own and the gap came out at 36px. Inline padding beats the class, each
 * anchor keeps the 24px vertical it always had, and the gap is the label
 * cell's 12px and nothing else.
 *
 * Pure HTML with the platform's own variable syntax — no Liquid, no engine.
 * The preview substitutes tokens for display only; Source and Download emit
 * this string untouched, because that is what gets pasted into the platform.
 */
export default function () {
  return /*html*/ `<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"><tbody><tr><td style="padding-left:12px;padding-right:12px;padding-top:0;padding-bottom:36px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"><tbody><tr><td style="word-break:break-word;"><div>

 <table border="0" width="100%" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td><a href="https://www.stickerize.com/en-se/account/settings"><!-- Button --></a>
<table border="0" width="100%" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="btn-24-12 c-white l-white" style="mso-padding-alt: 24px 12px; color: #fffffe;" bgcolor="#000001">
<table border="0" width="100%" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td align="left" valign="middle" style="color: #fffffe; font-family: 'Courier New', Arial, sans-serif; font-size: 20px; line-height: 17px; font-weight: 400; text-align: left;"><a href="https://www.stickerize.com/en-se/account/settings" style="color: #fffffe; text-decoration: none; display: block; padding: 22px 0 26px 12px;">&rarr;</a></td>
<td class="btn" width="100%" style="color: #fffffe; font-family: 'Courier New', Arial, sans-serif; text-align: left; font-weight: 300; font-size: 13px; line-height: 17px; text-transform: uppercase; padding-left: 12px;"><a href="https://www.stickerize.com/en-se/account/settings" style="color: #fffffe; text-decoration: none; display: block; padding: 24px 12px 24px 0;">CHECK YOUR STORE CREDITS</a></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<a href="https://www.stickerize.com/en-se/account/settings"><!-- END Button --></a></td>
</tr>
</tbody>
</table> 

</div></td></tr></tbody></table></td></tr></tbody></table>`;
}
