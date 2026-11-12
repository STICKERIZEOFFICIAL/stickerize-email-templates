/**
 * Authored, not ported: `other emails/klaviyo/heading.html` is a 0-byte file,
 * so the kit had no heading block at all.
 *
 * Built to the design system rather than to a Klaviyo export — bold, uppercase,
 * 13px/13px Courier New on #000001 — and wrapped in the same `kl-text` cell
 * the other Klaviyo blocks use, so it drops into the editor beside them.
 *
 * Spacing follows the system: nothing on top, the role gap on the bottom —
 * 24px here, because a heading is 24px from its body. The side inset is
 * 12px, as everywhere else.
 */
export default function () {
  return /*html*/ `<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"><tbody><tr><td style="padding-left:12px;padding-right:12px;word-break:break-word;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"><tbody><tr><td class="kl-text" style="padding-top:0;padding-bottom:24px;word-break:break-word;"><div>

<table border="0" width="100%" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="font-size: 13px; line-height: 13px; font-family: 'Courier New', Arial, sans-serif; font-weight: bold; text-transform: uppercase; color: #000001; text-align: left;">Your store credits are waiting</td>
</tr>
</tbody>
</table>

</div></td></tr></tbody></table></td></tr></tbody></table>`;
}
