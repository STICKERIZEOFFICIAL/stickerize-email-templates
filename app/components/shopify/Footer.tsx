export function Footer({ paddingTop = '0' }: { paddingTop?: string } = {}) {
  return /*html*/ `
  <!-- Footer -->
  <tr>
    <td style="padding: ${paddingTop} 16px 32px;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <th class="column-top" width="334" style="text-transform: lowercase; font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td class="mfz-14 mlh-17" style="color:#000001; font-family:'letter-gothic-std', 'Courier New', monospace; text-align:left; font-size: 15px; line-height: 18px; padding-bottom: 16px;">
                  Centralplan 15, Stockholm, Sweden
                </td>
              </tr>
              <tr>
                <td class="mfz-14 mlh-17" style="color:#000001; font-family:'letter-gothic-std', 'Courier New', monospace; text-align:left; font-size: 15px; line-height: 18px;">
                  For information about how we process data and monitor communications please see our <a href="#" target="_blank" class="link" style="color:#000001; text-decoration:none;"><span class="link" style="color:#000001; text-decoration:none;">Privacy Policy</span></a> and <a href="#" target="_blank" class="link" style="color:#000001; text-decoration:none;"><span class="link" style="color:#000001; text-decoration:none;">Terms &amp; Conditions</span></a>
                </td>
              </tr>
            </table>
          </th>
          <th class="column mpb-16" width="16" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">&nbsp;</th>
          <th class="column-top" width="350" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td class="mfz-14 mlh-17" style="color:#000001; font-family:'letter-gothic-std', 'Courier New', monospace; text-align:left; font-size: 15px; line-height: 18px;">
                  <a href="mailto:hello@swoop.com" target="_blank" class="link" style="color:#000001; text-decoration:none;"><span class="link" style="color:#000001; text-decoration:underline;">HELLO@SWOOP.COM</span></a>
                  {% if unsubscribe_url %}
                  <br />
                  <a href="{{ unsubscribe_url }}" target="_blank" class="link" style="color:#000001; text-decoration:none;"><span class="link" style="color:#000001; text-decoration:underline;">UNSUBSCRIBE</span></a>
                  {% endif %}
                </td>
              </tr>
            </table>
          </th>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td class="fluid-img" style="font-size:0pt; line-height:0pt; text-align:left; padding-bottom: 16px; padding-left: 16px; padding-right: 16px;">
      <img src="https://cdn.shopify.com/s/files/1/0764/7356/5526/files/logo_footer.png?v=1702567429" width="700" height="140" border="0" alt="" />
    </td>
  </tr>
  <!-- END Footer -->`;
}
