/**
 * Ported verbatim from `other emails/klaviyo/email-all components.html`.
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
													{% render_variable preview_text %}
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
														<td style="padding-left: 12px; padding-right: 12px;"><table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation"><tr><td style="border-bottom: 1px solid #000001; font-size:0pt; line-height:0pt; text-align:left; padding-bottom: 12px;"><a href="https://www.stickerize.com/" target="_blank"><img src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/logo_footer.png?v=1734345195" width="188" height="30" border="0" alt="STICKERIZE" style="display: block;" /></a></td></tr></table></td>
													</tr>
												</table>
											</div>
										</td>
									</tr>
								</table>
								<!-- END Logo -->

								<!-- Image Block - 1 Image -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto">
											<div class="klaviyo-block klaviyo-text-block">
												<table width="100%" border="0" cellspacing="0" cellpadding="0">
													<tr>
														<td  style="padding: 12px;">
															<table width="100%" border="0" cellspacing="0" cellpadding="0">
																<tr>
																	<td class="fluid-img" width="343" style="font-size:0pt; line-height:0pt; text-align:left;">
																		<a href="https://www.stickerize.com/" target="_blank"><img src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/241121_Stickerize_packaging_6.jpg?v=1740917483" width="700" height="auto" border="0" alt="" /></a>
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
								<!-- END Image Block - 1 Image -->

								<!-- Image Block - 2 Images -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto">
											<div class="klaviyo-block klaviyo-text-block">
												<table width="100%" border="0" cellspacing="0" cellpadding="0">
													<tr>
														<td  style="padding: 12px;">
															<table width="100%" border="0" cellspacing="0" cellpadding="0">
																<tr>
																	<td class="fluid-img mw-49p" width="343" style="font-size:0pt; line-height:0pt; text-align:left;">
																		<a href="https://www.stickerize.com/" target="_blank"><img src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Email_3_Section_2_1.jpg?v=1775045331" width="343" height="auto" border="0" alt="" /></a>
																	</td>
																	<td class="mw-2p" width="10" style="font-size:0pt; line-height:0pt; text-align:left;"></td>
																	<td class="fluid-img mw-49p" width="343" style="font-size:0pt; line-height:0pt; text-align:left;">
																		<a href="https://www.stickerize.com/" target="_blank"><img src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Email_3_Section_2_1.jpg?v=1775045331" width="343" height="auto" border="0" alt="" /></a>
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
								<!-- END Image Block - 2 Images -->

								<!-- Image Block - 3 Images -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto">
											<div class="klaviyo-block klaviyo-text-block">
												<table width="100%" border="0" cellspacing="0" cellpadding="0">
													<tr>
														<td  style="padding: 12px;">
															<table width="100%" border="0" cellspacing="0" cellpadding="0">
																<tr>
																	<td class="fluid-img mw-32p" width="226" style="font-size:0pt; line-height:0pt; text-align:left;">
																		<a href="https://www.stickerize.com/" target="_blank"><img src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Email_3_Section_2_2.jpg?v=1775045331" width="226" height="auto" border="0" alt="" /></a>
																	</td>
																	<td class="mw-2p" width="10" style="font-size:0pt; line-height:0pt; text-align:left;"></td>
																	<td class="fluid-img mw-32p" width="226" style="font-size:0pt; line-height:0pt; text-align:left;">
																		<a href="https://www.stickerize.com/" target="_blank"><img src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Email_3_Section_2_2.jpg?v=1775045331" width="226" height="auto" border="0" alt="" /></a>
																	</td>
																	<td class="mw-2p" width="10" style="font-size:0pt; line-height:0pt; text-align:left;"></td>
																	<td class="fluid-img mw-32p" width="226" style="font-size:0pt; line-height:0pt; text-align:left;">
																		<a href="https://www.stickerize.com/" target="_blank"><img src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Email_3_Section_2_2.jpg?v=1775045331" width="226" height="auto" border="0" alt="" /></a>
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
								<!-- END Image Block - 3 Images -->

								<!-- Image Block - 4 Images -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto">
											<div class="klaviyo-block klaviyo-text-block">
												<table width="100%" border="0" cellspacing="0" cellpadding="0">
													<tr>
														<td  style="padding: 12px;">
															<table width="100%" border="0" cellspacing="0" cellpadding="0">
																<tr>
																	<th class="column-top" valign="top" width="344" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
																		<table width="100%" border="0" cellspacing="0" cellpadding="0">
																			<tr>
																				<td class="fluid-img mw-49p" width="167" style="font-size:0pt; line-height:0pt; text-align:left;">
																					<a href="https://www.stickerize.com/" target="_blank"><img src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Left_Image.jpg?v=1765296929" width="167" height="auto" border="0" alt="" /></a>
																				</td>
																				<td class="mw-2p" width="10" style="font-size:0pt; line-height:0pt; text-align:left;"></td>
																				<td class="fluid-img mw-49p" width="167" style="font-size:0pt; line-height:0pt; text-align:left;">
																					<a href="https://www.stickerize.com/" target="_blank"><img src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Left_Image.jpg?v=1765296929" width="167" height="auto" border="0" alt="" /></a>
																				</td>
																			</tr>
																		</table>
																	</th>
																	<th class="column-top mpb-5" valign="top" width="10" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
																	<th class="column-top" valign="top" width="344" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
																		<table width="100%" border="0" cellspacing="0" cellpadding="0">
																			<tr>
																				<td class="fluid-img mw-49p" width="167" style="font-size:0pt; line-height:0pt; text-align:left;">
																					<a href="https://www.stickerize.com/" target="_blank"><img src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Left_Image.jpg?v=1765296929" width="167" height="auto" border="0" alt="" /></a>
																				</td>
																				<td class="mw-2p" width="10" style="font-size:0pt; line-height:0pt; text-align:left;"></td>
																				<td class="fluid-img mw-49p" width="167" style="font-size:0pt; line-height:0pt; text-align:left;">
																					<a href="https://www.stickerize.com/" target="_blank"><img src="https://cdn.shopify.com/s/files/1/0729/1394/4840/files/Left_Image.jpg?v=1765296929" width="167" height="auto" border="0" alt="" /></a>
																				</td>
																			</tr>
																		</table>
																	</th>
																</tr>
															</table>
														</td>
													</tr>
												</table>
											</div>
										</td>
									</tr>
								</table>
								<!-- END Image Block - 4 Images -->

								<!-- Title -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto">
											<div class="klaviyo-block klaviyo-text-block">
												<table width="100%" border="0" cellspacing="0" cellpadding="0">
													<tr>
														<td  style="padding: 12px;">
															<table width="100%" border="0" cellspacing="0" cellpadding="0">
																<tr>
																	<td  style="color:#000001; font-family:'Courier New', Arial, sans-serif; text-align:left; font-size: 13px; line-height: 17px;">
																		<strong>THANK YOU</strong>
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
								<!-- END Title -->

								<!-- Text -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto">
											<div class="klaviyo-block klaviyo-text-block">
												<table width="100%" border="0" cellspacing="0" cellpadding="0">
													<tr>
														<td  style="padding: 12px;">
															<table width="100%" border="0" cellspacing="0" cellpadding="0">
																<tr>
																	<td  style="color:#000001; font-family:'Courier New', Arial, sans-serif; text-align:left; font-size: 13px; line-height: 17px;">
																		STICKERIZE&copy; is the easiest way to buy custom-printed stickers online. Order in 45 seconds and we'll turn your designs into custom stickers.STICKERIZE&copy;STICKERIZE&copy; is the easiest way to buy custom-printed stickers online. Order in 45 seconds and we'll turn your designs into custom stickers.STICKERIZE&copy;STICKERIZE&copy; is the easiest way to buy custom-printed stickers online. Order in 45 seconds and we'll turn your designs into custom stickers.STICKERIZE&copy;
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
								<!-- END Text -->

								<!-- Icons -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto">
											<div class="klaviyo-block klaviyo-text-block">
												<table width="100%" border="0" cellspacing="0" cellpadding="0">
													<tr>
														<td  style="padding: 12px;">
															<table width="100%" border="0" cellspacing="0" cellpadding="0">
																<tr>
																	<th class="column-top" valign="top" width="221" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
																		<table width="100%" border="0" cellspacing="0" cellpadding="0">
																			<tr>
																				<td  style="font-size:0pt; line-height:0pt; text-align:left; padding-bottom: 12px;">
																					<img src="https://d3k81ch9hvuctc.cloudfront.net/company/Td2hz3/images/images_ico_globebbc48.png" width="20" height="auto" border="0" alt="" />
																				</td>
																			</tr>
																			<tr>
																				<td  style="color:#000001; font-family:'Courier New', Arial, sans-serif; text-align:left; font-size: 13px; line-height: 17px;">
																					2-4 days shipping<span class="m-hide"><br /></span> to Sweden
																				</td>
																			</tr>
																		</table>
																	</th>
																	<th class="column-top mpb-18" valign="top" width="18" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
																	<th class="column-top" valign="top" width="221" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
																		<table width="100%" border="0" cellspacing="0" cellpadding="0">
																			<tr>
																				<td  style="font-size:0pt; line-height:0pt; text-align:left; padding-bottom: 12px;">
																					<img src="https://d3k81ch9hvuctc.cloudfront.net/company/Td2hz3/images/images_ico_editorb1313.png" width="20" height="auto" border="0" alt="" />
																				</td>
																			</tr>
																			<tr>
																				<td  style="color:#000001; font-family:'Courier New', Arial, sans-serif; text-align:left; font-size: 13px; line-height: 17px;">
																					True-to-size<sup  style="font-size:0.6em; line-height:1;">&trade;</sup> GPT-powered<span class="m-hide"><br /></span> editor
																				</td>
																			</tr>
																		</table>
																	</th>
																	<th class="column-top mpb-18" valign="top" width="18" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
																	<th class="column-top" valign="top" width="221" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;">
																		<table width="100%" border="0" cellspacing="0" cellpadding="0">
																			<tr>
																				<td  style="font-size:0pt; line-height:0pt; text-align:left; padding-bottom: 12px;">
																					<img src="https://d3k81ch9hvuctc.cloudfront.net/company/Td2hz3/images/images_ico_delivery52a94.png" width="20" height="auto" border="0" alt="" />
																				</td>
																			</tr>
																			<tr>
																				<td  style="color:#000001; font-family:'Courier New', Arial, sans-serif; text-align:left; font-size: 13px; line-height: 17px;">
																					Climate-compensated<span class="m-hide"><br /></span> shipments
																				</td>
																			</tr>
																		</table>
																	</th>
																</tr>
															</table>
														</td>
													</tr>
												</table>
											</div>
										</td>
									</tr>
								</table>
								<!-- END Icons -->

								<!-- CTA -->
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td data-klaviyo-region="true" data-klaviyo-region-width-pixels="auto">
											<div class="klaviyo-block klaviyo-text-block">
												<table width="100%" border="0" cellspacing="0" cellpadding="0">
													<tr>
														<td  style="padding: 12px;">
															<!-- Button -->
															<table width="100%" border="0" cellspacing="0" cellpadding="0">
																<tr>
																	<td class="btn-24-12 c-white l-white" bgcolor="#000001" style="mso-padding-alt:24px 12px; color:#fffffe;">
																		<table width="100%" border="0" cellspacing="0" cellpadding="0">
																			<tr>
																				<td class="btn" style="color:#fffffe; font-family:'Courier New', Arial, sans-serif; text-align:left; font-weight:300; font-size: 13px; line-height: 17px; text-transform: uppercase;">
																					<a href="https://www.stickerize.com/" target="_blank" class="link c-white" style="display: block; padding: 23px 0 23px 12px; text-decoration:none; color:#fffffe;">
																						<span class="link c-white" style="text-decoration:none; color:#fffffe;">BUTTON PRIMARY</span>
																					</a>
																				</td>
																				<!-- Text arrow rather than ico_arrow_right.png: it
																				     inherits the link colour, so it survives the
																				     inversion Gmail and Outlook force in dark mode,
																				     and it cannot skew. -->
																				<td  width="44" align="right" valign="middle" style="font-family:'Courier New', Arial, sans-serif; font-size: 20px; line-height: 18px; font-weight: 400; text-align:right;">
																					<a href="https://www.stickerize.com/" target="_blank" class="link c-white" style="display: block; padding: 21px 12px 21px 0; text-decoration:none; color:#fffffe; text-align:right;">&rarr;</a>
																				</td>
																			</tr>
																		</table>
																	</td>
																</tr>
															</table>
															<!-- END Button -->
														</td>
													</tr>
												</table>
											</div>
										</td>
									</tr>
								</table>
								<!-- END CTA -->

								<!-- Footer -->
<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
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
