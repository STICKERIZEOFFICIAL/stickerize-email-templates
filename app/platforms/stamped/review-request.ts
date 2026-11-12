/**
 * Ported verbatim from `other emails/stamped/review-email.html`.
 *
 * Pure HTML with the platform's own variable syntax — no Liquid, no engine.
 * The preview substitutes tokens for display only; Source and Download emit
 * this string untouched, because that is what gets pasted into the platform.
 */
export default function () {
  return /*html*/ `<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <!--[if gte mso 9]>
	<xml>
		<o:OfficeDocumentSettings>
		<o:AllowPNG/>
		<o:PixelsPerInch>96</o:PixelsPerInch>
		</o:OfficeDocumentSettings>
	</xml>
	<![endif]-->
  <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="format-detection" content="date=no" />
  <meta name="format-detection" content="address=no" />
  <meta name="format-detection" content="telephone=no" />
  <meta name="x-apple-disable-message-reformatting" />
  <!--[if !mso]><!-->
  <style type="text/css" media="all">
    @font-face {
      font-family: 'JetBrainsMono';
      font-style: italic;
      font-weight: 100 800;
      src: url("https://fonts.gstatic.com/s/jetbrainsmono/v20/tDbX2o-flEEny0FZhsfKu5WU4xD-CwOnSA.woff2") format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    @font-face {
      font-family: 'JetBrainsMono';
      font-style: normal;
      font-weight: 100 800;
      src: url("https://fonts.gstatic.com/s/jetbrainsmono/v20/tDbV2o-flEEny0FZhsfKu5WU4xD7OwE.woff2") format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
  </style>
  <!--<![endif]-->
  <title>Review Form</title>
  <!--[if gte mso 9]>
	<style type="text/css" media="all">
		sup { font-size: 100% !important; }
	</style>
	<![endif]-->
  <!-- body, html, table, thead, tbody, tr, td, div, h1, h2, h3, h4, h5, p, a, span, em, i, strong { font-family: Arial, sans-serif !important; } -->


  <!--[!if gte mso 9]><!-- -->

  <!--<![endif]--> <!--[if mso]><!-- -->

  <!--<![endif]--> <!--[if !mso]><!-->
  <style>
    .div.hideOutlook {
      display: table !important;
      margin: auto;
    }

    div.x_hideOutlook {
      display: none !important;
    }

    .table.hideOutlook {
      display: table !important;
      margin: auto;
    }

    table.x_hideOutlook {
      display: none !important;
    }

    div.showOutlook {
      line-height: 0px;
      font-size: 0px;
      height: 0px;
      margin: 0;
      padding: 0;
      overflow: hidden;
      display: none !important;
    }

    .table.showOutlook {
      line-height: 0px;
      font-size: 0px;
      height: 0px;
      margin: 0;
      padding: 0;
      overflow: hidden;
      display: none !important;
    }

    table.x_showOutlook {
      display: block !important;
    }
  </style>
  <!--<![endif]-->

  <style type="text/css" media="screen">
    body {
      padding: 0 !important;
      margin: 0 auto !important;
      display: block !important;
      min-width: 100% !important;
      width: 100% !important;
      background: #fffffe;
      -webkit-text-size-adjust: none
    }

    a {
      color: #000001;
      text-decoration: none
    }

    p {
      margin-top: 0;
      margin-left: 0 !important;
      margin-right: 0 !important;
      margin-bottom: 0
    }

    table {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      margin: 0 !important;
      -ms-interpolation-mode: bicubic;
      /* Allow smoother rendering of resized image in Internet Explorer */
    }

    img,
    a img {
      border: 0;
      outline: none;
      text-decoration: none;
    }

    #outlook a {
      padding: 0;
    }

    .ReadMsgBody {
      width: 100%;
    }

    .ExternalClass {
      width: 100%;
    }

    div,
    p,
    a,
    li,
    td,
    blockquote {
      mso-line-height-rule: exactly;
    }

    a[href^=tel],
    a[href^=sms] {
      color: inherit;
      text-decoration: none;
    }

    .ExternalClass,
    .ExternalClass p,
    .ExternalClass td,
    .ExternalClass div,
    .ExternalClass span,
    .ExternalClass font {
      line-height: 100%;
    }

    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }

    #MessageViewBody,
    #MessageWebViewDiv {
      width: 100% !important;
    }

    /* Samsung Galaxy Note 4 Samsung Mail - make email stay centered */
    .dijitReset {
      color: #000001 !important;
    }

    .x-gmail-data-detectors,
    .x-gmail-data-detectors *,
    .aBn {
      border-bottom: 0 !important;
      cursor: default !important;
    }

    /* A work-around for Gmail meddling in triggered links. */
    .a6S {
      display: none !important;
      opacity: 001 !important;
    }

    /* Prevents Gmail from displaying an download button on large, non-linked images. */
    img.g-img+div {
      display: none !important;
    }

    /* If the above doesn't work, add a .g-img class to any image in question. */
    u+#body a {
      color: inherit !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }

    #MessageViewBody a {
      color: inherit !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }


    .l-white a {
      color: #fffffe;
    }

    .l-black a {
      color: #000001;
    }

    /* Radio */
    .radio-btn {
      position: relative;
    }

    .radio-btn:before {
      position: absolute;
      content: '';
      width: 13px;
      height: 13px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #ffffff;
      border: thin solid #1c1c1c;
      border-radius: 50%;
    }

    .radio-btn:checked:before {
      background-color: #ffffff;
    }

    .radio-btn:checked:after {
      position: absolute;
      content: '';
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 10px !important;
      height: 10px !important;
      border-radius: 50%;
      background-color: #000001;
    }

    /* Checkbox */
    .check-btn {
      position: relative;
      accent-color: #1c1c1c;
    }

    .check-btn:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #ffffff;
      border: thin solid #000001;
      width: 21px;
      height: 21px;
      border-radius: 4px;
    }

    .check-btn:checked:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #000001;
    }

    .check-btn:checked:after {
      position: absolute;
      content: url("data:image/svg+xml,%3Csvg width='16px' height='10px' viewBox='0 0 16 10' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3C!-- Generator: Sketch 55.2 (78181) - https://sketchapp.com --%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg transform='translate(1.000000, 0.000000)' fill-rule='nonzero' stroke='%14FFFFFF'%3E%3Cpolyline id='Path' points='0 4.86175 4.75668 10 14 0'%3E%3C/polyline%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      color: #ffffff;
      top: 50%;
      left: 50%;
      font-size: 17px;
      width: 16px;
      height: 10px;
      transform: translate(-50%, -50%);
    }

    /* Mobile styles */
    @media only screen and (max-device-width: 480px),
    only screen and (max-width: 480px) {
      .mlh-17 {
        line-height: 17px !important;
      }

      .mpb-10 {
        padding-bottom: 10px !important;
      }

      .mpr-0 {
        padding-right: 0px !important;
      }

      .mpr-26 {
        padding-right: 26px !important;
      }

      .mpb-16 {
        padding-bottom: 16px !important;
      }

      .td,
      .m-shell {
        width: 100% !important;
        min-width: 100% !important;
      }

      .mt-left {
        text-align: left !important;
      }

      .mt-center {
        text-align: center !important;
      }

      .me-left {
        margin-right: auto !important;
      }

      .me-center {
        margin: 0 auto !important;
      }

      .mh-auto {
        height: auto !important;
      }

      .mw-auto {
        width: auto !important;
      }

      .fluid-img img {
        width: 100% !important;
        max-width: 100% !important;
        height: auto !important;
      }

      .column,
      .column-top {
        float: left !important;
        width: 100% !important;
        display: block !important;
      }

      .m-hide {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
        font-size: 0 !important;
        line-height: 0 !important;
        min-height: 0 !important;
      }

      .m-block {
        display: block !important;
      }

      .mw-100p {
        width: 100% !important;
      }

      .mw-10 {
        width: 10px !important;
      }

      .mw-img-90,
      .mw-img-90 img {
        width: 90px !important;
        height: auto !important;
      }

      .hideOutlook.m-block {
        display: block !important;
      }

      .column-top-two.mpb-10 {
        padding-bottom: 0 !important;
      }
    }

    @media screen and (max-device-width: 370px),
    only screen and (max-width: 370px) {
      .mmfz-13 {
        font-size: 13px !important;
        line-height: 16px !important;
      }
    }

    @media screen and (max-device-width: 360px),
    only screen and (max-width: 360px) {

      .column-two,
      .column-top-two {
        float: left !important;
        width: 100% !important;
        display: block !important;
      }

      .mw-100p-two {
        width: 100% !important;
      }

      .column-top-two.mpb-10 {
        padding-bottom: 10px !important;
      }
    }
  </style>
</head>

<body class="body" id="body"
  style="padding:0 !important; margin:0 auto !important; display:block !important; min-width:100% !important; width:100% !important; background:#fffffe; -webkit-text-size-adjust:none;">
  <center>
    <table width="100%" border="0" cellspacing="0" cellpadding="0"
      style="margin: 0; padding: 0; width: 100%; height: 100%;" bgcolor="#fffffe">
      <!-- Preview Text -->
      <tr class="m-hide" style="mso-hide: all;">
        <td style="font-size: 0pt; line-height: 0pt;"></td>
      </tr>
      <tr class="m-hide" style="mso-hide: all;">
        <td style="font-size: 0pt; line-height: 0pt;">Help us improve - share your experience with your recent order&#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy;
          &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy;
          &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy;
          &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy;
          &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy;
          &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy;
          &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy;
          &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &nbsp; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847;
          &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy;
          &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy;
          &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy;
          &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy;
          &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy;
          &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy;
          &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy;
          &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy;
          &shy; &shy; &shy; &nbsp;</td>
      </tr>
      <!-- END Preview Text -->
      <tr>
        <td style="margin: 0; padding: 0; width: 100%; height: 100%;" align="center" valign="top">
          <table width="732" border="0" cellspacing="0" cellpadding="0" class="m-shell">
            <tr>
              <td style="padding-top: 16px;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <!-- Header -->
                  <tr>
                    <td
                      style="color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 10px; line-height: 14px; padding-bottom: 40px; padding-left: 12px; padding-right: 12px;">
                      <p style="line-height:12px;text-align:center;"><strong>{{label_trouble_with_form}}</strong>
                        <a href="{{review_url}}" class="link-u"
                          style="color:#000001; text-decoration:underline;">{{label_review_online_link_text}}</a>
                      </p>
                    </td>
                  </tr>
                  <!-- Additional info removed -->
                  <!-- Same logo as the Shopify emails, without the copyright
                       mark, and the 1px rule inset by 12px on an inner cell
                       rather than running the full width. -->
                  <tr>
                    <td style="padding-left: 12px; padding-right: 12px;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                        <tr>
                          <td
                            style="border-bottom: 1px solid #000001; font-size:0pt; line-height:0pt; text-align:left; padding-bottom: 12px;">
                            <a href="{{shop.url}}" target="_blank">
                              <img
                                src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/logo_footer.png?v=1734345195"
                                width="188" height="30" border="0" alt="STICKERIZE" style="display: block;" />
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- END Header -->

                  <!-- Intro -->
                  <tr>
                    <td class="mlh-17"
                      style="font-weight: bold; text-transform: uppercase; color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 13px; padding-top: 24px; padding-bottom: 24px; padding-left: 12px; padding-right: 12px;">
                      Hey ##customerName##, what did you think of STICKERIZE?
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 17px; padding-bottom: 24px; padding-left: 12px; padding-right: 12px;">
                      We would be grateful to hear your feedback.<br />
                      ##message##
                    </td>
                  </tr>
                  <!-- END Intro -->

                  <!-- Form -->
                  <tr>
                    <td>
                      <!--[if !mso]><!-->

                      <form
                        action="https://stamped.io/api/ReviewSubmission?guid=##guid##&shop=337873&pubKey=337873&templateId=10180"
                        method="get" name="rateForm" style="mso-hide:all;">
                        <table style="mso-hide:all;" class="hideOutlook table" width="100%" border="0" cellspacing="0"
                          cellpadding="0">
                          <tbody>
                            <tr>
                              <td style="padding: 0 16px 22px;">
                                <div>
                                  <!-- Gender -->
                                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                      <td
                                        style="border-top: 1px solid #000001; padding: 20px 0 24px; font-size: 0pt; line-height: 0pt;"
                                        align="left">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                          <tr>
                                            <td
                                              style="font-family: 'Courier New', monospace; font-size: 13px; color: #000001; line-height: 13px; font-weight: bold; text-transform: uppercase; padding-bottom: 20px;">
                                              <label class="opt+-+GENDER+-+1+-+1+-+35683">GENDER</label>
                                            </td>
                                          </tr>
                                        </table>

                                        <input type="hidden" name="opt+-+GENDER+-+1+-+1+-+35683" value=" ">
                                        <table class="mw-100p-two" border="0" cellspacing="0" cellpadding="0">
                                          <tr>
                                            <th class="column-top-two mpb-10"
                                              style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                              <table class="me-left" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                  <td
                                                    style="padding-right: 11px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                                    <input id="female" class="radio-btn" type="radio"
                                                      name="opt+-+GENDER+-+1+-+1+-+35683" value="FEMALE" required=""
                                                      style="margin:0; width:14px; height:14px;">
                                                  </td>
                                                  <td
                                                    style="padding-right: 16px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                                    <label for="female">FEMALE</label>
                                                  </td>
                                                </tr>
                                              </table>
                                            </th>
                                            <th class="column-top-two mpb-10"
                                              style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                              <table class="me-left" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                  <td
                                                    style="padding-right: 11px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                                    <input id="male" class="radio-btn" type="radio"
                                                      name="opt+-+GENDER+-+1+-+1+-+35683" value="MALE" required=""
                                                      style="margin:0; width:14px; height:14px;">
                                                  </td>
                                                  <td
                                                    style="padding-right: 16px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                                    <label for="male">MALE</label>
                                                  </td>
                                                </tr>
                                              </table>
                                            </th>
                                            <th class="column-top-two"
                                              style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                              <table class="me-left" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                  <td
                                                    style="padding-right: 11px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                                    <label><input id="other" class="radio-btn" type="radio"
                                                        name="opt+-+GENDER+-+1+-+1+-+35683" value="OTHER" required=""
                                                        style="margin:0; width:14px; height:14px;"></label>
                                                  </td>
                                                  <td
                                                    style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                                    <label for="other">OTHER</label>
                                                  </td>
                                                </tr>
                                              </table>
                                            </th>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                  <!-- END Gender -->

                                  <!-- AGE -->
                                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                      <td
                                        style="border-top: 1px solid #000001; padding: 20px 0 24px; font-size: 0pt; line-height: 0pt;"
                                        align="left">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                          <tr>
                                            <td
                                              style="font-family: 'Courier New', monospace; font-size: 13px; color: #000001; line-height: 13px; font-weight: bold; text-transform: uppercase; padding-bottom: 20px;">
                                              <label class="opt+-+AGE+-+1+-+1+-+35684">AGE</label>
                                            </td>
                                          </tr>
                                        </table>

                                        <input type="hidden" name="opt+-+AGE+-+1+-+1+-+35684" value=" ">
                                        <table class="mw-100p-two" border="0" cellspacing="0" cellpadding="0">
                                          <tr>
                                            <th class="column-top-two mpb-10"
                                              style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                              <table class="me-left" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                  <td
                                                    style="padding-right: 11px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                                    <label><input id="age1824" class="radio-btn" type="radio"
                                                        name="opt+-+AGE+-+1+-+1+-+35684" value="18-24" required=""
                                                        style="margin:0; width:14px; height:14px;"></label>
                                                  </td>
                                                  <td
                                                    style="padding-right: 16px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                                    <label for="age1824">18-24</label>
                                                  </td>
                                                </tr>
                                              </table>
                                            </th>
                                            <th class="column-top-two mpb-10"
                                              style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                              <table border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                  <td
                                                    style="padding-right: 11px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                                    <label><input id="age2534" class="radio-btn" type="radio"
                                                        name="opt+-+AGE+-+1+-+1+-+35684" value="25-34" required=""
                                                        style="margin:0; width:14px; height:14px;"></label>
                                                  </td>
                                                  <td
                                                    style="padding-right: 16px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                                    <label for="age2534">25-34</label>
                                                  </td>
                                                </tr>
                                              </table>
                                            </th>
                                            <th class="column-top-two mpb-10"
                                              style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                              <table class="me-left" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                  <td
                                                    style="padding-right: 11px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                                    <label><input id="age3549" class="radio-btn" type="radio"
                                                        name="opt+-+AGE+-+1+-+1+-+35684" value="35-49" required=""
                                                        style="margin:0; width:14px; height:14px;"></label>
                                                  </td>
                                                  <td
                                                    style="padding-right: 16px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                                    <label for="age3549">35-49</label>
                                                  </td>
                                                </tr>
                                              </table>
                                            </th>
                                            <th class="column-top-two"
                                              style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                              <table class="me-left" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                  <td
                                                    style="padding-right: 11px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                                    <label><input id="age5069" class="radio-btn" type="radio"
                                                        name="opt+-+AGE+-+1+-+1+-+35684" value="50-69" required=""
                                                        style="margin:0; width:14px; height:14px;"></label>
                                                  </td>
                                                  <td
                                                    style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                                    <label for="age5069">50-69</label>
                                                  </td>
                                                </tr>
                                              </table>
                                            </th>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                  <!-- END AGE -->

                                  <!-- How would you rate the product? -->
                                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                      <td
                                        style="border-top: 1px solid #000001; padding: 20px 0 24px; font-size: 0pt; line-height: 0pt;"
                                        align="left">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                          <tr>
                                            <td
                                              style="font-family: 'Courier New', monospace; font-size: 13px; color: #000001; line-height: 13px; font-weight: bold; text-transform: uppercase; padding-bottom: 18px;">
                                              <label
                                                class="opt+-+HOW+LONG+TILL+YOU+NOTICED+ANY+DIFFERENCE%2fEFFECT%3f+-+1+-+1+-+34276">HOW
                                                WOULD YOU RATE THE PRODUCT?</label>
                                            </td>
                                          </tr>
                                        </table>

                                        <table class="mw-100p" border="0" cellspacing="0" cellpadding="0">
                                          <tr>
                                            <th class="column mpb-10"
                                              style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
                                              <table class="mw-100p-two" border="0" cellspacing="0" cellpadding="0"
                                                role="presentation">
                                                <tr>
                                                  <th class="column-top-two mpb-10"
                                                    style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                    <table class="me-left" border="0" cellspacing="0" cellpadding="0">
                                                      <tr>
                                                        <td
                                                          style="padding-right: 11px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                                          <span
                                                            style="padding:0;white-space: nowrap;display: inline-block;"><label
                                                              for="rating5" style=""><input type="radio"
                                                                class="radio-btn" name="ratingIndicator" value="5"
                                                                id="rating5" required=""
                                                                style="margin:0; width:14px; height:14px;"></label></span>
                                                        </td>
                                                        <td style="padding-right: 16px;">
                                                          <table width="100%" border="0" cellspacing="0"
                                                            cellpadding="0">
                                                            <tr>
                                                              <td
                                                                style="font-size:0pt; line-height:0pt; text-align:left;">
                                                                <label for="rating5" style="">
                                                                  <img
                                                                    src="https://cdn.shopify.com/s/files/1/0764/7356/5526/files/five_stars.png?v=1702657359"
                                                                    style="display: inline-block; padding-bottom: 7px;"
                                                                    width="71" height="13" border="0" alt="" />
                                                                </label>
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td
                                                                style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase; text-align: left;">
                                                                <label for="rating5"
                                                                  style="display: block; width: 100%;">Excellent</label>
                                                              </td>
                                                            </tr>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </th>
                                                  <th class="column-top-two mpb-10"
                                                    style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                    <table class="me-left" border="0" cellspacing="0" cellpadding="0">
                                                      <tr>
                                                        <td
                                                          style="padding-right: 11px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                                          <span
                                                            style="padding:0;white-space: nowrap;display: inline-block;"><label
                                                              for="rating4" style=""><input type="radio"
                                                                class="radio-btn" name="ratingIndicator" value="4"
                                                                id="rating4"
                                                                style="margin:0; width:14px; height:14px;"></label></span>
                                                        </td>
                                                        <td style="padding-right: 16px;">
                                                          <table width="100%" border="0" cellspacing="0"
                                                            cellpadding="0">
                                                            <tr>
                                                              <td
                                                                style="font-size:0pt; line-height:0pt; text-align:left;">
                                                                <label for="rating4" style="">
                                                                  <img
                                                                    src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/7bf59f367018bb3c4187d404f159e26c.png?v=1743607227"
                                                                    style="display: inline-block; padding-bottom: 7px;"
                                                                    width="71" height="13" border="0" alt="" />
                                                                </label>
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td
                                                                style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase; text-align: left;">
                                                                <label for="rating4"
                                                                  style="display: block; width: 100%;">GOOD</label>
                                                              </td>
                                                            </tr>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </th>
                                                  <th class="column-top-two"
                                                    style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                    <table class="me-left" border="0" cellspacing="0" cellpadding="0">
                                                      <tr>
                                                        <td
                                                          style="padding-right: 11px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                                          <span
                                                            style="padding:0;white-space: nowrap;display: inline-block;"><label
                                                              for="rating3" style=""><input type="radio"
                                                                class="radio-btn" name="ratingIndicator" value="3"
                                                                id="rating3"
                                                                style="margin:0; width:14px; height:14px;"></label></span>
                                                        </td>
                                                        <td class="mpr-0" style="padding-right: 16px;">
                                                          <table width="100%" border="0" cellspacing="0"
                                                            cellpadding="0">
                                                            <tr>
                                                              <td
                                                                style="font-size:0pt; line-height:0pt; text-align:left;">
                                                                <label for="rating3" style="">
                                                                  <img
                                                                    src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/1.png?v=1743607546"
                                                                    style="display: inline-block; padding-bottom: 7px;"
                                                                    width="71" height="13" border="0" alt="" />
                                                                </label>
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td
                                                                style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase; text-align: left;">
                                                                <label for="rating3"
                                                                  style="display: block; width: 100%;">OK</label>
                                                              </td>
                                                            </tr>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </th>
                                                </tr>
                                              </table>
                                            </th>
                                            <th class="column mpb-10"
                                              style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
                                              <table class="mw-100p-two" border="0" cellspacing="0" cellpadding="0"
                                                role="presentation">
                                                <tr>
                                                  <th class="column-top-two mpb-10"
                                                    style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                    <table class="me-left" border="0" cellspacing="0" cellpadding="0">
                                                      <tr>
                                                        <td
                                                          style="padding-right: 11px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                                          <span
                                                            style="padding:0;white-space: nowrap;display: inline-block;"><label
                                                              for="rating3" style=""><input type="radio"
                                                                class="radio-btn" name="ratingIndicator" value="3"
                                                                id="rating3"
                                                                style="margin:0; width:14px; height:14px;"></label></span>
                                                        </td>
                                                        <td class="mpr-26" style="padding-right: 16px;">
                                                          <table width="100%" border="0" cellspacing="0"
                                                            cellpadding="0">
                                                            <tr>
                                                              <td
                                                                style="font-size:0pt; line-height:0pt; text-align:left;">
                                                                <label for="rating3" style="">
                                                                  <img
                                                                    src="https://cdn.shopify.com/s/files/1/0764/7356/5526/files/two_stars.png?v=1702657361"
                                                                    style="display: inline-block; padding-bottom: 7px;"
                                                                    width="71" height="13" border="0" alt="" />
                                                                </label>
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td
                                                                style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase; text-align: left;">
                                                                <label for="rating3"
                                                                  style="display: block; width: 100%;">BAD</label>
                                                              </td>
                                                            </tr>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </th>
                                                  <th class="column-top-two"
                                                    style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                    <table class="me-left" border="0" cellspacing="0" cellpadding="0">
                                                      <tr>
                                                        <td
                                                          style="padding-right: 11px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                                          <span
                                                            style="padding:0;white-space: nowrap;display: inline-block;"><label
                                                              for="rating1" style=""><input type="radio"
                                                                class="radio-btn" name="ratingIndicator" value="1"
                                                                id="rating1"
                                                                style="margin:0; width:14px; height:14px;"></label></span>
                                                        </td>
                                                        <td>
                                                          <table width="100%" border="0" cellspacing="0"
                                                            cellpadding="0">
                                                            <tr>
                                                              <td
                                                                style="font-size:0pt; line-height:0pt; text-align:left;">
                                                                <label for="rating1" style="">
                                                                  <img
                                                                    src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/one_star_review.png?v=1743607623"
                                                                    style="display: inline-block; padding-bottom: 7px;"
                                                                    width="71" height="13" border="0" alt="" />
                                                                </label>
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td
                                                                style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase; text-align: left;">
                                                                <label for="rating1"
                                                                  style="display: block; width: 100%;">POOR</label>
                                                              </td>
                                                            </tr>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </th>
                                                </tr>
                                              </table>
                                            </th>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                  <!-- END How would you rate the product? -->

                                  <!-- What were you satisfied with? -->
                                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                      <td
                                        style="border-top: 1px solid #000001; padding: 20px 0 24px; font-size: 0pt; line-height: 0pt;"
                                        align="left">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                          <tr>
                                            <td
                                              style="font-family: 'Courier New', monospace; font-size: 13px; color: #000001; line-height: 13px; font-weight: bold; text-transform: uppercase; padding-bottom: 20px;">
                                              <label class="opt+-+WHAT+WERE+YOU+SATISFIED+WITH%3f+-+1+-+1+-+35685">WHAT
                                                WERE YOU SATISFIED
                                                WITH?</label>
                                            </td>
                                          </tr>
                                        </table>

                                        <input type="hidden"
                                          name="opt+-+WHAT+WERE+YOU+SATISFIED+WITH%3f+-+1+-+1+-+35685" value=" ">
                                        <table class="mw-100p" border="0" cellspacing="0" cellpadding="0">
                                          <tr>
                                            <th class="column-top mpb-10"
                                              style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                              <table class="mw-100p-two" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                  <th class="column-top-two mpb-10"
                                                    style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                    <table class="me-left" border="0" cellspacing="0" cellpadding="0"
                                                      role="presentation">
                                                      <tr>
                                                        <td
                                                          style="padding-right: 11px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                                          <label><input id="satisfaction1824" class="radio-btn"
                                                              type="radio"
                                                              name="opt+-+WHAT+WERE+YOU+SATISFIED+WITH%3f+-+1+-+1+-+35685"
                                                              value="QUALITY" required=""
                                                              style="margin:0; width:14px; height:14px;"></label>
                                                        </td>
                                                        <td
                                                          style="padding-right: 16px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                                          <label for="satisfaction1824">QUALITY</label>
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </th>
                                                  <th class="column-top-two mpb-10"
                                                    style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                    <table class="me-left" border="0" cellspacing="0" cellpadding="0"
                                                      role="presentation">
                                                      <tr>
                                                        <td
                                                          style="padding-right: 11px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                                          <label><input id="satisfaction2534" class="radio-btn"
                                                              type="radio"
                                                              name="opt+-+WHAT+WERE+YOU+SATISFIED+WITH%3f+-+1+-+1+-+35685"
                                                              value="SHIPPING" required=""
                                                              style="margin:0; width:14px; height:14px;"></label>
                                                        </td>
                                                        <td
                                                          style="padding-right: 16px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                                          <label for="satisfaction2534">SHIPPING</label>
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </th>
                                                  <th class="column-top-two"
                                                    style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                    <table class="me-left" border="0" cellspacing="0" cellpadding="0"
                                                      role="presentation">
                                                      <tr>
                                                        <td
                                                          style="padding-right: 11px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                                          <label><input id="satisfaction3549" class="radio-btn"
                                                              type="radio"
                                                              name="opt+-+WHAT+WERE+YOU+SATISFIED+WITH%3f+-+1+-+1+-+35685"
                                                              value="SERVICE" required=""
                                                              style="margin:0; width:14px; height:14px;"></label>
                                                        </td>
                                                        <td
                                                          style="padding-right: 16px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                                          <label for="satisfaction3549">SERVICE</label>
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </th>
                                                </tr>
                                              </table>
                                            </th>
                                            <th class="column-top"
                                              style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                              <table class="mw-100p-two" border="0" cellspacing="0" cellpadding="0"
                                                role="presentation">
                                                <tr>
                                                  <th class="column-top-two mpb-10"
                                                    style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                    <table class="me-left" border="0" cellspacing="0" cellpadding="0"
                                                      role="presentation">
                                                      <tr>
                                                        <td
                                                          style="padding-right: 11px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                                          <label><input class="radio-btn" type="radio"
                                                              name="opt+-+WHAT+WERE+YOU+SATISFIED+WITH%3f+-+1+-+1+-+35685"
                                                              value="DELIVERY" required=""
                                                              style="margin:0; width:14px; height:14px;"></label>
                                                        </td>
                                                        <td
                                                          style="padding-right: 16px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                                          DELIVERY
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </th>
                                                  <th class="column-top-two"
                                                    style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                    <table class="me-left" border="0" cellspacing="0" cellpadding="0"
                                                      role="presentation">
                                                      <tr>
                                                        <td
                                                          style="padding-right: 11px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                                          <label><input class="radio-btn" type="radio"
                                                              name="opt+-+WHAT+WERE+YOU+SATISFIED+WITH%3f+-+1+-+1+-+35685"
                                                              value="OTHER" required=""
                                                              style="margin:0; width:14px; height:14px;"></label>
                                                        </td>
                                                        <td
                                                          style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                                          OTHER
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </th>
                                                </tr>
                                              </table>
                                            </th>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                  <!-- END What were you satisfied with? -->

                                  <!-- Would you recommend this product? -->
                                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                      <td
                                        style="border-top: 1px solid #000001; padding: 20px 0 24px; font-size: 0pt; line-height: 0pt;"
                                        align="left">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                          <tr>
                                            <td
                                              style="font-family: 'Courier New', monospace; font-size: 13px; color: #000001; line-height: 13px; font-weight: bold; text-transform: uppercase; padding-bottom: 20px;">
                                              <label
                                                class="opt+-+WOULD+YOU+RECOMMEND+THIS+PRODUCT%3f+-+1+-+1+-+35686">WOULD
                                                YOU RECOMMEND THIS PRODUCT?</label>
                                            </td>
                                          </tr>
                                        </table>

                                        <input type="hidden"
                                          name="opt+-+WOULD+YOU+RECOMMEND+THIS+PRODUCT%3f+-+1+-+1+-+35686" value=" ">
                                        <table border="0" cellspacing="0" cellpadding="0">
                                          <tr>
                                            <td
                                              style="padding-right: 11px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                              <label><input id="sayyes" class="radio-btn" type="radio"
                                                  name="opt+-+WOULD+YOU+RECOMMEND+THIS+PRODUCT%3f+-+1+-+1+-+35686"
                                                  value="YES" required=""
                                                  style="margin:0; width:14px; height:14px;"></label>
                                            </td>
                                            <td
                                              style="padding-right: 16px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                              <label for="sayyes">YES</label>
                                            </td>
                                            <td
                                              style="padding-right: 11px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                              <label><input id="sayno" class="radio-btn" type="radio"
                                                  name="opt+-+WOULD+YOU+RECOMMEND+THIS+PRODUCT%3f+-+1+-+1+-+35686"
                                                  value="NO" required=""
                                                  style="margin:0; width:14px; height:14px;"></label>
                                            </td>
                                            <td
                                              style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                              <label for="sayno">NO</label>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                  <!-- END Would you recommend this product? -->

                                  <!-- Would you order again? -->
                                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                      <td
                                        style="border-top: 1px solid #000001; border-bottom: 1px solid #000001; padding: 20px 0 24px; font-size: 0pt; line-height: 0pt;"
                                        align="left">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                          <tr>
                                            <td
                                              style="font-family: 'Courier New', monospace; font-size: 13px; color: #000001; line-height: 13px; font-weight: bold; text-transform: uppercase; padding-bottom: 20px;">
                                              <label class="opt+-+WOULD+YOU+ORDER+AGAIN%3f+-+1+-+1+-+35687">WOULD YOU
                                                ORDER AGAIN?</label>
                                            </td>
                                          </tr>
                                        </table>

                                        <input type="hidden" name="opt+-+WOULD+YOU+ORDER+AGAIN%3f+-+1+-+1+-+35687"
                                          value=" ">
                                        <table border="0" cellspacing="0" cellpadding="0">
                                          <tr>
                                            <td
                                              style="padding-right: 11px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                              <label><input id="order_sayyes" class="radio-btn" type="radio"
                                                  name="opt+-+WOULD+YOU+ORDER+AGAIN%3f+-+1+-+1+-+35687" value="YES"
                                                  required="" style="margin:0; width:14px; height:14px;"></label>
                                            </td>
                                            <td
                                              style="padding-right: 16px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                              <label for="order_sayyes">YES</label>
                                            </td>
                                            <td
                                              style="padding-right: 11px; font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                              <label><input id="order_sayno" class="radio-btn" type="radio"
                                                  name="opt+-+WOULD+YOU+ORDER+AGAIN%3f+-+1+-+1+-+35687" value="NO"
                                                  required="" style="margin:0; width:14px; height:14px;"></label>
                                            </td>
                                            <td
                                              style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 17px; color: #000001; text-transform: uppercase;">
                                              <label for="order_sayno">NO</label>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                  <!-- END Would you order again? -->
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td
                                style="font-family: 'Courier New', monospace; font-size: 13px; color: #000001; line-height: 13px; font-weight: bold; text-transform: uppercase; padding: 0 16px 16px;">
                                TITLE OF REVIEW
                              </td>
                            </tr>
                            <tr>
                              <td class="c-grey"
                                style="padding: 0 16px 30px; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 17px; color:#979594;">
                                <ul style="margin:0;padding:0;"> <input placeholder="SOMETHING" class="title-review"
                                    type="text" name="reviewTitle" required=""
                                    style="font-size: 1em; padding-left: 3px; min-height: 54px; width: 99%; border: solid 1px #bababa; font-family: inherit; border-color:#c9c7c5; padding:12px; -webkit-box-sizing:border-box; -moz-box-sizing:border-box; box-sizing:border-box;">
                                </ul>
                              </td>
                            </tr>
                            <tr>
                              <td
                                style="font-family: 'Courier New', monospace; font-size: 13px; color: #000001; line-height: 13px; font-weight: bold; text-transform: uppercase; padding: 0 16px 16px;">
                                TELL US MORE
                              </td>
                            </tr>
                            <tr>
                              <td class="c-grey"
                                style="padding: 0 16px 24px; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 17px; color:#979594;">
                                <ul style="margin:0;padding:0;">
                                  <textarea placeholder="for example: what did you like the most about stickerize?"
                                    class="textarea-review" name="reviewMessage" required="" rows="5" cols="75"
                                    style="font-size: 1em; width: 99%; border: solid 1px #bababa; font-family: inherit; border-color:#c9c7c5; min-height:200px; padding:12px; -webkit-box-sizing:border-box; -moz-box-sizing:border-box; box-sizing:border-box;"></textarea>
                                  <br>
                                  <p class="red"></p>
                                </ul>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <input type="hidden" name="guid" value="##guid##">
                        <input type="hidden" name="shop" value="##shopId##">
                        <div class="hideOutlook div m-block" style="text-align:center; mso-hide:all;">
                          <button class="mw-100p" type="submit"
                            style="display: block; width: 708px; max-width: 708px; cursor: pointer; background-color: #000001; background: #000001; color: #fffffe; -webkit-appearance: none; -moz-appearance: none; appearance: none; padding: 23px 12px; height: initial; font-size: 13px; line-height: 18px; border:none; margin:auto; font-family: 'Courier New', monospace; font-weight: 300; text-align:left;"
                            ##disabledbutton##="">SUBMIT <span
                              style="float: right; font-size: 20px; line-height: 18px; font-weight: 400; color: #fffffe; font-family: 'Courier New', monospace;"
                              aria-hidden="true">&rarr;</span></button>
                        </div>
                      </form>
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td
                            style="text-transform: uppercase; color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 17px; padding-top: 24px; padding-bottom: 32px; padding-left: 12px; padding-right: 12px;">
                            By submitting this review, you accept our <a href="#" target="_blank" class="link-u"
                              style="color:#000001; text-decoration:underline;"><span class="link-u"
                                style="color:#000001; text-decoration:underline;">privacy policy</span></a> and <a
                              href="#" target="_blank" class="link-u"
                              style="color:#000001; text-decoration:underline;"><span class="link-u"
                                style="color:#000001; text-decoration:underline;">terms &amp; conditions</span></a>
                          </td>
                        </tr>
                      </table>
                      <!--<![endif]-->

                      <!--[!if gte mso 9]><!-- -->
                      <div class="showOutlook"
                        style="line-height:0px; font-size:0px; height:0px; margin:0; padding:0; overflow:hidden;">&nbsp;
                      </div>
                      <div align="center">
                        <table class="showOutlook table"
                          style="display:none; line-height:0px; font-size:0px; height:0px; margin:0; padding:0; overflow:hidden; width:330px;"
                          cellspacing="0" cellpadding="0" border="0" align="center">
                          <tbody>
                            <tr>
                              <th style="padding-bottom: 30px;" align="center">
                                <div id="review-form-stars" align="center">
                                  <div style="width:100%; text-align:center;color:#ffd700 !important;" align="center"><a
                                      href="https://stamped.io/ReviewForm?guid=##guid##&amp;rating=1"
                                      style="font-size:60px; text-decoration:none; color:#ffd700 !important;"
                                      class="star-icon">
                                      <img
                                        src="https://cdn.shopify.com/s/files/1/0764/7356/5526/files/ico_star.png?v=1702658473"
                                        width="52" height="50" border="0" alt="" />
                                    </a><a href="https://stamped.io/ReviewForm?guid=##guid##&amp;rating=2"
                                      style="font-size:60px; text-decoration:none; color:#ffd700 !important;"
                                      class="star-icon">
                                      <img
                                        src="https://cdn.shopify.com/s/files/1/0764/7356/5526/files/ico_star.png?v=1702658473"
                                        width="52" height="50" border="0" alt="" />
                                    </a><a href="https://stamped.io/ReviewForm?guid=##guid##&amp;rating=3"
                                      style="font-size:60px; text-decoration:none; color:#ffd700 !important;"
                                      class="star-icon">
                                      <img
                                        src="https://cdn.shopify.com/s/files/1/0764/7356/5526/files/ico_star.png?v=1702658473"
                                        width="52" height="50" border="0" alt="" />
                                    </a><a href="https://stamped.io/ReviewForm?guid=##guid##&amp;rating=4"
                                      style="font-size:60px; text-decoration:none; color:#ffd700 !important;"
                                      class="star-icon">
                                      <img
                                        src="https://cdn.shopify.com/s/files/1/0764/7356/5526/files/ico_star.png?v=1702658473"
                                        width="52" height="50" border="0" alt="" />
                                    </a><a href="https://stamped.io/ReviewForm?guid=##guid##&amp;rating=5"
                                      style="font-size:60px; text-decoration:none; color:#ffd700 !important;"
                                      class="star-icon">
                                      <img
                                        src="https://cdn.shopify.com/s/files/1/0764/7356/5526/files/ico_star.png?v=1702658473"
                                        width="52" height="50" border="0" alt="" />
                                    </a> </div>
                                </div>
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </div><!--<![endif]-->
                    </td>
                  </tr>

                  <!-- END Form -->

                  <!-- Footer -->
                  <tr>
                    <td style="padding: 0 16px 32px;">
                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <th class="column-top" width="334"
                            style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td class="mpb-16"
                                  style="color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 17px; padding-bottom: 24px;">
                                  Tomtebogatan 34, Stockholm, Sweden
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style="color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 17px;">
                                  For information about how we <br class="m-hide" />process data and monitor <br
                                    class="m-hide" />communications please see our <br class="m-hide" /><a href="#"
                                    rel="noopener" target="_blank" class="link"
                                    style="color:#000001; text-decoration:none;"><span class="link"
                                      style="color:#000001; text-decoration:none;">Privacy Policy</span></a> and <a
                                    href="#" rel="noopener" target="_blank" class="link"
                                    style="color:#000001; text-decoration:none;"><span class="link"
                                      style="color:#000001; text-decoration:none;">Terms &amp; <br
                                        class="m-hide" />Conditions</span></a>
                                </td>
                              </tr>
                            </table>
                          </th>
                          <th class="column mpb-16" width="16"
                            style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">&nbsp;</th>
                          <th class="column-top" width="350"
                            style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                              <tr>
                                <td
                                  style="color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 17px;">
                                  <a href="mailto:hello@stickerize.com" target="_blank" class="link-u"
                                    style="color:#000001; text-decoration:underline;"><span class="link-u"
                                      style="color:#000001; text-decoration:underline;">HELLO@STICKERIZE.COM</span></a>
                                </td>
                              </tr>
                            </table>
                          </th>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td class="fluid-img"
                      style="font-size:0pt; line-height:0pt; text-align:left; padding-bottom: 16px; padding-left: 12px; padding-right: 12px;">
                      <img src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/logo_footer.png?v=1734345195"
                        width="700" height="110" border="0" alt="" />
                    </td>
                  </tr>
                  <!-- END Footer -->
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </center>
</body>

</html>`;
}
