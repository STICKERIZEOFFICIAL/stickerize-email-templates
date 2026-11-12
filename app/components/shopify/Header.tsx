export function Header() {
  return /*html*/ `
    <!-- Header -->
    <!-- The rule is on an inner cell, not on the padded outer one. A cell's
         border spans its own padding too, so with the border out here the line
         ran the full width of the column while every other divider in these
         emails is inset by 12px. -->
    <tr>
      <td style="padding-left: 12px; padding-right: 12px;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
          <tr>
            <td style="border-bottom: 1px solid #000001; font-size:0pt; line-height:0pt; text-align:left; padding-bottom: 12px;">
              <a href="{{shop.url}}" target="_blank">
                <img src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/logo_footer.png?v=1734345195" width="188" height="30" border="0" alt="STICKERIZE" style="display: block;" />
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <!-- END Header -->`;
}
