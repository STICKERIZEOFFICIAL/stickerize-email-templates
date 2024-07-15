export function Head({ title }: { title: string }) {
  return /*html*/ `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
		<title>${title}</title>
		<!--[if !mso]><!-->
		<style type="text/css" media="all">
			@font-face {
			font-family:"neue-helvetica-73-extended";
			src:url("https://cdn.shopify.com/s/files/1/0764/7356/5526/files/helvetica_neue.woff2?v=1704982311") format("woff2"),url("https://cdn.shopify.com/s/files/1/0764/7356/5526/files/helvetica_neue.woff?v=1704982301") format("woff");
			font-display:auto;font-style:normal;font-weight:bold;font-stretch:normal;
			}
			@font-face {
			font-family:"letter-gothic-std";
			src:url("https://use.typekit.net/af/28f823/000000000000000000012e1e/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("woff2"),url("https://use.typekit.net/af/28f823/000000000000000000012e1e/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("woff"),url("https://use.typekit.net/af/28f823/000000000000000000012e1e/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3") format("opentype");
			font-display:auto;font-style:normal;font-weight:400;font-stretch:normal;
			}
	
			@font-face {
			font-family:"letter-gothic-std";
			src:url("https://use.typekit.net/af/89fea7/000000000000000000012e1d/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3") format("woff2"),url("https://use.typekit.net/af/89fea7/000000000000000000012e1d/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3") format("woff"),url("https://use.typekit.net/af/89fea7/000000000000000000012e1d/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i4&v=3") format("opentype");
			font-display:auto;font-style:italic;font-weight:400;font-stretch:normal;
			}
	
			@font-face {
			font-family:"letter-gothic-std";
			src:url("https://use.typekit.net/af/7676e3/000000000000000000012e1b/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"),url("https://use.typekit.net/af/7676e3/000000000000000000012e1b/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"),url("https://use.typekit.net/af/7676e3/000000000000000000012e1b/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
			font-display:auto;font-style:normal;font-weight:700;font-stretch:normal;
			}
	
			@font-face {
			font-family:"letter-gothic-std";
			src:url("https://use.typekit.net/af/cb8eed/000000000000000000012e1c/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i7&v=3") format("woff2"),url("https://use.typekit.net/af/cb8eed/000000000000000000012e1c/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i7&v=3") format("woff"),url("https://use.typekit.net/af/cb8eed/000000000000000000012e1c/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=i7&v=3") format("opentype");
			font-display:auto;font-style:italic;font-weight:700;font-stretch:normal;
			}
	
			.tk-letter-gothic-std { font-family: "letter-gothic-std",monospace; }
		</style>
		<!--<![endif]-->
		<!--[if gte mso 9]>
		<style type="text/css" media="all">
			sup { font-size: 100% !important; }
		</style>
		<![endif]-->
		<!-- body, html, table, thead, tbody, tr, td, div, h1, h2, h3, h4, h5, p, a, span, em, i, strong { font-family: Arial, sans-serif !important; } -->
		
	
		<style type="text/css" media="screen">
			body { padding:0 !important; margin:0 auto !important; display:block !important; min-width:100% !important; width:100% !important; background:#fffffe; -webkit-text-size-adjust:none }
			a { color:#000001; text-decoration:none; font-family: inherit; font-weight: inherit }
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
			.a6S { display: none !important; opacity: 001 !important; } /* Prevents Gmail from displaying an download button on large, non-linked images. */
			img.g-img + div { display:none !important; } /* If the above doesn't work, add a .g-img class to any image in question. */
			u + #body a { color: inherit !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
			#MessageViewBody a { color: inherit !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
			
			.l-white a { color: #fffffe; }
			.l-black a { color: #000001; }
	
			/* Mobile styles */
			@media only screen and (max-device-width: 480px), only screen and (max-width: 480px) {
				.mfz-13 { font-size: 13px !important; }
	
				.mlh-16 { line-height: 16px !important; }
	
				.mfz-14 { font-size: 14px !important; }
	
				.mlh-17 { line-height: 17px !important; }
	
				.mpx-0 { padding-left: 0px !important; padding-right: 0px !important; }
	
				.mpb-16 { padding-bottom: 16px !important; }
	
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
				.column-top { float: left !important; width: 100% !important; display: block !important; }
	
				.m-hide { display: none !important; width: 0 !important; height: 0 !important; font-size: 0 !important; line-height: 0 !important; min-height: 0 !important; }
				.m-block { display: block !important; }
	
				.mw-100p { width: 100% !important; }
	
				.mw-10 { width: 10px !important; }
	
				.mw-img-90,
				.mw-img-90 img { width: 90px !important; height: auto !important; }
			}
			@media screen and (max-device-width: 370px), only screen and (max-width: 370px) {
				.mmfz-13 { font-size: 13px !important; line-height: 16px !important; }
			}
		</style>
	</head>`;
}
