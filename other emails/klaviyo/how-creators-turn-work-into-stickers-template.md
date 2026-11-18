# Klaviyo email template: How creators turn work into stickers

## Source

| | |
|---|---|
| Flow | Post purchase - Email Collaborator - 42 days after fulfuilment (live) |
| Trigger | 42 day delay, then this single email |
| Template | 2026-06-03 05:28 Email - #1 - Final Final (ID `UJkp6d`, drag and drop editor) |
| Subject | How creators turn work into stickers |
| Preview text | A few collaborations we've loved (hidden text inside the HTML; the flow's preview text field is empty) |
| From | Stickerize, help@stickerize.com |
| Rendered preview | how-creators-turn-work-into-stickers-preview.png |

The HTML at the end is the live template code with one fix: the SEE MORE WORK text is set to white directly, so it can't render black on the black button in Samsung Mail.

## Global design

| Property | Value |
|---|---|
| Content width | 724px, centered (`m-shell`) |
| Outer background | `#F5F3F0` with tiled texture `images_bg85ede.png` |
| Content background | `#FBF9F6` |
| Text colour | `#000001` (near black, avoids dark mode inversion) |
| Text font | Courier New, Arial fallback |
| Body text | 13px, line height 130% |
| Labels | 13px bold, uppercase, line height 17px |
| Button font | JetBrains Mono 300 (Google Fonts import), Arial fallback, 13px / 17px |
| Side padding | 12px left and right on every block |
| Vertical rhythm | 12px between blocks |
| Dividers | 1px solid `#e1e0dd` |
| Mobile (480px and below) | Shell goes 100% wide, images scale to 100% of their cell, 2 image rows stay side by side at 49% / 2% / 49% |
| Dark mode | `c-*`, `bg-*`, `l-*` classes keep the same colours under `prefers-color-scheme: dark` and Outlook `[data-ogsc]` |

## Sections, top to bottom

The HTML comments come from the Klaviyo layout and don't describe the content (for example the "Logo" block holds the heading). The table below goes by what each block shows.

| # | HTML comment | What it shows |
|---|---|---|
| 1 | Preview Text | Hidden preview text, then the header image |
| 2 | Logo | Heading label |
| 3 | Image Block - 1 Image | Intro paragraph |
| 4 | Image Block - 2 Images | John Booth image pair |
| 5 | Image Block - 3 Images | JOHN BOOTH label |
| 6 | Image Block - 4 Images | John Booth text, Daria Solak pair + label + text, Bernardo Henning pair + label + text, button |
| 7 | Title | Footer links and social icons |
| 8 to 11 | Text, Icons, CTA, Footer | Empty placeholder regions |

### 1. Header

Full width image, 724px, alt "Stickerize", links to https://www.stickerize.com/

![Header](https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Frame_1171275816.png?v=1775824995)

### 2. Heading

`A FEW COLLABORATIONS WE’VE LOVED` (label style)

### 3. Intro

Some stickers are made to sell. Others are made to stay. The collaborations we remember best feel considered from the beginning - not loud, just clear in identity and right in execution.

### 4. Collaborator block (repeats 3 times)

Each block is: a row of 2 images (343px each, 10px gap, both link to https://www.stickerize.com/), then the name label, then the description.

**John Booth**

![John Booth 1](https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Email_1_Section_1_1.jpg?v=1775045108) ![John Booth 2](https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Email_1_Section_1_2.jpg?v=1775045109)

`JOHN BOOTH`

Built for expression, turning John Booth’s vibrant compositions into stickers designed to be arranged, combined, and reimagined across surfaces. Created to move beyond a single format, inviting variation through placement and layering. Each element holds its color, energy, and character in every context.

**Daria Solak**

![Daria Solak 1](https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Email_1_Section_2_1.jpg?v=1775045157) ![Daria Solak 2](https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Email_1_Section_2_2.jpg?v=1775045158)

`DARIA SOLAK`

From sketch to object, translating Daria Solak’s illustrated world into stickers that carry her character, detail, and charm. What begins as illustration becomes something tangible, made to be kept and returned to. A natural extension of her world, brought into everyday use.

**Bernardo Henning**

![Bernardo Henning 1](https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Email_1_Section3_1.jpg?v=1775045183) ![Bernardo Henning 2](https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Email_1_Section3_2.jpg?v=1775045184)

`BERNARDO HENNING`

Bringing Bernardo Henning’s work into the physical, where bold, graphic composition is executed with precision, holding its clarity, contrast, and intent in every detail. Every line, edge, and color remains sharp and controlled across surfaces. A faithful extension of the work, true to its original form.

### 5. Button

Full width black bar (`#000001`), padding 24px 12px, text `SEE MORE WORK` in white (`#fffffe`) on the left, 10px arrow icon on the right. Links to https://www.instagram.com/stickerizee

![Arrow](https://d3k81ch9hvuctc.cloudfront.net/company/Td2hz3/images/images_ico_arrow_right8c90b.png)

### 6. Footer links

Stacked rows, each with a 1px `#e1e0dd` top border and 16px padding above and below, label style without bold.

| Row | Link |
|---|---|
| GO TO STICKERIZE | https://www.stickerize.com |
| HELP@STICKERIZE.COM | mailto:HELP@STICKERIZE.COM |
| VIEW IN BROWSER | `{% web_view_link %}` |
| UNSUBSCRIBE | `{% unsubscribe_link %}` |
| FOLLOW US + icons on the right | Facebook https://www.facebook.com/profile.php?id=61572302414815, Instagram https://www.instagram.com/stickerizee, LinkedIn https://www.linkedin.com/company/stickerize/ |

Social icons are 16px with 12px gaps:

![Facebook](https://d3k81ch9hvuctc.cloudfront.net/company/Td2hz3/images/images_ico_facebookb805a.png) ![Instagram](https://d3k81ch9hvuctc.cloudfront.net/company/Td2hz3/images/images_ico_instagrambae9e.png) ![LinkedIn](https://d3k81ch9hvuctc.cloudfront.net/company/Td2hz3/images/images_ico_linkedinb1177.png)

## Image assets

| Use | File | Shown at | Source |
|---|---|---|---|
| Header | Frame_1171275816.png | 724px | https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Frame_1171275816.png?v=1775824995 |
| John Booth 1 | Email_1_Section_1_1.jpg | 343px | https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Email_1_Section_1_1.jpg?v=1775045108 |
| John Booth 2 | Email_1_Section_1_2.jpg | 343px | https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Email_1_Section_1_2.jpg?v=1775045109 |
| Daria Solak 1 | Email_1_Section_2_1.jpg | 343px | https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Email_1_Section_2_1.jpg?v=1775045157 |
| Daria Solak 2 | Email_1_Section_2_2.jpg | 343px | https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Email_1_Section_2_2.jpg?v=1775045158 |
| Bernardo Henning 1 | Email_1_Section3_1.jpg | 343px | https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Email_1_Section3_1.jpg?v=1775045183 |
| Bernardo Henning 2 | Email_1_Section3_2.jpg | 343px | https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Email_1_Section3_2.jpg?v=1775045184 |
| Background texture | images_bg85ede.png | tiled | https://d3k81ch9hvuctc.cloudfront.net/company/Td2hz3/images/images_bg85ede.png |
| Button arrow | images_ico_arrow_right8c90b.png | 10px | https://d3k81ch9hvuctc.cloudfront.net/company/Td2hz3/images/images_ico_arrow_right8c90b.png |
| Facebook icon | images_ico_facebookb805a.png | 16px | https://d3k81ch9hvuctc.cloudfront.net/company/Td2hz3/images/images_ico_facebookb805a.png |
| Instagram icon | images_ico_instagrambae9e.png | 16px | https://d3k81ch9hvuctc.cloudfront.net/company/Td2hz3/images/images_ico_instagrambae9e.png |
| LinkedIn icon | images_ico_linkedinb1177.png | 16px | https://d3k81ch9hvuctc.cloudfront.net/company/Td2hz3/images/images_ico_linkedinb1177.png |

## Full HTML

````html
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<head> <!--[if gte mso 9]>
	<xml>
		<o:OfficeDocumentSettings>
		<o:AllowPNG/>
		<o:PixelsPerInch>96</o:PixelsPerInch>
		</o:OfficeDocumentSettings>
	</xml>
	<![endif]-->
<meta content="width=device-width, initial-scale=1, maximum-scale=1" name="viewport"/>
<meta content="IE=edge" http-equiv="X-UA-Compatible"/>
<meta content="date=no" name="format-detection"/>
<meta content="address=no" name="format-detection"/>
<meta content="telephone=no" name="format-detection"/>
<meta name="x-apple-disable-message-reformatting"/>
<title>
      Email Template
    </title>
<!-- Loading Custom Fonts -->
<!--[if !mso]><!-->
<!--<![endif]-->
<!-- END Loading Custom Fonts -->
<!--[if gte mso 9]>
	<style type="text/css" media="all">
		sup { font-size: 100% !important; }
		body, html, table, thead, tbody, tr, td, div, h1, h2, h3, h4, h5, p, a, span, em, i, strong { font-family: Arial, sans-serif !important; }
	</style>
	<![endif]-->
<style>a:not([name]) {text-decoration:none}
a:link {text-decoration:none}
a:visited {text-decoration:none}
a:active {text-decoration:none}
a:hover {text-decoration:none}
:root {color-scheme:light dark;supported-color-schemes:light dark}</style><style>@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap");
#outlook a {
    padding: 0
    }
body {
    margin: 0;
    padding: 0;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%
    }
table, td {
    border-collapse: collapse;
    mso-table-lspace: 0;
    mso-table-rspace: 0
    }
img {
    border: 0;
    line-height: 100%;
    outline: none;
    text-decoration: none;
    -ms-interpolation-mode: bicubic
    }
p {
    display: block;
    margin: 13px 0
    }
@media only screen and (min-width: 480px) {
    .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%
        }
    }
.moz-text-html .mj-column-per-100 {
    width: 100% !important;
    max-width: 100%
    }
@media only screen and (max-width: 480px) {
    div.kl-row.colstack div.kl-column {
        display: block !important;
        width: 100% !important
        }
    }
@media only screen and (max-width: 480px) {
    .component-wrapper .mob-no-spc {
        padding-left: 0 !important;
        padding-right: 0 !important
        }
    }
@media only screen and (max-width: 480px) {
    td.mobile-only {
        display: table-cell !important
        }
    div.mobile-only {
        display: block !important
        }
    table.mobile-only {
        display: table !important
        }
    .desktop-only {
        display: none !important
        }
    }
@media only screen and (max-width: 480px) {
    .table-mobile-only {
        display: table-cell !important;
        max-height: none !important
        }
    .table-mobile-only.block {
        display: block !important
        }
    .table-mobile-only.inline-block {
        display: inline-block !important
        }
    .table-desktop-only {
        max-height: 0 !important;
        display: none !important;
        mso-hide: all !important;
        overflow: hidden !important
        }
    }
p {
    margin-left: 0;
    margin-right: 0;
    margin-top: 0;
    margin-bottom: 0;
    padding-bottom: 1em
    }
@media only screen and (max-width: 480px) {
    body.mce-content-body, /* NOTE: needed for internal tinymce styles */.kl-text > div, .kl-table-subblock > div, .kl-split-subblock > div {
        font-size: 14px !important;
        line-height: 1.3 !important
        }
    }
h1 {
    color: #000;
    font-family: Arial;
    font-size: 40px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.1;
    letter-spacing: 0;
    margin: 0;
    margin-bottom: 20px;
    text-align: left
    }
@media only screen and (max-width: 480px) {
    h1 {
        font-size: 40px !important;
        line-height: 1.3 !important
        }
    }
h2 {
    color: #000;
    font-family: Arial;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: 0;
    margin: 0;
    margin-bottom: 16px;
    text-align: left
    }
@media only screen and (max-width: 480px) {
    h2 {
        font-size: 32px !important;
        line-height: 1.1 !important
        }
    }
h3 {
    color: #000;
    font-family: Arial;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: 0;
    margin: 0;
    margin-bottom: 12px;
    text-align: left
    }
@media only screen and (max-width: 480px) {
    h3 {
        font-size: 24px !important;
        line-height: 1.1 !important
        }
    }
h4 {
    color: #000;
    font-family: Arial;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.1;
    letter-spacing: 0;
    margin: 0;
    margin-bottom: 9px;
    text-align: left
    }
@media only screen and (max-width: 480px) {
    h4 {
        font-size: 18px !important;
        line-height: 1.1 !important
        }
    }
@media only screen and (max-width: 480px) {
    .root-container {
        width: 100% !important
        }
    .root-container-spacing {
        padding: 10px !important
        }
    .content-padding {
        padding-left: 0 !important;
        padding-right: 0 !important
        }
    .content-padding.kl-first {
        padding-top: 0 !important
        }
    .content-padding.kl-last {
        padding-bottom: 0 !important
        }
    .kl-column > .component-wrapper {
        padding-left: 0 !important;
        padding-right: 0 !important;
        width: unset !important
        }
    .kl-text {
        padding-right: 18px !important;
        padding-left: 18px !important
        }
    }
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
    margin: 0 !important
    }
table {
    mso-table-lspace: 0;
    mso-table-rspace: 0
    }
img {
    margin: 0 !important;
    -ms-interpolation-mode: bicubic;
    /* Allow smoother rendering of resized image in Internet Explorer */
    }
img, a img {
    border: 0;
    outline: none;
    text-decoration: none
    }
#outlook a {
    padding: 0
    }
.ReadMsgBody {
    width: 100%
    }
.ExternalClass {
    width: 100%
    }
div, p, a, li, td, blockquote {
    mso-line-height-rule: exactly
    }
a[href^=tel], a[href^=sms] {
    color: inherit;
    text-decoration: none
    }
.ExternalClass, .ExternalClass p, .ExternalClass td, .ExternalClass div, .ExternalClass span, .ExternalClass font {
    line-height: 100%
    }
a[x-apple-data-detectors] {
    color: inherit !important;
    text-decoration: none !important;
    font-size: inherit !important;
    font-family: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important
    }
#MessageViewBody, #MessageWebViewDiv {
    width: 100% !important
    }
.dijitReset {
    color: #000001 !important
    }
.x-gmail-data-detectors, .x-gmail-data-detectors *, .aBn {
    border-bottom: 0 !important;
    cursor: default !important
    }
.a6S {
    display: none !important;
    opacity: 0.01 !important
    }
img.g-img + div {
    display: none !important
    }
#MessageViewBody a {
    color: inherit !important;
    font-size: inherit !important;
    font-family: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important
    }
table, td {
    border-collapse: separate !important
    }
.btn a {
    display: block;
    text-decoration: none
    }
.btn-24-12 a {
    padding: 24px 12px
    }
.l-white a {
    color: #fffffe
    }
.l-black a {
    color: #000001
    }
.l-beigefb a {
    color: #FBF9F6
    }
.l-beigef5 a {
    color: #F5F3F0
    }
.tdn a, .tdn a span {
    text-decoration: none !important
    }
.kl-text div {
    word-break: normal;
    word-break: normal !important
    }
@media screen and (max-width: 99999px) {
    .kl-text {
        padding-left: 0 !important;
        padding-right: 0 !important
        }
    .kl-text div {
        word-break: normal;
        word-break: normal !important
        }
    }
@media (prefers-color-scheme: dark) {
    .c-white {
        color: #fffffe !important
        }
    .c-black {
        color: #000001 !important
        }
    .c-beigefb {
        color: #FBF9F6 !important
        }
    .c-beigef5 {
        color: #F5F3F0 !important
        }
    .bg-white {
        background: #fffffe !important
        }
    .bg-black {
        background: #000001 !important
        }
    .bg-beigefb {
        background: #FBF9F6 !important
        }
    .bg-beigef5 {
        background: #F5F3F0 !important
        }
    .l-white a {
        color: #fffffe !important
        }
    .l-black a {
        color: #000001 !important
        }
    .l-beigefb a {
        color: #FBF9F6 !important
        }
    .l-beigef5 a {
        color: #F5F3F0 !important
        }
    }
[data-ogsc] .c-white {
    color: #fffffe !important
    }
[data-ogsc] .c-black {
    color: #000001 !important
    }
[data-ogsc] .c-beigefb {
    color: #FBF9F6 !important
    }
[data-ogsc] .c-beigef5 {
    color: #F5F3F0 !important
    }
[data-ogsc] .bg-white {
    background: #fffffe !important
    }
[data-ogsc] .bg-black {
    background: #000001 !important
    }
[data-ogsc] .bg-beigefb {
    background: #FBF9F6 !important
    }
[data-ogsc] .bg-beigef5 {
    background: #F5F3F0 !important
    }
[data-ogsc] .l-white a {
    color: #fffffe !important
    }
[data-ogsc] .l-black a {
    color: #000001 !important
    }
[data-ogsc] .l-beigefb a {
    color: #FBF9F6 !important
    }
[data-ogsc] .l-beigef5 a {
    color: #F5F3F0 !important
    }
@media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
    .mpb-5 {
        padding-bottom: 5px !important
        }
    .mpb-18 {
        padding-bottom: 18px !important
        }
    .td, .m-shell {
        width: 100% !important;
        min-width: 100% !important
        }
    .mt-left {
        text-align: left !important
        }
    .mt-center {
        text-align: center !important
        }
    .me-left {
        margin-right: auto !important
        }
    .me-center {
        margin: 0 auto !important
        }
    .mh-auto {
        height: auto !important
        }
    .mw-auto {
        width: auto !important
        }
    .fluid-img img {
        width: 100% !important;
        max-width: 100% !important;
        height: auto !important
        }
    .column, .column-top, .column-bottom, .column-dir, .column-dir-top, .column-dir-bottom {
        float: left !important;
        width: 100% !important;
        display: block !important
        }
    .m-hide {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
        font-size: 0 !important;
        line-height: 0 !important;
        min-height: 0 !important
        }
    .m-block {
        display: block !important
        }
    .mw-15 {
        width: 15px !important
        }
    .mw-2p {
        width: 2% !important
        }
    .mw-32p {
        width: 32% !important
        }
    .mw-49p {
        width: 49% !important
        }
    .mw-100p {
        width: 100% !important
        }
    .kmMobileStretch {
        float: left !important;
        width: 100% !important;
        display: block !important;
        padding: 0 !important;
        padding-bottom: 15px !important
        }
    .fluid-img .kl-image table {
        width: 100% !important
        }
    }</style></head>
<body class="body" id="body" style="padding:0 !important; margin:0 auto !important; display:block !important; min-width:100% !important; width:100% !important; background:#fffffe; -webkit-text-size-adjust:none;">
<center>
<table bgcolor="#fffffe" border="0" cellpadding="0" cellspacing="0" class="bg-beigef5" style="margin: 0; padding: 0; width: 100%; height: 100%; background:#F5F3F0;" width="100%">
<tr>
<td align="center" style="margin: 0; padding: 0; width: 100%; height: 100%; background-image: url(https://d3k81ch9hvuctc.cloudfront.net/company/Td2hz3/images/images_bg85ede.png); background-size: auto; background-position: center center; background-repeat: repeat" valign="top">
<table border="0" cellpadding="0" cellspacing="0" class="m-shell" width="724">
<tr>
<td bgcolor="#FBF9F6" class="td bg-beigefb" style="width:724px; min-width:724px; font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; background:#FBF9F6;"> <!-- Preview Text -->
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr>
<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto"><div class="kl-column" style="">
<div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
<tbody>
<tr>
<td class="" style="vertical-align:top;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
<tbody>
<tr><td style="color:#000000;font-family:Arial;font-size:14px;line-height:1.3;"><!-- Hidden Preview Text -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">
    A few collaborations we've loved
</div>
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">
    &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
  &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
  &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
  &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
  &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
  &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
  &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
  &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
  &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
  &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
  &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
  &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
  &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
  &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
  &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
  &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
  &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
  &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
  &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
  &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
  &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
  &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
  &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
  &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
  &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
  &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
  &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
  &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
  &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
  &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
  &nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;&nbsp;&#8204;
</div></td></tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</div>
<div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
<tbody>
<tr>
<td class="" style="vertical-align:top;padding-top:12px;padding-right:12px;padding-bottom:0px;padding-left:12px;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
<tbody>
<tr>
<td align="left" class="kl-text" style="font-size:0px;padding:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;">
<div style="font-family:Arial;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.3;text-align:left;color:#000000;"><table border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
<td class="fluid-img" style="font-size: 0pt; line-height: 0pt; text-align: left;"><a href="https://www.stickerize.com/" rel="noopener" style="text-decoration:none" target="_blank"> <img alt="Stickerize" border="0" height="auto" src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Frame_1171275816.png?v=1775824995" width="724"/></a></td>
</tr>
</tbody>
</table></div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</div>
</div></td>
</tr>
<tr>
<td class="m-hide" style="font-size: 0pt; line-height: 0pt; mso-hide: all;">
<span aria-hidden="true"> ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏ &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &nbsp; ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏  ͏ &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &nbsp;</span>
</td>
</tr>
</table>
<!-- END Preview Text -->
<!-- Logo -->
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr>
<td class="h2" data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto"><div class="kl-column" style="">
<div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
<tbody>
<tr>
<td class="" style="vertical-align:top;padding-top:0px;padding-right:12px;padding-bottom:0px;padding-left:12px;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
<tbody>
<tr>
<td align="left" class="kl-text" style="font-size:0px;padding:0px;padding-top:12px;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;">
<div style="font-family:Arial;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.3;text-align:left;color:#000000;"><table border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
<td>
<table border="0" cellpadding="0" cellspacing="0" style="height: 12px;" width="100%">
<tbody>
<tr style="height: 12x;">
<td style="color: rgb(0, 0, 1); font-family: 'Courier New', Arial, sans-serif; text-align: left; font-size: 13px; line-height: 12px; height: 12px;"><strong>A FEW COLLABORATIONS WE’VE LOVED</strong></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table></div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</div>
</div></td>
</tr>
</table>
<!-- END Logo -->
<!-- Image Block - 1 Image -->
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr>
<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto"><div class="kl-column" style="">
<div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
<tbody>
<tr>
<td class="" style="vertical-align:top;padding-top:0px;padding-right:12px;padding-bottom:0px;padding-left:12px;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
<tbody>
<tr>
<td align="left" class="kl-text" style="font-size:0px;padding:0px;padding-top:12px;padding-right:0px;padding-bottom:12px;padding-left:0px;word-break:break-word;">
<div style="font-family:Arial;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.3;text-align:left;color:#000000;"><table border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
<td>
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
<td style="font-size: 13px; line-height: 130%; font-family: 'Courier New', Arial, sans-serif; color: rgb(0, 0, 1); text-align: left;">Some stickers are made to sell. Others are made to stay. The collaborations we remember best feel considered from the beginning - not loud, just clear in identity and right in execution.</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table></div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</div>
</div></td>
</tr>
</table>
<!-- END Image Block - 1 Image -->
<!-- Image Block - 2 Images -->
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr>
<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto"><div class="kl-column" style="">
<div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
<tbody>
<tr>
<td class="" style="vertical-align:top;padding-top:12px;padding-right:12px;padding-bottom:12px;padding-left:12px;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
<tbody>
<tr>
<td align="left" class="kl-text" style="font-size:0px;padding:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;">
<div style="font-family:Arial;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.3;text-align:left;color:#000000;"><table border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
<td>
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
<td class="fluid-img mw-49p" style="font-size: 0pt; line-height: 0pt; text-align: left;"><a href="https://www.stickerize.com/" rel="noopener" style="text-decoration:none" target="_blank"> <img alt="" border="0" height="auto" src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Email_1_Section_1_1.jpg?v=1775045108" width="343"/></a></td>
<td class="mw-2p" style="font-size: 0pt; line-height: 0pt; text-align: left;" width="10">&nbsp;</td>
<td class="fluid-img mw-49p" style="font-size: 0pt; line-height: 0pt; text-align: left;" width="343"><a href="https://www.stickerize.com/" rel="noopener" style="text-decoration:none" target="_blank"> <img alt="" border="0" height="auto" src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Email_1_Section_1_2.jpg?v=1775045109" width="343"/></a></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table></div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</div>
</div></td>
</tr>
</table>
<!-- END Image Block - 2 Images -->
<!-- Image Block - 3 Images -->
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr>
<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto"><div class="kl-column" style="">
<div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
<tbody>
<tr>
<td class="" style="vertical-align:top;padding-top:0px;padding-right:12px;padding-bottom:0px;padding-left:12px;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
<tbody>
<tr>
<td align="left" class="kl-text" style="font-size:0px;padding:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;">
<div style="font-family:Arial;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.3;text-align:left;color:#000000;"><table border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
<td>
<table border="0" cellpadding="0" cellspacing="0" style="height: 18px;" width="100%">
<tbody>
<tr style="height: 18px;">
<td style="color: rgb(0, 0, 1); font-family: 'Courier New', Arial, sans-serif; text-align: left; font-size: 13px; line-height: 17px; height: 18px;"><strong>JOHN BOOTH<br/></strong></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table></div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</div>
</div></td>
</tr>
</table>
<!-- END Image Block - 3 Images -->
<!-- Image Block - 4 Images -->
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr>
<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto"><div class="kl-column" style="">
<div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
<tbody>
<tr>
<td class="" style="vertical-align:top;padding-top:0px;padding-right:12px;padding-bottom:0px;padding-left:12px;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
<tbody>
<tr>
<td align="left" class="kl-text" style="font-size:0px;padding:0px;padding-top:12px;padding-right:0px;padding-bottom:12px;padding-left:0px;word-break:break-word;">
<div style="font-family:Arial;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.3;text-align:left;color:#000000;"><table border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
<td>
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
<td style="font-size: 13px; line-height: 130%; font-family: 'Courier New', Arial, sans-serif; color: rgb(0, 0, 1); text-align: left;">Built for expression, turning John Booth’s vibrant compositions into stickers designed to be arranged, combined, and reimagined across surfaces. Created to move beyond a single format, inviting variation through placement and layering. Each element holds its color, energy, and character in every context.</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table></div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</div>
<div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
<tbody>
<tr>
<td class="" style="vertical-align:top;padding-top:12px;padding-right:12px;padding-bottom:12px;padding-left:12px;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
<tbody>
<tr>
<td align="left" class="kl-text" style="font-size:0px;padding:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;">
<div style="font-family:Arial;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.3;text-align:left;color:#000000;"><table border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
<td>
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
<td class="fluid-img mw-49p" style="font-size: 0pt; line-height: 0pt; text-align: left;"><a href="https://www.stickerize.com/" rel="noopener" style="text-decoration:none" target="_blank"> <img alt="" border="0" height="auto" src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Email_1_Section_2_1.jpg?v=1775045157" width="343"/></a></td>
<td class="mw-2p" style="font-size: 0pt; line-height: 0pt; text-align: left;" width="10">&nbsp;</td>
<td class="fluid-img mw-49p" style="font-size: 0pt; line-height: 0pt; text-align: left;" width="343"><a href="https://www.stickerize.com/" rel="noopener" style="text-decoration:none" target="_blank"> <img alt="" border="0" height="auto" src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Email_1_Section_2_2.jpg?v=1775045158" width="343"/></a></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table></div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</div>
<div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
<tbody>
<tr>
<td class="" style="vertical-align:top;padding-top:0px;padding-right:12px;padding-bottom:0px;padding-left:12px;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
<tbody>
<tr>
<td align="left" class="kl-text" style="font-size:0px;padding:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;">
<div style="font-family:Arial;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.3;text-align:left;color:#000000;"><table border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
<td>
<table border="0" cellpadding="0" cellspacing="0" style="height: 18px;" width="100%">
<tbody>
<tr style="height: 18px;">
<td style="color: rgb(0, 0, 1); font-family: 'Courier New', Arial, sans-serif; text-align: left; font-size: 13px; line-height: 17px; height: 18px;"><strong>DARIA SOLAK<br/></strong></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table></div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</div>
<div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
<tbody>
<tr>
<td class="" style="vertical-align:top;padding-top:0px;padding-right:12px;padding-bottom:0px;padding-left:12px;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
<tbody>
<tr>
<td align="left" class="kl-text" style="font-size:0px;padding:0px;padding-top:12px;padding-right:0px;padding-bottom:12px;padding-left:0px;word-break:break-word;">
<div style="font-family:Arial;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.3;text-align:left;color:#000000;"><table border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
<td>
<table border="0" cellpadding="0" cellspacing="0" style="height: 33.8125px;" width="100%">
<tbody>
<tr style="height: 33.8125px;">
<td style="font-size: 13px; line-height: 130%; font-family: 'Courier New', Arial, sans-serif; color: rgb(0, 0, 1); text-align: left; height: 33.8125px;">From sketch to object, translating Daria Solak’s illustrated world into stickers that carry her character, detail, and charm. What begins as illustration becomes something tangible, made to be kept and returned to. A natural extension of her world, brought into everyday use.</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table></div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</div>
<div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
<tbody>
<tr>
<td class="" style="vertical-align:top;padding-top:12px;padding-right:12px;padding-bottom:12px;padding-left:12px;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
<tbody>
<tr>
<td align="left" class="kl-text" style="font-size:0px;padding:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;">
<div style="font-family:Arial;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.3;text-align:left;color:#000000;"><table border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
<td>
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
<td class="fluid-img mw-49p" style="font-size: 0pt; line-height: 0pt; text-align: left;"><a href="https://www.stickerize.com/" rel="noopener" style="text-decoration:none" target="_blank"> <img alt="" border="0" height="auto" src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Email_1_Section3_1.jpg?v=1775045183" width="343"/></a></td>
<td class="mw-2p" style="font-size: 0pt; line-height: 0pt; text-align: left;" width="10">&nbsp;</td>
<td class="fluid-img mw-49p" style="font-size: 0pt; line-height: 0pt; text-align: left;" width="343"><a href="https://www.stickerize.com/" rel="noopener" style="text-decoration:none" target="_blank"> <img alt="" border="0" height="auto" src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Email_1_Section3_2.jpg?v=1775045184" width="343"/></a></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table></div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</div>
<div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
<tbody>
<tr>
<td class="" style="vertical-align:top;padding-top:0px;padding-right:12px;padding-bottom:0px;padding-left:12px;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
<tbody>
<tr>
<td align="left" class="kl-text" style="font-size:0px;padding:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;">
<div style="font-family:Arial;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.3;text-align:left;color:#000000;"><table border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
<td>
<table border="0" cellpadding="0" cellspacing="0" style="height: 18px;" width="100%">
<tbody>
<tr style="height: 18px;">
<td style="color: rgb(0, 0, 1); font-family: 'Courier New', Arial, sans-serif; text-align: left; font-size: 13px; line-height: 17px; height: 18px;"><strong>BERNARDO HENNING<br/></strong></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table></div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</div>
<div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
<tbody>
<tr>
<td class="" style="vertical-align:top;padding-top:0px;padding-right:12px;padding-bottom:0px;padding-left:12px;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
<tbody>
<tr>
<td align="left" class="kl-text" style="font-size:0px;padding:0px;padding-top:12px;padding-right:0px;padding-bottom:12px;padding-left:0px;word-break:break-word;">
<div style="font-family:Arial;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.3;text-align:left;color:#000000;"><table border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
<td>
<table border="0" cellpadding="0" cellspacing="0" style="height: 33.8125px;" width="100%">
<tbody>
<tr style="height: 33.8125px;">
<td style="font-size: 13px; line-height: 130%; font-family: 'Courier New', Arial, sans-serif; color: rgb(0, 0, 1); text-align: left; height: 33.8125px;">
<div>Bringing Bernardo Henning’s work into the physical, where bold, graphic composition is executed with precision, holding its clarity, contrast, and intent in every detail.&nbsp;Every line, edge, and color remains sharp and controlled across surfaces. A faithful extension of the work, true to its original form.</div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table></div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</div>
<div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
<tbody>
<tr>
<td class="" style="vertical-align:top;padding-top:12px;padding-right:12px;padding-bottom:12px;padding-left:12px;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
<tbody>
<tr>
<td align="left" class="kl-text" style="font-size:0px;padding:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;">
<div style="font-family:Arial;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.3;text-align:left;color:#000000;"><table border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
<td><a href="https://www.instagram.com/stickerizee" style="text-decoration:none"><!-- Button --></a>
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
<td bgcolor="#000001" class="btn-24-12 c-white l-white" style="mso-padding-alt: 24px 12px; color: #fffffe;">
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
<td class="btn" style="color: #fffffe; font-family: 'JetBrains Mono', Arial, sans-serif; text-align: left; font-weight: 300; font-size: 13px; line-height: 17px;"><a href="https://www.instagram.com/stickerizee" style="text-decoration:none; color:#fffffe">SEE MORE WORK</a></td>
<td style="font-size: 0pt; line-height: 0pt; text-align: left;" width="12"><a href="https://www.instagram.com/stickerizee" style="text-decoration:none">&#8203;</a></td>
<td style="font-size: 0pt; line-height: 0pt; text-align: left;" width="10"><a href="https://www.instagram.com/stickerizee" style="text-decoration:none"><img alt="" border="0" height="auto" src="https://d3k81ch9hvuctc.cloudfront.net/company/Td2hz3/images/images_ico_arrow_right8c90b.png" width="10"/></a></td>
<td style="font-size: 0pt; line-height: 0pt; text-align: left;" width="12"><a href="https://www.instagram.com/stickerizee" style="text-decoration:none">&#8203;</a></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<a href="https://www.instagram.com/stickerizee" style="text-decoration:none"><!-- END Button --></a></td>
</tr>
</tbody>
</table></div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</div>
</div></td>
</tr>
</table>
<!-- END Image Block - 4 Images -->
<!-- Title -->
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr>
<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto"><div class="kl-column" style="">
<div class="mj-column-per-100 mj-outlook-group-fix component-wrapper" style="font-size:0px;text-align:left;direction:ltr;vertical-align:top;width:100%;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;" width="100%">
<tbody>
<tr>
<td class="" style="vertical-align:top;padding-top:9px;padding-right:12px;padding-bottom:9px;padding-left:12px;">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="" width="100%">
<tbody>
<tr>
<td align="left" class="kl-text" style="font-size:0px;padding:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;">
<div style="font-family:Arial;font-size:14px;font-style:normal;font-weight:400;letter-spacing:0px;line-height:1.3;text-align:left;color:#000000;"><table border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
<td>
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
<td style="border-top: 1px solid #e1e0dd; color: #000001; font-family: 'Courier New', Arial, sans-serif; text-align: left; font-size: 13px; line-height: 17px; padding-top: 16px; padding-bottom: 16px;"><a class="link" href="https://www.stickerize.com" rel="noopener" style="text-decoration:none; color:#000001" target="_blank"><span class="link" style="color: #000001; text-decoration: none;">GO TO STICKERIZE</span></a></td>
</tr>
<tr>
<td style="border-top: 1px solid #e1e0dd; color: #000001; font-family: 'Courier New', Arial, sans-serif; text-align: left; font-size: 13px; line-height: 17px; padding-top: 16px; padding-bottom: 16px;"><a class="link" href="mailto:HELP@STICKERIZE.COM" rel="noopener" style="text-decoration:none; color:#000001" target="_blank"><span class="link" style="color: #000001; text-decoration: none;">HELP@STICKERIZE.COM</span></a></td>
</tr>
<tr>
<td style="border-top: 1px solid #e1e0dd; color: #000001; font-family: 'Courier New', Arial, sans-serif; text-align: left; font-size: 13px; line-height: 17px; padding-top: 16px; padding-bottom: 16px;"><a class="link" href="{% web_view_link %}" rel="noopener" style="text-decoration:none; color:#000001" target="_blank"><span class="link" style="color: #000001; text-decoration: none;">VIEW IN BROWSER</span></a></td>
</tr>
<tr>
<td style="border-top: 1px solid #e1e0dd; color: #000001; font-family: 'Courier New', Arial, sans-serif; text-align: left; font-size: 13px; line-height: 17px; padding-top: 16px; padding-bottom: 16px;"><a class="link" href="{% unsubscribe_link %}" rel="noopener" style="text-decoration:none; color:#000001" target="_blank"><span class="link" style="color: #000001; text-decoration: none;">UNSUBSCRIBE</span></a></td>
</tr>
<tr>
<td style="border-top: 1px solid #e1e0dd; padding-top: 16px; padding-bottom: 16px;">
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tbody>
<tr>
<td style="color: #000001; font-family: 'Courier New', Arial, sans-serif; text-align: left; font-size: 13px; line-height: 17px;">FOLLOW US</td>
<td style="font-size: 0pt; line-height: 0pt; text-align: left;" width="12">&#8203;</td>
<td align="right">
<table border="0" cellpadding="0" cellspacing="0">
<tbody>
<tr>
<td style="font-size: 0pt; line-height: 0pt; text-align: left;" width="16"><a href="https://www.facebook.com/profile.php?id=61572302414815" rel="noopener" style="text-decoration:none" target="_blank"> <img alt="" border="0" height="auto" src="https://d3k81ch9hvuctc.cloudfront.net/company/Td2hz3/images/images_ico_facebookb805a.png" width="16"/></a></td>
<td style="font-size: 0pt; line-height: 0pt; text-align: left;" width="12">&#8203;</td>
<td style="font-size: 0pt; line-height: 0pt; text-align: left;" width="16"><a href="https://www.instagram.com/stickerizee" rel="noopener" style="text-decoration:none" target="_blank"> <img alt="" border="0" height="auto" src="https://d3k81ch9hvuctc.cloudfront.net/company/Td2hz3/images/images_ico_instagrambae9e.png" width="16"/></a></td>
<td style="font-size: 0pt; line-height: 0pt; text-align: left;" width="12">&#8203;</td>
<td style="font-size: 0pt; line-height: 0pt; text-align: left;" width="16"><a href="https://www.linkedin.com/company/stickerize/" rel="noopener" style="text-decoration:none" target="_blank"> <img alt="" border="0" height="auto" src="https://d3k81ch9hvuctc.cloudfront.net/company/Td2hz3/images/images_ico_linkedinb1177.png" width="16"/></a></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table></div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</div>
</div></td>
</tr>
</table>
<!-- END Title -->
<!-- Text -->
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr>
<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto"><div class="kl-column empty-column-placeholder" style="">
</div></td>
</tr>
</table>
<!-- END Text -->
<!-- Icons -->
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr>
<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto"><div class="kl-column empty-column-placeholder" style="">
</div></td>
</tr>
</table>
<!-- END Icons -->
<!-- CTA -->
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr>
<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto"><div class="kl-column empty-column-placeholder" style="">
</div></td>
</tr>
</table>
<!-- END CTA -->
<!-- Footer -->
<table border="0" cellpadding="0" cellspacing="0" width="100%">
<tr>
<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto"><div class="kl-column empty-column-placeholder" style="">
</div></td>
</tr>
</table>
<!-- END Footer -->
</td>
</tr>
</table>
</td>
</tr>
</table>
</center>
</body>
</html>
````
