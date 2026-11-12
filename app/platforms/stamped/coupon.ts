/**
 * Ported verbatim from `other emails/stamped/coupon.html`.
 *
 * Pure HTML with the platform's own variable syntax — no Liquid, no engine.
 * The preview substitutes tokens for display only; Source and Download emit
 * this string untouched, because that is what gets pasted into the platform.
 */
export default function () {
  return /*html*/ `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>Review Form</title>
    <meta name="viewport" content="width=device-width" />
    <style type="text/css">
        @import url(##fontFamilyUrl##);
        
        body {
            padding: 0 !important;
            margin: 0 auto !important;
            display: block !important;
            min-width: 100% !important;
            width: 100% !important;
            background: ##backgroundColor## !important;
            -webkit-text-size-adjust: none;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        img {
            max-width: 100%;
            display: block;
        }

        .container {
            max-width: 732px !important;
            margin: 0 auto;
        }

        p, h1, h2, h3 {
            font-family: 'Courier New', monospace !important;
            color: #000001;
        }

        /* Design system: headings are the body face, bold and uppercase at
           13px/13px — not Arial Black 18px. The old rule also beat the inline
           13px on the paragraph cell, so body copy was rendering at 15px. */
        h1 {
            font-weight: bold;
            text-transform: uppercase;
            font-size: 13px;
            line-height: 13px;
        }

        p {
            font-size: 13px;
            line-height: 17px;
        }

        @media only screen and (max-device-width: 480px) {
            .container {
                width: 100% !important;
                padding: 12px;
            }

            .stars {
                font-size: 14px !important;
                letter-spacing: -4px;
            }
        }
    </style>
</head>
<body>
  <!-- Preview Text -->
   <div style="display:none; font-size:1px; color:#ffffff; line-height:1px; max-height:0px; max-width:0px; opacity:0; overflow:hidden;">
      Here you can find what we promised.
    </div>
    <div style="display:none; font-size:1px; color:#ffffff; line-height:1px; max-height:0px; max-width:0px; opacity:0; overflow:hidden;">
      &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
    </div>
 <!-- Main Content -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: ##backgroundColor##; padding: 12px 0;">
        <tr>
            <td align="center">
                <table class="container" width="732" border="0" cellspacing="0" cellpadding="0">
                  <!-- Header Section -->
                    <!-- The 1px black rule sits on an inner cell so it is
                         inset by 12px like every other divider. A cell's
                         border spans its own padding, so with the border on
                         the padded cell the line ran the full width. -->
                    <tr>
                      <td style="padding-left: 12px; padding-right: 12px;">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                          <tr>
                            <td style="border-bottom: 1px solid #000001; font-size:0pt; line-height:0pt; text-align:left; padding-bottom: 12px;">
                              <a href="##shopUrl##">
                                <img src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/logo_footer.png?v=1734345195" alt="Stickerize" width="188" height="30" border="0" style="display: block;">
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Message Heading -->
                    <tr>
                      <td style="font-weight: bold; text-transform: uppercase; color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 13px; padding-top: 24px; padding-bottom: 24px; padding-left: 12px; padding-right: 12px;">
                        <h1>Thank you for the review</h1>
                      </td>
                    </tr>

                    <!-- Message Paragraph -->
                    <tr>
                      <td
                        style="color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 17px; padding-bottom: 36px; padding-left: 12px; padding-right: 12px;">
                        <p>Hey ##customerName##, thank you for the feedback, and for backing STICKERIZE.<br>Here is 10% off your next custom sticker order. Add the code at checkout and it applies across every material and cut, from vinyl to holographic to satin.</p>
                      </td>
                    </tr>

                    <!-- Hero Image -->
                    <!-- Below the intro: logo → heading → intro → image. -->
                    <tr>
                      <td style="padding: 0 12px 36px;">
                        <img src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/241121_Stickerize_packaging_6.jpg?v=1740917483" alt="Stickerize Hero" width="100%" style="display: block;">
                      </td>
                    </tr>

                    <!-- Coupon Code -->
                    <!-- The negative margin and the 30px wrapper are gone: the
                         box sits on the same 12px inset as the copy. -->
                    <tr>
                        <td style="padding: 0 12px 12px;">
                            <div style="padding: 23px 12px; border: 1px solid #000001; background: #fbf9f6; color: #000001; text-align: center; font-family: 'Courier New', monospace !important; font-size: 13px; line-height: 17px;">
                                ##couponCode##
                            </div>
                        </td>
                    </tr>

                    <!-- CTA Button -->
                    <!-- Two cells, label left and a text arrow right. The arrow
                         is the character rather than ico_arrow.png: it inherits
                         the link colour, so it survives the inversion Gmail and
                         Outlook force in dark mode, and it cannot skew. -->
                    <tr>
                        <td style="padding: 0 12px 36px;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" bgcolor="#000001" style="background-color: #000001;">
                                <tr>
                                    <td align="left" valign="middle" style="mso-padding-alt: 23px 12px; padding: 23px 0 23px 12px; background-color: #000001;">
                                        <a href="##shopUrl##" target="_blank" rel="noopener" style="font-family: 'Courier New', monospace !important; font-size: 13px; line-height: 18px; font-weight: 300; color: #fffffe; text-decoration: none; display: block; text-transform: uppercase;">##labelCouponShoppingButton##</a>
                                    </td>
                                    <td align="right" valign="middle" width="44" style="padding: 21px 12px 21px 0; background-color: #000001;">
                                        <a href="##shopUrl##" target="_blank" rel="noopener" style="font-family: 'Courier New', monospace !important; font-size: 20px; line-height: 18px; font-weight: 400; color: #fffffe; text-decoration: none; display: block; text-align: right;">&rarr;</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Divider -->
                    <tr>
                        <td style="padding: 0 12px 24px;">
                            <div style="height: 1px; line-height: 1px; font-size: 1px; background-color: #000001; width: 100%;">&nbsp;</div>
                        </td>
                    </tr>
                  
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 0 12px;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <th width="288" style="text-align: left; font-weight: normal; vertical-align: top;">
                                        <p style="padding-bottom: 24px; margin: 0;">Tomtebogatan 34, Stockholm, Sweden</p>
                                        <p style="margin: 0;">
                                            For information about how we process data and monitor communications please see our <a href="https://stickerize.com/pages/privacy-policy" style="color:#000001; text-decoration:none;">Privacy Policy</a> and <a href="https://stickerize.com/en-de/pages/terms-of-service" style="color:#000001; text-decoration:none;">Terms &amp; Conditions</a>
                                        </p>
                                    </th>
                                    <th width="16" style="font-weight: normal;">&nbsp;</th>
                                    <th width="396" style="text-align: left; font-weight: normal; vertical-align: top;">
                                        <p style="margin: 0;">
                                            <a href="mailto:help@stickerize.com" style="color:#000001; text-decoration:underline;">HELP@STICKERIZE.COM</a>
                                        </p>
                                    </th>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer Logo -->
                    <tr>
                        <td style="padding: 24px 12px 16px;">
                            <a href="##shopUrl##">
                                <img src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/logo_footer.png?v=1734345195" width="700" height="110" alt="" style="width: 100%; max-width: 700px; height: auto;" />
                            </a>
                        </td>
                    </tr>

                    <!-- Unsubscribe -->
                    <tr>
                        <td class="##hideOnline##" style="text-align: center; padding: 12px;">
                            <p style="color: #999999; font-size: 13px; line-height: 17px; margin: 0;">
                                ##labelUnsubscribeEmail##
                                <a href="https://stamped.io/unsubscribe?email=##customerEmail##&guid=##guid##" target="_blank" style="color: #999999; text-decoration: underline;">##labelUnsubscribeEmailLink##</a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;
}
