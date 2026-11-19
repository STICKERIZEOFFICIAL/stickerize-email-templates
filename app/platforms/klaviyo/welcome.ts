/**
 * Post-order welcome: "Your account is ready."
 *
 * The welcome email the old Rise.ai platform sent, rebuilt for Klaviyo.
 *
 * Rise has since migrated, and the migration retired both the Global theme and
 * this email — no Welcome was exported, and the platform change left its
 * account-creation trigger obsolete (docs/other-platform-emails.md, "The
 * Rise.ai migration"). The email itself is not obsolete: it is the only one
 * that explains cash back, referrals, Brand Hub and invoices, and that
 * explanation is still owed to every customer. So it moves here, to be
 * automated in Klaviyo off the order rather than off account creation.
 *
 * The copy is carried across from `other emails/rise.ai/welcome-email.html`,
 * which was approved on the old platform — sentence for sentence, including
 * the three-step "apply your credits" list and the euro-conversion small
 * print. Only the chrome and the gaps are this tab's.
 *
 * Composed out of the same blocks as the other Klaviyo email rather than
 * pasted from an export, so it follows the same rules:
 *
 * - Courier New throughout, 13/17 body, bold uppercase headings.
 * - Masthead is the 188x30 logo over a 1px #000001 rule inset by 12px.
 * - Text `&rarr;` on the CTA instead of an arrow image, so the arrow inherits
 *   the link colour and survives forced dark mode.
 * - One side owns each gap: `padding-top: 0` with a `padding-bottom` that says
 *   what the block is separated from — 24px inside a section, 36px on the
 *   block that closes one. Within a section: 12px from an eyebrow to its
 *   heading, 24px from a heading to its body, 12px between sibling
 *   paragraphs. That is the Rise design-system pass, which widened this very
 *   email's heading-to-body gap from 12px to 24px.
 * - Rise's `<section rise-section="...">` wrappers and their section IDs are
 *   gone: they addressed Rise's editor, and Klaviyo has its own
 *   `data-klaviyo-region` blocks instead.
 * - Dividers are the 1px black rule, inset 12px, with a section gap either
 *   side. The old platform's section margins used to supply that spacing;
 *   here the blocks own it, like everything else in this tab.
 *
 * TWO DEVIATIONS from the approved template, both deliberate, both one line
 * to put back:
 *
 * 1. The CTA points at `https://stickerize.com/account` rather than the bare
 *    `https://stickerize.com` that docs/email-style-changes.md specifies,
 *    because the label says GO TO MY ACCOUNT and that is where all four of
 *    the things this email describes actually live.
 * 2. The preview text is new copy — the old platform had no preheader field
 *    for this email — so it is hardcoded in the hidden block the way the
 *    other Klaviyo email hardcodes its own. It is badged proposed in the
 *    registry, along with the subject.
 *
 * Pure HTML with the platform's own variable syntax — no Liquid, no engine.
 * The preview substitutes tokens for display only; Source and Download emit
 * this string untouched, because that is what gets pasted into the platform.
 */
export default function () {
  return /*html*/ `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
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
	
	<title>Email Template</title>

	<!-- Loading Custom Fonts -->
	<!--[if !mso]><!-->
	<style type="text/css" media="all">
		@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');
	</style>
	<!--<![endif]-->
	<!-- END Loading Custom Fonts -->

	<!--[if gte mso 9]>
	<style type="text/css" media="all">
		sup { font-size: 100% !important; }
	</style>
	<![endif]-->
	<!-- Outlook has Courier New, so there is no reason to force Arial on it and
	     drop out of the monospace system face. Disabled, matching the same rule
	     in the Shopify templates' Head:
	body, html, table, thead, tbody, tr, td, div, h1, h2, h3, h4, h5, p, a, span, em, i, strong { font-family: Arial, sans-serif !important; }
	-->

	

	<style type="text/css" media="screen">
		body { padding:0 !important; margin:0 auto !important; display:block !important; min-width:100% !important; width:100% !important; background:#fffffe; -webkit-text-size-adjust:none }
		a { color:#000001; text-decoration:none }
		p { margin:0 !important } 

		table { mso-table-lspace:0pt; mso-table-rspace:0pt; }
		img { margin: 0 !important; -ms-interpolation-mode: bicubic; /* Allow smoother rendering of resized image in Internet Explorer */ }
		img, a img{ border:0; outline:none; text-decoration:none; }
		#outlook a { padding:0; }
		.ReadMsgBody { width:100%; }
		.ExternalClass { width:100%; }
		div,p,a,li,td,blockquote { mso-line-height-rule:exactly; }
		a[href^=tel],a[href^=sms] { color:inherit; text-decoration:none; }
		.ExternalClass, .ExternalClass p, .ExternalClass td, .ExternalClass div, .ExternalClass span, .ExternalClass font { line-height:100%; }
		a[x-apple-data-detectors] { color:inherit !important; text-decoration:none !important; font-size:inherit !important; font-family:inherit !important; font-weight:inherit !important; line-height:inherit !important; }
		#MessageViewBody, #MessageWebViewDiv { width: 100% !important; } /* Samsung Galaxy Note 4 Samsung Mail - make email stay centered */
		.dijitReset { color: #000001 !important; }
		.x-gmail-data-detectors, .x-gmail-data-detectors *, .aBn { border-bottom: 0 !important; cursor: default !important; } /* A work-around for Gmail meddling in triggered links. */
		.a6S { display: none !important; 
			opacity: 0.01 !important; 
		} /* Prevents Gmail from displaying an download button on large, non-linked images. */
		img.g-img + div { display:none !important; } /* If the above doesn't work, add a .g-img class to any image in question. */
		#MessageViewBody a { color: inherit !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
		table, td { border-collapse: separate !important; }
		
		
		.btn a { display: block; text-decoration: none; }
		.btn-24-12 a { padding: 24px 12px; }

		.l-white a { color: #fffffe; }
		.l-black a { color: #000001; }
		.l-beigefb a { color: #FBF9F6; }
		.l-beigef5 a { color: #F5F3F0; }

		.tdn a,
		.tdn a span { text-decoration: none !important; }

		.kl-text div { word-break: normal; word-break: normal !important; }

		@media screen and (max-width: 99999px) {
			.kl-text { padding-left: 0 !important; padding-right: 0 !important; }
			.kl-text div { word-break: normal; word-break: normal !important; }
		}

		:root {
			color-scheme: light dark;
			supported-color-schemes: light dark;
		}

		@media (prefers-color-scheme: dark) {
			.c-white { color: #fffffe !important; }
			.c-black { color: #000001 !important; }
			.c-beigefb { color: #FBF9F6 !important; }
			.c-beigef5 { color: #F5F3F0 !important; }

			.bg-white { background: #fffffe !important; }
			.bg-black { background: #000001 !important; }
			.bg-beigefb { background: #FBF9F6 !important; }
			.bg-beigef5 { background: #F5F3F0 !important; }

			.l-white a { color: #fffffe !important; }
			.l-black a { color: #000001 !important; }
			.l-beigefb a { color: #FBF9F6 !important; }
			.l-beigef5 a { color: #F5F3F0 !important; }
		}

		[data-ogsc] .c-white { color: #fffffe !important; }
		[data-ogsc] .c-black { color: #000001 !important; }
		[data-ogsc] .c-beigefb { color: #FBF9F6 !important; }
		[data-ogsc] .c-beigef5 { color: #F5F3F0 !important; }

		[data-ogsc] .bg-white { background: #fffffe !important; }
		[data-ogsc] .bg-black { background: #000001 !important; }
		[data-ogsc] .bg-beigefb { background: #FBF9F6 !important; }
		[data-ogsc] .bg-beigef5 { background: #F5F3F0 !important; }

		[data-ogsc] .l-white a { color: #fffffe !important; }
		[data-ogsc] .l-black a { color: #000001 !important; }
		[data-ogsc] .l-beigefb a { color: #FBF9F6 !important; }
		[data-ogsc] .l-beigef5 a { color: #F5F3F0 !important; }

		/* Mobile styles */
		@media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
			.mpb-5 { padding-bottom: 5px !important; }
			.mpb-18 { padding-bottom: 18px !important; }
			.td,
			.m-shell { width: 100% !important; min-width: 100% !important; }

			.mt-left { text-align: left !important; }
			.mt-center { text-align: center !important; }
			
			.me-left { margin-right: auto !important; }
			.me-center { margin: 0 auto !important; }

			.mh-auto { height: auto !important; }
			.mw-auto { width: auto !important; }

			.fluid-img img { width: 100% !important; max-width: 100% !important; height: auto !important; }

			.column,
			.column-top,
			.column-bottom,
			.column-dir,
			.column-dir-top,
			.column-dir-bottom { float: left !important; width: 100% !important; display: block !important; }

			.m-hide { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; }
			.m-block { display: block !important; }

			.mw-15 { width: 15px !important; }

			.mw-2p { width: 2% !important; }
			.mw-32p { width: 32% !important; }
			.mw-49p { width: 49% !important; }
			.mw-100p { width: 100% !important; }
			
			.kmMobileStretch { float: left !important; width: 100% !important; display: block !important; padding: 0 !important; padding-bottom: 15px !important; }
			.fluid-img .kl-image table { width: 100% !important; }
		}
	</style>
</head>
<body class="body" id="body" style="padding:0 !important; margin:0 auto !important; display:block !important; min-width:100% !important; width:100% !important; background:#fffffe; -webkit-text-size-adjust:none;">
	<center>
		<table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 0; padding: 0; width: 100%; height: 100%; background:#F5F3F0;" bgcolor="#fffffe" class="bg-beigef5">
			<tr>
				<td style="margin: 0; padding: 0; width: 100%; height: 100%; background-image: url(https://cdn.shopify.com/s/files/1/0729/1394/4840/files/bg_img_1.png?v=1734347875); background-size: auto; background-position: center center; background-repeat: repeat;" align="center" valign="top">
					<table width="724" border="0" cellspacing="0" cellpadding="0" class="m-shell">
						<tr>
							<td class="td bg-beigefb" bgcolor="#FBF9F6" style="width:724px; min-width:724px; font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; background:#FBF9F6;">
								<!-- Preview Text -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto">
											<div class="klaviyo-block klaviyo-text-block">
												<div class="m-hide" style="font-size: 0pt; line-height: 0pt; mso-hide: all;">
													Cash back on every order, and &euro;5 every time a friend orders.
												</div>
											</div>
										</td>
									</tr>
									<tr>
										<td class="m-hide" style="font-size: 0pt; line-height: 0pt; mso-hide: all;"><span aria-hidden="true">&#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &nbsp;&#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &#8199;&#847; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &shy; &nbsp;</span></td>
									</tr>
								</table>
								<!-- END Preview Text -->


								<!-- Logo -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td class="h2" data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto">
											<div class="klaviyo-block klaviyo-text-block">
												<table width="100%" border="0" cellspacing="0" cellpadding="0">
													<tr>
														<td style="padding: 0 12px 24px;"><table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td style="border-bottom: 1px solid #000001; font-size:0pt; line-height:0pt; text-align:left; padding-bottom: 12px;"><a href="https://www.stickerize.com/" target="_blank"><img src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/logo_footer.png?v=1734345195" width="188" height="30" border="0" alt="STICKERIZE" style="display: block;" /></a></td></tr></table></td>
													</tr>
												</table>
											</div>
										</td>
									</tr>
								</table>
								<!-- END Logo -->

								<!-- Photos -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto">
											<div class="klaviyo-block klaviyo-text-block">
												<table width="100%" border="0" cellspacing="0" cellpadding="0">
													<tr>
														<td style="padding: 0 12px 24px;">
															<table width="100%" border="0" cellspacing="0" cellpadding="0">
															<tr>
																<td class="fluid-img mw-49p" width="343" style="font-size:0pt; line-height:0pt; text-align:left;">
																	<a href="https://stickerize.com/account" target="_blank" rel="noopener"><img src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Email_3_Section_2_1.jpg?v=1775045331" width="343" height="auto" border="0" alt="Holographic stickers" /></a>
																</td>
																<td class="mw-2p" width="10" style="font-size:0pt; line-height:0pt; text-align:left;">&nbsp;</td>
																<td class="fluid-img mw-49p" width="343" style="font-size:0pt; line-height:0pt; text-align:left;">
																	<a href="https://stickerize.com/account" target="_blank" rel="noopener"><img src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Email_3_Section_2_2.jpg?v=1775045331" width="343" height="auto" border="0" alt="Prism stickers" /></a>
																</td>
															</tr>
															</table>
														</td>
													</tr>
												</table>
											</div>
										</td>
									</tr>
								</table>
								<!-- END Photos -->

								<!-- Heading -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto">
											<div class="klaviyo-block klaviyo-text-block">
												<table width="100%" border="0" cellspacing="0" cellpadding="0">
													<tr>
														<td style="padding: 0 12px 24px;">
															<table width="100%" border="0" cellspacing="0" cellpadding="0">
															<tr>
																<td style="color:#000001; font-family:'Courier New', Arial, sans-serif; text-align:left; font-size: 13px; line-height: 17px;">
																	<strong>YOUR ACCOUNT IS READY.</strong>
																</td>
															</tr>
															</table>
														</td>
													</tr>
												</table>
											</div>
										</td>
									</tr>
								</table>
								<!-- END Heading -->

								<!-- Intro -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto">
											<div class="klaviyo-block klaviyo-text-block">
												<table width="100%" border="0" cellspacing="0" cellpadding="0">
													<tr>
														<td style="padding: 0 12px 36px;">
															<table width="100%" border="0" cellspacing="0" cellpadding="0">
															<tr>
																<td style="color:#000001; font-family:'Courier New', Arial, sans-serif; text-align:left; font-size: 13px; line-height: 17px;">
																	<div>When you placed your order, we created a Stickerize account for you. No sign-up, no password. Log in with this email and we&rsquo;ll send you a code.</div>
																	<div style="padding-top: 12px;">Here&rsquo;s what you&rsquo;ll find inside.</div>
																</td>
															</tr>
															</table>
														</td>
													</tr>
												</table>
											</div>
										</td>
									</tr>
								</table>
								<!-- END Intro -->

								<!-- Divider 1 -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto">
											<div class="klaviyo-block klaviyo-text-block">
												<table width="100%" border="0" cellspacing="0" cellpadding="0">
													<tr>
														<td style="padding: 0 12px 36px;">
															<table width="100%" border="0" cellspacing="0" cellpadding="0">
															<tr>
																<td style="height: 1px; line-height: 1px; font-size: 1px; background: #000001;" bgcolor="#000001">&nbsp;</td>
															</tr>
															</table>
														</td>
													</tr>
												</table>
											</div>
										</td>
									</tr>
								</table>
								<!-- END Divider 1 -->

								<!-- Referrals -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto">
											<div class="klaviyo-block klaviyo-text-block">
												<table width="100%" border="0" cellspacing="0" cellpadding="0">
													<tr>
														<td style="padding: 0 12px 36px;">
															<table width="100%" border="0" cellspacing="0" cellpadding="0">
															<tr>
																<td style="color:#000001; font-family:'Courier New', Arial, sans-serif; text-align:left; font-size: 13px; line-height: 17px;">
																	<div style="color:#999999;">REFERRALS</div>
																	<div style="padding-top: 12px;"><strong>SHARE YOUR LINK</strong></div>
																	<div style="padding-top: 24px;">Under Referrals you&rsquo;ll find your personal link. Send it to a friend: they get 10% off their first order, and you get &euro;5 in credits when they place it.</div>
																</td>
															</tr>
															</table>
														</td>
													</tr>
												</table>
											</div>
										</td>
									</tr>
								</table>
								<!-- END Referrals -->

								<!-- Divider 2 -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto">
											<div class="klaviyo-block klaviyo-text-block">
												<table width="100%" border="0" cellspacing="0" cellpadding="0">
													<tr>
														<td style="padding: 0 12px 36px;">
															<table width="100%" border="0" cellspacing="0" cellpadding="0">
															<tr>
																<td style="height: 1px; line-height: 1px; font-size: 1px; background: #000001;" bgcolor="#000001">&nbsp;</td>
															</tr>
															</table>
														</td>
													</tr>
												</table>
											</div>
										</td>
									</tr>
								</table>
								<!-- END Divider 2 -->

								<!-- Credits -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto">
											<div class="klaviyo-block klaviyo-text-block">
												<table width="100%" border="0" cellspacing="0" cellpadding="0">
													<tr>
														<td style="padding: 0 12px 36px;">
															<table width="100%" border="0" cellspacing="0" cellpadding="0">
															<tr>
																<td style="color:#000001; font-family:'Courier New', Arial, sans-serif; text-align:left; font-size: 13px; line-height: 17px;">
																	<div style="color:#999999;">REFERRALS &rarr; CREDITS</div>
																	<div style="padding-top: 12px;"><strong>EARN CREDITS ON EVERY ORDER</strong></div>
																	<div style="padding-top: 24px;">Every order earns you cash back, paid out as credits. The more you order, the more you earn. Your balance shows under Credits, at the top of Referrals.</div>
																	<div style="padding-top: 12px;">To use them on your next order:</div>
																	<div style="padding-top: 12px;">
																		<table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
																		<tr>
																			<td width="24" valign="top" style="color:#000001; font-family:'Courier New', Arial, sans-serif; font-size: 13px; line-height: 17px;">1.</td>
																			<td valign="top" style="color:#000001; font-family:'Courier New', Arial, sans-serif; font-size: 13px; line-height: 17px;">Log in and add your stickers to the cart.</td>
																		</tr>
																		<tr>
																			<td width="24" valign="top" style="color:#000001; font-family:'Courier New', Arial, sans-serif; font-size: 13px; line-height: 17px;">2.</td>
																			<td valign="top" style="color:#000001; font-family:'Courier New', Arial, sans-serif; font-size: 13px; line-height: 17px;">Hit &ldquo;Apply your credits&rdquo; in the cart.</td>
																		</tr>
																		<tr>
																			<td width="24" valign="top" style="color:#000001; font-family:'Courier New', Arial, sans-serif; font-size: 13px; line-height: 17px;">3.</td>
																			<td valign="top" style="color:#000001; font-family:'Courier New', Arial, sans-serif; font-size: 13px; line-height: 17px;">Copy the code that appears and paste it at checkout.</td>
																		</tr>
																		</table>
																	</div>
																</td>
															</tr>
															</table>
														</td>
													</tr>
												</table>
											</div>
										</td>
									</tr>
								</table>
								<!-- END Credits -->

								<!-- Divider 3 -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto">
											<div class="klaviyo-block klaviyo-text-block">
												<table width="100%" border="0" cellspacing="0" cellpadding="0">
													<tr>
														<td style="padding: 0 12px 36px;">
															<table width="100%" border="0" cellspacing="0" cellpadding="0">
															<tr>
																<td style="height: 1px; line-height: 1px; font-size: 1px; background: #000001;" bgcolor="#000001">&nbsp;</td>
															</tr>
															</table>
														</td>
													</tr>
												</table>
											</div>
										</td>
									</tr>
								</table>
								<!-- END Divider 3 -->

								<!-- Brand Hub -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto">
											<div class="klaviyo-block klaviyo-text-block">
												<table width="100%" border="0" cellspacing="0" cellpadding="0">
													<tr>
														<td style="padding: 0 12px 36px;">
															<table width="100%" border="0" cellspacing="0" cellpadding="0">
															<tr>
																<td style="color:#000001; font-family:'Courier New', Arial, sans-serif; text-align:left; font-size: 13px; line-height: 17px;">
																	<div style="color:#999999;">BRAND HUB</div>
																	<div style="padding-top: 12px;"><strong>REORDER IN ONE CLICK</strong></div>
																	<div style="padding-top: 24px;">Every design you order is saved in Brand Hub. Reorder any of them in one click, no new upload needed.</div>
																</td>
															</tr>
															</table>
														</td>
													</tr>
												</table>
											</div>
										</td>
									</tr>
								</table>
								<!-- END Brand Hub -->

								<!-- Divider 4 -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto">
											<div class="klaviyo-block klaviyo-text-block">
												<table width="100%" border="0" cellspacing="0" cellpadding="0">
													<tr>
														<td style="padding: 0 12px 36px;">
															<table width="100%" border="0" cellspacing="0" cellpadding="0">
															<tr>
																<td style="height: 1px; line-height: 1px; font-size: 1px; background: #000001;" bgcolor="#000001">&nbsp;</td>
															</tr>
															</table>
														</td>
													</tr>
												</table>
											</div>
										</td>
									</tr>
								</table>
								<!-- END Divider 4 -->

								<!-- Invoices -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto">
											<div class="klaviyo-block klaviyo-text-block">
												<table width="100%" border="0" cellspacing="0" cellpadding="0">
													<tr>
														<td style="padding: 0 12px 24px;">
															<table width="100%" border="0" cellspacing="0" cellpadding="0">
															<tr>
																<td style="color:#000001; font-family:'Courier New', Arial, sans-serif; text-align:left; font-size: 13px; line-height: 17px;">
																	<div style="color:#999999;">ORDERS &middot; ACCOUNT SETTINGS</div>
																	<div style="padding-top: 12px;"><strong>YOUR INVOICES, READY TO DOWNLOAD</strong></div>
																	<div style="padding-top: 24px;">Your invoices live under Orders, one per order, ready to download. Ordering for a business? Add your VAT number under Account Settings and it shows on your invoices.</div>
																</td>
															</tr>
															</table>
														</td>
													</tr>
												</table>
											</div>
										</td>
									</tr>
								</table>
								<!-- END Invoices -->

								<!-- CTA -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto">
											<div class="klaviyo-block klaviyo-text-block">
												<table width="100%" border="0" cellspacing="0" cellpadding="0">
													<tr>
														<td style="padding: 0 12px 36px;">
															<table width="100%" border="0" cellspacing="0" cellpadding="0">
															<tr>
																<td class="btn-24-12 c-white l-white" bgcolor="#000001" style="mso-padding-alt:24px 12px; color:#fffffe;">
																	<table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<!-- Text arrow rather than ico_arrow_right.png: it inherits the link
																		     colour, so it survives the inversion Gmail and Outlook force in
																		     dark mode, and it cannot skew. -->
																		<td align="left" valign="middle" style="font-family:'Courier New', Arial, sans-serif; font-size: 20px; line-height: 17px; font-weight: 400; text-align:left;">
																			<a href="https://stickerize.com/account" target="_blank" class="link c-white" style="display: block; padding: 21px 0 25px 12px; text-decoration:none; color:#fffffe; text-align:left;">&rarr;</a>
																		</td>
																		<td class="btn" width="100%" style="color:#fffffe; font-family:'Courier New', Arial, sans-serif; text-align:left; font-weight:300; font-size: 13px; line-height: 17px; text-transform: uppercase;">
																			<a href="https://stickerize.com/account" target="_blank" class="link c-white" style="display: block; padding: 23px 12px 23px 12px; text-decoration:none; color:#fffffe;">
																				<span class="link c-white" style="text-decoration:none; color:#fffffe;">GO TO MY ACCOUNT</span>
																			</a>
																		</td>
																	</tr>
																	</table>
																</td>
															</tr>
															</table>
														</td>
													</tr>
												</table>
											</div>
										</td>
									</tr>
								</table>
								<!-- END CTA -->

								<!-- Small print -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto">
											<div class="klaviyo-block klaviyo-text-block">
												<table width="100%" border="0" cellspacing="0" cellpadding="0">
													<tr>
														<td style="padding: 0 12px 36px;">
															<table width="100%" border="0" cellspacing="0" cellpadding="0">
															<tr>
																<td style="color:#000001; font-family:'Courier New', Arial, sans-serif; text-align:left; font-size: 13px; line-height: 17px;">
																	<div style="color:#999999;">Credits are shown in euros and converted to your local currency at checkout, so the amount may vary slightly.</div>
																</td>
															</tr>
															</table>
														</td>
													</tr>
												</table>
											</div>
										</td>
									</tr>
								</table>
								<!-- END Small print -->

<!-- Footer -->
<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
<tbody>
<tr>
<td style="padding: 0 12px 36px;">
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
</html>`;
}
