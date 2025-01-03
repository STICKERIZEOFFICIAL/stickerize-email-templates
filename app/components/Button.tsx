export function Button({
  url,
  label,
  paddingTop = 24,
}: {
  url: string;
  label: string;
  paddingTop?: 0 | 24;
}) {
  return /*html*/ `
  <!-- Button -->
  <tr>
    <td style="padding: ${paddingTop}px 0 32px;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#000001">
        <tr>
          <td class="btn l-white ff-j"
            style="mso-padding-alt:22px 12px; font-size: 14px; text-transform: uppercase; line-height: 18px; color:#fffffe; text-align:left; font-family:'JetBrainsMono','Courier New',monospace; font-weight: 300;">
            <a href="${url}" target="_blank" class="link" rel="noopener"
              style="display: block; padding: 22px 12px; text-decoration:none; color:#fffffe;">
              ${label} 
              <!-- Black arrow for desktop -->
              <img class="m-hide" src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/ico_arrow.png?v=1734347584" align="right"  style="vertical-align: top; font-size:14px; line-height:18px; color:#000001; font-family:'Courier New', monospace; text-align:left;" width="10" height="12" border="0" alt="" />
              <!-- White arrow for mobile -->
              <img class="m-block" src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/ico_arrow_black.png?v=1735909071" align="right"  style="vertical-align: top; font-size:14px; line-height:18px; color:#000001; font-family:'Courier New', monospace; text-align:left; display: none;" width="10" height="12" border="0" alt="" />
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <!-- END Button -->`;
}
