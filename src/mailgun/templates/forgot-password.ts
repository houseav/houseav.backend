import { FORGOT_PASSWORD_ENDPOINT } from '../../../utils/constants';

export const ForgotPassword = (
  temporaryPassword: string,
  email: string,
  timeCreation: Date,
): string => `
<!DOCTYPE html>
<html lang="en" dir="ltr"
	xmlns:v="urn:schemas-microsoft-com:vml"
	xmlns:o="urn:schemas-microsoft-com:office:office" style="color-scheme:light dark;supported-color-schemes:light dark;">
	<head>
		<meta charset="utf-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width,initial-scale=1 user-scalable=yes">
					<meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">
						<meta name="x-apple-disable-message-reformatting">
							<meta name="color-scheme" content="light dark">
								<meta name="supported-color-schemes" content="light dark">
									<title></title>
									<!--[if mso]>
									<noscript>
										<xml>
											<o:OfficeDocumentSettings>
												<o:PixelsPerInch>96</o:PixelsPerInch>
											</o:OfficeDocumentSettings>
										</xml>
									</noscript>
									<![endif]-->
									<!--[if mso]>
									<style>table,tr,td,p,span,a{mso-line-height-rule:exactly !important;line-height:120% !important;mso-table-lspace:0 !important;mso-table-rspace:0 !important;}.mso-padding{padding-top:20px !important;padding-bottom:20px !important;}
</style>
									<![endif]-->
									<style>a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important;font-size:inherit!important;font-family:inherit!important;font-weight:inherit!important;line-height:inherit!important;}u+#body a{color:inherit!important;text-decoration:none!important;font-size:inherit!important;font-family:inherit!important;font-weight:inherit!important;line-height:inherit!important;}#MessageViewBody a{color:inherit!important;text-decoration:none!important;font-size:inherit!important;
font-family:inherit!important;font-weight:inherit!important;line-height:inherit!important;}:root{color-scheme:light dark;supported-color-schemes:light dark;}tr{vertical-align:middle;}p,a,li{color:#000000;font-size:16px;mso-line-height-rule:exactly;line-height:24px;font-family:Arial,sans-serif;}p:first-child{margin-top:0!important;}p:last-child{margin-bottom:0!important;}a{text-decoration:underline;font-weight:bold;color:#0000ff}.alert p{vertical-align:top;color:#fff;font-weight:500;text-align:
center;border-radius:3px 3px 0 0;background-color:#FF9F00;margin:0;padding:20px;}@media only screen and (max-width:599px){.full-width-mobile{width:100%!important;height:auto!important;}.mobile-padding{padding-left:10px!important;padding-right:10px!important;}.mobile-stack{display:block!important;width:100%!important;}}@media (prefers-color-scheme:dark){body,div,table,td{background-color:#000000!important;color:#ffffff!important;}.content{background-color:#222222!important;}p,li,.white-text{color:#B3BDC4!important;}a{color:#84cfe2!important;}a span,.alert-dark p{color:#ffffff!important;}}
</style>
								</head>
								<body class="body" style="background-color:#f4f4f4;">
									<div style="display:none;font-size:1px;color:#f4f4f4;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;"></div>
									<span style="display:none!important;visibility:hidden;mso-hide:all;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;"> &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</span>
									<div role="article" aria-roledescription="email" aria-label="Your Email" lang="en" dir="ltr" style="font-size:16px;font-size:1rem;font-size:max(16px,1rem);background-color:#f4f4f4;">
										<table align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;max-width:600px;width:100%;background-color:#f4f4f4;">
											<tr style="vertical-align:middle;" valign="middle">
												<td>
													<!--[if mso]>
													<table align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse;">
														<tr>
															<td align="center">
																<!--
																<![endif]-->
															</td>
														</tr>
														<tr style="vertical-align:middle;" valign="middle">
															<td align="center">
																<table align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse;max-width:600px;width:100%;background-color:#fffffe;">
																	<tr style="vertical-align:middle;" valign="middle">
																		<td>
																			<table align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse;max-width:600px;width:100%;">
																				<tr style="vertical-align:middle;" valign="middle">
																					<td class="mso-padding alert alert-warning alert-dark" align="center" bgcolor="#8f8f8f" valign="top">
																						<p style="font-size:23px;mso-line-height-rule:exactly;line-height:24px;font-family:Arial,sans-serif;vertical-align:top;color:#fff;font-weight:500;text-align:center;border-radius:3px 3px 0 0;background-color:#8f8f8f;margin:0;padding:20px;margin-top:0!important;margin-bottom:0!important;">houseav.</p>
																					</td>
																				</tr>
																			</table>
																		</td>
																	</tr>
																	<tr style="vertical-align:middle;" valign="middle">
																		<td align="center" style="padding:30px;" class="content">
																			<table align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse;max-width:600px;width:100%;background-color:#fffffe;">
																				<tr style="vertical-align:middle;" valign="middle">
																					<td class="content">
																						<p style="color:#000000;font-size:16px;mso-line-height-rule:exactly;line-height:24px;font-family:Arial,sans-serif;margin-top:0!important;">Ti stiamo inviando una password temporanea per accedere alla pagina di reimpostazione della password del tuo account.</p>
																							
																						<p style="color:#000000;font-size:16px;mso-line-height-rule:exactly;line-height:24px;font-family:Arial,sans-serif;margin-bottom:0!important;">La password temporanea scadra' in 5 minuti.</p>
																						<p style="color:#000000;font-size:23px;mso-line-height-rule:exactly;line-height:24px;font-family:Arial,sans-serif;margin-bottom:0!important;">Ecco la tua password temporanea: <strong>${temporaryPassword}</strong></p>
																					</td>
																				</tr>
																			</table>
																		</td>
																	</tr>
																	<tr style="vertical-align:middle;" valign="middle">
																		<td align="center" class="content">
																			<table role="presentation" border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%">
																				<tr style="vertical-align:middle;" valign="middle">
																					<td align="left" style="padding:0 0 0 30px;" class="content">
																					<a href="${FORGOT_PASSWORD_ENDPOINT}?token=${encodeURIComponent(temporaryPassword)}&email=${encodeURIComponent(email)}&timeCreation=${encodeURIComponent(timeCreation.toISOString())}" 
																					   style="font-size:16px;mso-line-height-rule:exactly;line-height:24px;font-family:Arial,sans-serif;font-weight:bold;background:#d3d3d3;text-decoration:none;padding:15px 25px;color:#040404;border-radius:4px;display:inline-block;mso-padding-alt:0;text-underline-color:#040404;" 
																					   class="dark-button">Reset password</a>

																					<style>
																					    .dark-button:hover {
																					        background-color: #000000 !important; /* Black on hover */
																					        color: #ffffff !important; /* Ensure text remains visible */
																					    }
																					</style>
																					</td>
																				</tr>
																			</table>
																		</td>
																	</tr>
																	<tr style="vertical-align:middle;" valign="middle">
																		<td align="center" style="padding:30px;" class="content">
																			<table align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse;max-width:600px;width:100%;background-color:#fffffe;">
																				<tr style="vertical-align:middle;" valign="middle">
																					<td class="content">
																						<p style="color:#000000;font-size:16px;mso-line-height-rule:exactly;line-height:24px;font-family:Arial,sans-serif;margin-top:0!important;margin-bottom:0!important;">Team Houseav.</p>
																					</td>
																				</tr>
																			</table>
																		</td>
																	</tr>
																</table>
														
															</td>
														</tr>
														<!--[if mso]>
													</td>
												</tr>
											</table>
											<!--
											<![endif]-->
										</table>
									</div>
								</body>
							</html>

`;
