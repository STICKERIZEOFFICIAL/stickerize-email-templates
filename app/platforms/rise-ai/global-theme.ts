/**
 * Ported from `other emails/rise.ai/global-theme.html`.
 *
 * Rise.ai splits an email in two: this Global theme holds the header, footer
 * and dark-mode CSS and is edited once in Rise's admin, and each notification
 * supplies only the body that drops into the `{{{body}}}` slot.
 *
 * So this is the one module in the compartment that composes rather than being
 * emitted whole:
 *
 *   `globalTheme()`             the theme exactly as it is pasted into Rise
 *   `globalTheme({ body })`     the theme with a notification's body inlined,
 *                               which is what the preview renders
 *
 * Download on a Rise.ai notification hands over the *body* only, because that
 * is the field being edited. The theme has its own entry for the same reason.
 */

const BODY_SLOT = '{{{body}}}';

export function riseStyles() {
  return /*css*/ `
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Courier New', monospace;
    }

    img {
        max-width: 100%;
    }

    a {
        cursor: pointer;
        color: #000001;
        text-decoration: none;
    }

    .table {
        border: 0px;
        border-collapse: collapse;
        box-sizing: border-box;
        direction: ltr;
        height: 100%;
        margin: 0px;
        padding: 20px;
        width: 100%
    }

    .main {
        padding: 12px 0;
        background-color: #fbf9f6;
    }

    .container {
        max-width: 732px !important;
    }

    /* The rule moves to an inner element so it is inset by 12px like every
       other divider. A cell's border spans its own padding, so with the
       border out here the line ran the full width of the column. */
    .header {
        padding: 0 12px;
    }

    .header-inner {
        border-bottom: 1px solid #000001;
        padding-bottom: 12px;
    }

    .body {
        padding: 0 12px;
    }

    .footer {
        padding: 0 12px 22px;
        text-align: center;
    }

    .footer p {
        color: #000001;
        font-size: 13px;
        line-height: 17px;
        font-family: 'Courier New', monospace;
    }

    /* The bodies style every element inline, so these rules are dormant today.
       They are kept correct rather than deleted because Rise's WYSIWYG emits
       bare <p> and <h1> the moment anyone edits a body in the admin — at which
       point the old Arial Black 18px / 15px values would silently reappear.
       Heading and body here are the design system's 13px Courier. */
    h1, h2 {
        font-family: 'Courier New', monospace;
        font-size: 13px;
        font-weight: bold;
        line-height: 13px;
        text-transform: uppercase;
        color: #000001;
        margin-bottom: 24px;
    }

    p {
        color: #000001;
        font-size: 13px;
        line-height: 17px;
        font-family: 'Courier New', monospace;
        margin: 0;
    }

    /* 1px black, and no margin of its own: the section rule owns the rhythm. */
    .hr {
        margin: 0;
        border-top: 1px solid #000001;
    }

    section {
        margin: 24px 0;
    }

    /* Dormant like the type rules above — the bodies build the CTA as a
       two-cell table with a text arrow. Aligned to the system's 13px / 23px
       so a WYSIWYG-authored button does not come out at 14px. */
    .button {
        background-color: #000001;
        padding: 23px 12px;
        color: #fffffe;
        font-size: 13px;
        line-height: 18px;
        font-family: 'Courier New', monospace;
        font-weight: 300;
        display: block;
        text-decoration: none;
        text-transform: uppercase;
    }

    .social {
        text-align: center;
        font-size: 0;
        line-height: 0;
        padding: 0;
        margin: 0;
    }

    .social li {
        display: inline-block;
        margin: 0 3px;
    }

    .social li a {
        display: block;
        transition: opacity 0.25s;
    }

    .social li img {
        width: 34px;
        height: 34px;
    }

    .powered-by {
        margin-top: 24px;
        font-size: 13px;
        line-height: 17px;
        color: #000001;
    }

    .powered-by img {
        border: 0px;
        height: 20px;
        vertical-align: -30%;
    }

    .fluid-img img {
        width: 100%;
        max-width: 700px;
        height: auto;
    }

    .ql-align-center {
        text-align: center;
    }

    .ql-align-left {
        text-align: left;
    }

    .ql-align-right {
        text-align: right;
    }

    @media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
        .container {
            width: 100% !important;
        }

        .header, .body, .footer {
            padding-left: 12px !important;
            padding-right: 12px !important;
        }

        .fluid-img img {
            width: 100% !important;
            height: auto !important;
        }
    }

    :root {
        color-scheme: light dark;
        supported-color-schemes: light dark;
    }

    @media (prefers-color-scheme: dark) {
        .main, .main td, .main th, .container {
            background-color: #000001 !important;
        }

        p, td, th, a, span, h1, h2 {
            color: #fffffe !important;
        }

        .header-inner {
            border-bottom-color: #fffffe !important;
        }

        .dm-line {
            background-color: #fffffe !important;
        }

        .dm-muted {
            color: #8c8c8c !important;
        }

        .dm-invert {
            -webkit-filter: invert(1) !important;
            filter: invert(1) !important;
        }

        .dm-arrow {
            -webkit-filter: brightness(0) !important;
            filter: brightness(0) !important;
        }

        .main .dm-btn-table, .main .dm-btn-table td, .dm-btn {
            background-color: #fffffe !important;
            color: #000001 !important;
        }
    }

    [data-ogsc] .header-inner { border-bottom-color: #fffffe !important; }
    [data-ogsc] .dm-line { background-color: #fffffe !important; }
    [data-ogsc] .dm-btn-table, [data-ogsc] .dm-btn { background-color: #fffffe !important; }
    [data-ogsc] .dm-btn { color: #000001 !important; }
    [data-ogsc] .dm-muted { color: #8c8c8c !important; }
    [data-ogsc] .dm-arrow { filter: brightness(0) !important; }`;
}

export default function globalTheme({ body }: { body?: string } = {}) {
  return /*html*/ `<style>${riseStyles()}
</style>
<div>
    <table class="main" rise-template="main" align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tbody>
            <tr>
                <td align="center" valign="top">
                    <table rise-template="container" class="container" align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th class="header" rise-template="header">
                                    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                        <tr>
                                            <td class="header-inner" style="border-bottom: 1px solid #000001; padding-bottom: 12px;">
                                                <a rise-template="logo-link" href="{{shop_url}}" style="text-align: left; display: block;">
                                                    <img rise-template="logo" class="dm-invert" src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Frame_Logo_-_Stickerize_Emails.png?v=1765294871" width="168" height="26" border="0" alt="{{shop_name}}" style="display: block;" />
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="body" rise-template="body">
                                    ${body ?? BODY_SLOT}
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td class="footer" rise-template="footer">
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <th class="column-top" width="266" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td style="color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 17px; padding-bottom: 24px;">
                                                            Tomtebogatan 34, Stockholm, Sweden
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 17px;">
                                                            For information about how we process data and monitor communications please see our <a href="https://stickerize.com/pages/privacy-policy" rel="noopener" target="_blank" class="link" style="color:#000001; text-decoration:none;"><span class="link" style="color:#000001; text-decoration:none;">Privacy Policy</span></a> and <a href="https://stickerize.com/pages/terms-of-service" rel="noopener" target="_blank" class="link" style="color:#000001; text-decoration:none;"><span class="link" style="color:#000001; text-decoration:none;">Terms &amp; Conditions</span></a>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </th>
                                            <th class="column" width="40" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">&nbsp;</th>
                                            <th class="column-top" width="394" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td style="color:#000001; font-family:'Courier New', monospace; text-align:left; font-size: 13px; line-height: 17px;">
                                                            <a href="mailto:help@stickerize.com" target="_blank" class="link-u" style="color:#000001; text-decoration:underline;"><span class="link-u" style="color:#000001; text-decoration:underline;">HELP@STICKERIZE.COM</span></a><br />
                                                            <a href="{{unsubscribe_url}}" target="_blank" class="link-u" style="color:#000001; text-decoration:underline;"><span class="link-u" style="color:#000001; text-decoration:underline;">UNSUBSCRIBE</span></a>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </th>
                                        </tr>
                                    </table>
                                    <div class="fluid-img" style="padding-top: 24px;">
                                        <a href="{{shop_url}}">
                                            <img class="dm-invert" src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/logo_footer.png?v=1734345195" width="700" height="110" border="0" alt="" />
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</div>`;
}
