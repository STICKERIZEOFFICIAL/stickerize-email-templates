export function Footer({ 
    paddingTop = "0", 
    showLoginSection = true 
  }: { 
    paddingTop?: string,
    showLoginSection?: boolean 
  } = {}) {
    return /*html*/ `
    <!-- Footer -->
    ${showLoginSection ? `
    <tr>
      <td style="padding: ${paddingTop} 16px 32px;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
      <tr>
          <td  style="border-bottom: 1px solid #c8c7c4; padding-bottom: 24px;" align="left">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                  <tr>
                      <td  style="color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 17px; padding-bottom: 8px;">
                          If you'd like to manage your orders or download invoices, <br>simply log in to your account.
                      </td>
                  </tr>															
              </table>
  
              <table border="0" cellspacing="0" cellpadding="0" role="presentation">
                  <tr>
                      <td  style="mso-line-height-alt: 17px; border-bottom: 1px solid #000001; color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 15px;">
                          <a href="https://stickerize.com/account" rel="noopener" target="_blank" class="link" style="color:#000001; text-decoration:none;"><span class="link" style="color:#000001; text-decoration:none;">GO TO ACCOUNT →</span></a>
                      </td>
                  </tr>
              </table>
          </td>
      </tr>` : ''}
      <tr>
          <td  style="padding-top: ${showLoginSection ? '12px' : paddingTop};">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                      <th class="column-top" width="288" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                          <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                  <td class="mpb-16" style="color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 17px; padding-bottom: 24px;">
                                      Tomtebogatan 34, 11338 Stockholm, Sweden
                                  </td>
                              </tr>
                              <tr>
                                  <td  style="color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 17px;">
                                      For information about how we <br class="m-hide" />process data and monitor <br class="m-hide" />communications please see our <br class="m-hide" /><a href="https://stickerize.com/pages/privacy-policy" rel="noopener" target="_blank" class="link" style="color:#000001; text-decoration:none;"><span class="link" style="color:#000001; text-decoration:none;">Privacy Policy</span></a> and <a href="https://stickerize.com/pages/terms-of-service" rel="noopener" target="_blank" class="link" style="color:#000001; text-decoration:none;"><span class="link" style="color:#000001; text-decoration:none;">Terms &amp; <br class="m-hide" />Conditions</span></a>
                                  </td>
                              </tr>
                          </table>
                      </th>
                      <th class="column mpb-16" width="16" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">&nbsp;</th>
                      <th class="column-top" width="396" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                          <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                  <td  style="color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 17px;">
                                      <a href="mailto:help@stickerize.com" target="_blank" class="link-u" style="color:#000001; text-decoration:underline;"><span class="link-u" style="color:#000001; text-decoration:underline;">HELP@STICKERIZE.COM</span></a>
                                  </td>
                              </tr>
                          </table>
                      </th>
                  </tr>
              </table>
          </td>
      </tr>
  </table>											
  </td>
  </tr>
  <tr>
  <td class="fluid-img" style="font-size:0pt; line-height:0pt; text-align:left; padding-bottom: 16px; padding-left: 12px; padding-right: 12px;">
  <a href="{{shop.url}}" target="_blank" rel="noopener"><img src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/logo_footer.png?v=1734345195" width="700" height="110" border="0" alt="" /></a>
  </td>
  </tr>
  <!-- END Footer -->`;
  }