/**
 * Rebuilt on the Shopify footer rather than ported from Klaviyo's export.
 *
 * What Klaviyo supplied was a different object entirely: a single stacked
 * column of links, each separated by a `1px #e1e0dd` hairline, with a
 * "FOLLOW US" social row and `hello@stickerize.com`. The Shopify footer is two
 * columns — 288 / 16 / 396 — with the address and policy links on the left,
 * the contact address on the right, and the wordmark beneath.
 *
 * Differences from the Shopify footer, and why:
 *
 *   - No account block. Shopify's opens with "If you'd like to manage your
 *     orders or download invoices" — copy about orders, which does not belong
 *     in a marketing email.
 *   - UNSUBSCRIBE and VIEW IN BROWSER sit under the contact address. Shopify's
 *     transactional footer carries neither; a Klaviyo campaign needs both.
 *     Placed the way the Rise.ai brief places unsubscribe, under the email.
 *   - No social row. Nothing else in the system has one.
 *
 * `{% unsubscribe_link %}` and `{% web_view_link %}` are Klaviyo's own tags and
 * are resolved by Klaviyo at send time, not here.
 */
export default function () {
  return /*html*/ `<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
<tbody>
<tr>
<td style="padding: 0 12px 32px;">
<table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
<tr>
<th class="column-top" width="288" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td class="mpb-16" style="color:#000001; font-family:'Courier New', Arial, sans-serif; text-align:left; font-size: 13px; line-height: 17px; padding-bottom: 24px;">
Tomtebogatan 34, 11338 Stockholm, Sweden
</td>
</tr>
<tr>
<td style="color:#000001; font-family:'Courier New', Arial, sans-serif; text-align:left; font-size: 13px; line-height: 17px;">
For information about how we <br class="m-hide" />process data and monitor <br class="m-hide" />communications please see our <br class="m-hide" /><a href="https://stickerize.com/pages/privacy-policy" rel="noopener" target="_blank" class="link" style="color:#000001; text-decoration:none;"><span class="link" style="color:#000001; text-decoration:none;">Privacy Policy</span></a> and <a href="https://stickerize.com/pages/terms-of-service" rel="noopener" target="_blank" class="link" style="color:#000001; text-decoration:none;"><span class="link" style="color:#000001; text-decoration:none;">Terms &amp; <br class="m-hide" />Conditions</span></a>
</td>
</tr>
</table>
</th>
<th class="column mpb-16" width="16" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">&nbsp;</th>
<th class="column-top" width="396" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tr>
<td style="color:#000001; font-family:'Courier New', Arial, sans-serif; text-align:left; font-size: 13px; line-height: 17px;">
<a href="mailto:help@stickerize.com" target="_blank" class="link-u" style="color:#000001; text-decoration:underline;"><span class="link-u" style="color:#000001; text-decoration:underline;">HELP@STICKERIZE.COM</span></a><br />
<a href="{% unsubscribe_link %}" target="_blank" class="link-u" style="color:#000001; text-decoration:underline;"><span class="link-u" style="color:#000001; text-decoration:underline;">UNSUBSCRIBE</span></a><br />
<a href="{% web_view_link %}" target="_blank" class="link-u" style="color:#000001; text-decoration:underline;"><span class="link-u" style="color:#000001; text-decoration:underline;">VIEW IN BROWSER</span></a>
</td>
</tr>
</table>
</th>
</tr>
</table>
</td>
</tr>
<tr>
<td class="fluid-img" style="font-size:0pt; line-height:0pt; text-align:left; padding-bottom: 16px; padding-left: 12px; padding-right: 12px;">
<a href="https://stickerize.com" target="_blank" rel="noopener"><img src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/logo_footer.png?v=1734345195" width="708" height="111" border="0" alt="STICKERIZE" style="width: 100%; max-width: 708px; height: auto; display: block;" /></a>
</td>
</tr>
</tbody>
</table>`;
}
