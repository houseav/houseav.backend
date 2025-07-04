import { FORGOT_PASSWORD_ENDPOINT } from '../../../utils/constants';

export const ForgotPassword = (
  temporaryPassword: string,
  email: string,
  timeCreation: Date,
): string => `
<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
<head>
  <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="x-apple-disable-message-reformatting" />
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <!--<![endif]-->
  <title></title>

  <style type="text/css">
    /* Mobile responsiveness */
    @media only screen and (max-width: 600px) {
      img {
        width: 40px !important;
        max-width: 40px !important;
      }
    }

    @media only screen and (min-width: 620px) {
      .u-row {
        width: 600px !important;
      }

      .u-row .u-col {
        vertical-align: top;
      }

      .u-row .u-col-100 {
        width: 600px !important;
      }
    }

    @media only screen and (max-width: 620px) {
      .u-row-container {
        max-width: 100% !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
      }

      .u-row {
        width: 100% !important;
      }

      .u-row .u-col {
        display: block !important;
        width: 100% !important;
        min-width: 320px !important;
        max-width: 100% !important;
      }

      .u-row .u-col > div {
        margin: 0 auto;
      }

      .u-row .u-col img {
        max-width: 100% !important;
      }
    }

    body {
      margin: 0;
      padding: 0;
    }
    table,
    td,
    tr {
      border-collapse: collapse;
      vertical-align: top;
    }
    .ie-container table,
    .mso-container table {
      table-layout: fixed;
    }
    * {
      line-height: inherit;
    }
    a[x-apple-data-detectors="true"] {
      color: inherit !important;
      text-decoration: none !important;
    }

    @media (max-width: 480px) {
      .hide-mobile {
        max-height: 0px;
        overflow: hidden;
        display: none !important;
      }
    }

    table,
    td {
      color: #000000;
    }
    @media (max-width: 480px) {
      #u_content_heading_3 .v-container-padding-padding {
        padding: 5px 10px 20px !important;
      }
      #u_content_heading_3 .v-text-align {
        text-align: center !important;
      }
      #u_content_heading_1 .v-font-size {
        font-size: 22px !important;
      }
      #u_content_text_1 .v-container-padding-padding {
        padding: 25px 20px 70px !important;
      }
      #u_content_text_1 .v-text-align {
        text-align: justify !important;
      }
      #u_content_text_2 .v-container-padding-padding {
        padding: 50px 20px 10px !important;
      }
      #u_content_menu_1 .v-padding {
        padding: 5px 11px !important;
      }
      #u_content_text_3 .v-container-padding-padding {
        padding: 10px 20px 50px !important;
      }
    }
  </style>

  <!--[if !mso]><!-->
  <link
    href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap"
    rel="stylesheet"
    type="text/css"
  />
  <link
    href="https://fonts.googleapis.com/css?family=Rubik:400,700&display=swap"
    rel="stylesheet"
    type="text/css"
  />
  <!--<![endif]-->
</head>

<body
  class="clean-body u_body"
  style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #506791; color: #000000;"
>
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table
    id="u_body"
    style="
      border-collapse: collapse;
      table-layout: fixed;
      border-spacing: 0;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
      vertical-align: top;
      min-width: 320px;
      margin: 0 auto;
      background-color: #506791;
      width: 100%;
    "
    cellpadding="0"
    cellspacing="0"
  >
    <tbody>
      <tr style="vertical-align: top">
        <td
          style="
            word-break: break-word;
            border-collapse: collapse !important;
            vertical-align: top;
          "
        >
          <!--[if (mso)|(IE)]>
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="center" style="background-color: #506791;">
          <![endif]-->

          <!-- ====================================== 1st ROW ====================================== -->
          <div
            class="u-row-container"
            style="padding: 0px; background-color: transparent"
          >
            <div
              class="u-row"
              style="
                margin: 0 auto;
                min-width: 320px;
                max-width: 600px;
                overflow-wrap: break-word;
                word-wrap: break-word;
                word-break: break-word;
                background-color: transparent;
              "
            >
              <div
                style="
                  border-collapse: collapse;
                  display: table;
                  width: 100%;
                  height: 100%;
                  background-color: transparent;
                "
              >
                <!--[if (mso)|(IE)]>
                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                >
                  <tr>
                    <td
                      style="padding: 0px;background-color: transparent;"
                      align="center"
                    >
                      <table
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        style="width:600px;"
                      >
                        <tr style="background-color: transparent;">
                <![endif]-->

                <!--[if (mso)|(IE)]>
                <td
                  align="center"
                  width="600"
                  style="
                    background-color: #506791;
                    width: 600px;
                    padding: 0px;
                    border-top: 0px solid transparent;
                    border-left: 0px solid transparent;
                    border-right: 0px solid transparent;
                    border-bottom: 0px solid transparent;
                  "
                  valign="top"
                >
                <![endif]-->
                <!-- *** Removed conflicting min-width/max-width here *** -->
                <div
                  class="u-col u-col-100"
                  style="
                    display: table-cell;
                    vertical-align: top;
                  "
                >
                  <div
                    style="
                      background-color: #506791;
                      height: 100%;
                      width: 100% !important;
                    "
                  >
                    <!--[if (!mso)&(!IE)]><!-->
                    <div
                      style="
                        box-sizing: border-box;
                        height: 100%;
                        padding: 0px;
                        border-top: 0px solid transparent;
                        border-left: 0px solid transparent;
                        border-right: 0px solid transparent;
                        border-bottom: 0px solid transparent;
                      "
                    >
                      <!--<![endif]-->

                      <table
                        id="u_content_heading_3"
                        style="font-family: 'Open Sans', sans-serif; margin-top: 30px"
                        role="presentation"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        border="0"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="v-container-padding-padding"
                              style="
                                padding: 20px 0;
                                font-family: 'Open Sans', sans-serif;
                              "
                              align="center"
                            >
                              <table
                                align="center"
                                style="
                                  border-collapse: collapse;
                                  text-align: center;
                                "
                              >
                                <tr>
                                  <td style="padding-right: 10px">
                                    <img
                                      src="https://res.cloudinary.com/drizqfyp5/image/upload/v1738053686/home_lr2ppx.png"
                                      alt="Logo"
                                      width="40"
                                      style="
                                        display: block;
                                        outline: none;
                                        text-decoration: none;
                                        border: none;
                                      "
                                    />
                                  </td>
                                  <td>
                                    <a
                                      href="https://houseav.life"
                                      style="
                                        text-decoration: none;
                                        color: #000000;
                                      "
                                    >
                                      <h1
                                        style="
                                          margin: 0;
                                          color: inherit;
                                          margin-top: 5px;
                                          font-size: 22px;
                                          font-weight: 400;
                                          text-align: left;
                                        "
                                      >
                                        .houseav
                                      </h1>
                                    </a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table
                        style="font-family: 'Open Sans', sans-serif"
                        role="presentation"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        border="0"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="v-container-padding-padding"
                              style="
                                overflow-wrap: break-word;
                                word-break: break-word;
                                padding: 0px;
                                font-family: 'Open Sans', sans-serif;
                              "
                              align="left"
                            ></td>
                          </tr>
                        </tbody>
                      </table>

                      <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                  </div>
                </div>
                <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
              </div>
            </div>
          </div>

          <!-- ====================================== 2nd ROW ====================================== -->
          <div
            class="u-row-container"
            style="padding: 0px; background-color: transparent"
          >
            <div
              class="u-row"
              style="
                margin: 0 auto;
                min-width: 320px;
                max-width: 600px;
                overflow-wrap: break-word;
                word-wrap: break-word;
                word-break: break-word;
                background-color: transparent;
              "
            >
              <div
                style="
                  border-collapse: collapse;
                  display: table;
                  width: 100%;
                  height: 100%;
                  background-color: transparent;
                "
              >
                <!--[if (mso)|(IE)]>
                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                >
                  <tr>
                    <td
                      style="padding: 0px;background-color: transparent;"
                      align="center"
                    >
                      <table
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        style="width:600px;"
                      >
                        <tr style="background-color: transparent;">
                <![endif]-->

                <!--[if (mso)|(IE)]>
                <td
                  align="center"
                  width="600"
                  style="
                    background-color: #7b97bc;
                    width: 600px;
                    padding: 0px;
                    border-top: 0px solid transparent;
                    border-left: 0px solid transparent;
                    border-right: 0px solid transparent;
                    border-bottom: 0px solid transparent;
                    border-radius: 0px;
                    -webkit-border-radius: 0px;
                    -moz-border-radius: 0px;
                  "
                  valign="top"
                >
                <![endif]-->
                <!-- *** Removed conflicting min-width/max-width here *** -->
                <div
                  class="u-col u-col-100"
                  style="
                    display: table-cell;
                    vertical-align: top;
                  "
                >
                  <div
                    style="
                      background-color: #7b97bc;
                      height: 100%;
                      width: 100% !important;
                      border-radius: 2%;
                      -webkit-border-radius: 2%;
                      -moz-border-radius: 2%;
                    "
                  >
                    <!--[if (!mso)&(!IE)]><!-->
                    <div
                      style="
                        box-sizing: border-box;
                        height: 80%;
                        padding: 0px;
                        border-radius: 2%;
                        -webkit-border-radius: 2%;
                        -moz-border-radius: 2%;
                      "
                    >
                      <!--<![endif]-->

                      <table
                        id="u_content_heading_1"
                        style="font-family: 'Open Sans', sans-serif"
                        role="presentation"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        border="0"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="v-container-padding-padding"
                              style="
                                overflow-wrap: break-word;
                                word-break: break-word;
                                padding: 50px 10px 20px;
                                font-family: 'Open Sans', sans-serif;
                              "
                              align="left"
                            >
                              <!--[if mso]>
                              <table width="100%">
                                <tr>
                                  <td>
                              <![endif]-->
                              <h1
                                class="v-text-align v-font-size"
                                style="
                                  margin: 0px;
                                  color: #ffffff;
                                  line-height: 140%;
                                  text-align: center;
                                  word-wrap: break-word;
                                  font-family: 'Ubuntu', sans-serif;
                                  font-size: 26px;
                                  font-weight: 400;
                                "
                              >
                                <div>
                                  <strong>Password Reset 🔄</strong>
                                  <br />
                                </div>
                              </h1>
                              <!--[if mso]>
                                  </td>
                                </tr>
                              </table>
                              <![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table
                        id="u_content_text_1"
                        style="font-family: 'Open Sans', sans-serif"
                        role="presentation"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        border="0"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="v-container-padding-padding"
                              style="
                                overflow-wrap: break-word;
                                word-break: break-word;
                                padding: 25px 50px 70px;
                                font-family: 'Open Sans', sans-serif;
                              "
                              align="left"
                            >
                              <div
                                class="v-text-align v-font-size"
                                style="
                                  font-size: 14px;
                                  color: #ffffff;
                                  line-height: 160%;
                                  text-align: justify;
                                  word-wrap: break-word;
                                "
                              >
                                <p
                                  style="
                                    font-size: 14px;
                                    line-height: 160%;
                                    margin: 0px;
                                  "
                                >
                                  <span
                                    style="
                                      font-size: 16px;
                                      line-height: 25.6px;
                                    "
                                    ><strong>Ciao 👋</strong></span
                                  >
                                </p>
                                <p
                                  style="
                                    font-size: 14px;
                                    line-height: 160%;
                                    margin: 0px;
                                  "
                                ></p>
                                <p
                                  style="
                                    font-size: 14px;
                                    line-height: 160%;
                                    margin: 0px;
                                  "
                                >
                                  
								Ti stiamo inviando una link temporaneo per accedere alla pagina di reimpostazione della password del tuo account.
                                </p>
                                <p
                                  style="
                                    font-size: 14px;
                                    line-height: 160%;
                                    margin: 0px;
                                  "
                                ></p>
                                <p
                                  style="
                                    font-size: 14px;
                                    line-height: 160%;
                                    margin: 0px;
                                  "
                                >
                                  Clicca il pulsante qui sotto, scadrá in 5 minuti.
                                </p>

                                <p
                                  style="
                                    font-size: 14px;
                                    line-height: 160%;
                                    margin: 0px;
                                  "
                                ></p>
								<table align="start" role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse:collapse;max-width:600px;width:100%;background-color:#7b97bc; padding: 20px; margin: 20px;">
																	<tr style="vertical-align:middle;" valign="middle">
																		<td>
																				<tr style="vertical-align:middle;" valign="middle">
																					<td align="left" style="padding:0 0 0 30px;" class="content">
																					<a href="${FORGOT_PASSWORD_ENDPOINT}?token=${encodeURIComponent(temporaryPassword)}&email=${encodeURIComponent(email)}&timeCreation=${encodeURIComponent(timeCreation.toISOString())}" 
																					   style="font-size:16px;mso-line-height-rule:exactly;line-height:24px;font-family:Arial,sans-serif;font-weight:bold;background:#d3d3d3;text-decoration:none;padding:15px 25px;color:#040404;border-radius:4px;display:inline-block;mso-padding-alt:0;text-underline-color:#ffffff;" 
																					   class="dark-button">Reset password</a>

																					<style>
																					    .dark-button:hover {
																					        background-color: #000000 !important; /* Black on hover */
																					        color: #ffffff !important; /* Ensure text remains visible */
																					    }
																					</style>
																					</td>
																				</tr>																			
																		</td>
																	</tr>
																</table>
                                <br />
                                <br />
                                <p
                                  style="
                                    font-size: 14px;
                                    line-height: 160%;
                                    margin: 0px;
                                    color: #ffffff;
                                  "
                                >
                                  <strong>Team .houseav</strong>
                                </p>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                  </div>
                </div>
                <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
              </div>
            </div>
          </div>

          <!-- ====================================== 3rd ROW ====================================== -->
          <div
            class="u-row-container"
            style="padding: 0px; background-color: transparent"
          >
            <div
              class="u-row"
              style="
                margin: 0 auto;
                min-width: 320px;
                max-width: 600px;
                overflow-wrap: break-word;
                word-wrap: break-word;
                word-break: break-word;
                background-color: transparent;
              "
            >
              <div
                style="
                  border-collapse: collapse;
                  display: table;
                  width: 100%;
                  height: 100%;
                  background-color: transparent;
                "
              >
                <!--[if (mso)|(IE)]>
                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                >
                  <tr>
                    <td
                      style="padding: 0px;background-color: transparent;"
                      align="center"
                    >
                      <table
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        style="width:600px;"
                      >
                        <tr style="background-color: transparent;">
                <![endif]-->

                <!--[if (mso)|(IE)]>
                <td
                  align="center"
                  width="600"
                  style="
                    background-color: #506791;
                    width: 600px;
                    padding: 0px;
                    border-top: 0px solid transparent;
                    border-left: 0px solid transparent;
                    border-right: 0px solid transparent;
                    border-bottom: 0px solid transparent;
                    border-radius: 0px;
                    -webkit-border-radius: 0px;
                    -moz-border-radius: 0px;
                  "
                  valign="top"
                >
                <![endif]-->
                <!-- *** Removed conflicting min-width/max-width here *** -->
                <div
                  class="u-col u-col-100"
                  style="
                    display: table-cell;
                    vertical-align: top;
                  "
                >
                  <div
                    style="
                      background-color: #506791;
                      height: 100%;
                      width: 100% !important;
                      border-radius: 0px;
                      -webkit-border-radius: 0px;
                      -moz-border-radius: 0px;
                    "
                  >
                    <!--[if (!mso)&(!IE)]><!-->
                    <div
                      style="
                        box-sizing: border-box;
                        height: 100%;
                        padding: 0px;
                        border-top: 0px solid transparent;
                        border-left: 0px solid transparent;
                        border-right: 0px solid transparent;
                        border-bottom: 0px solid transparent;
                        border-radius: 0px;
                        -webkit-border-radius: 0px;
                        -moz-border-radius: 0px;
                      "
                    >
                      <!--<![endif]-->

                      <table
                        id="u_content_text_2"
                        style="font-family: 'Open Sans', sans-serif"
                        role="presentation"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        border="0"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="v-container-padding-padding"
                              style="
                                overflow-wrap: break-word;
                                word-break: break-word;
                                padding: 70px 80px 10px;
                                font-family: 'Open Sans', sans-serif;
                              "
                              align="left"
                            >
                              <div
                                class="v-text-align v-font-size"
                                style="
                                  font-size: 14px;
                                  color: #ecf0f1;
                                  line-height: 140%;
                                  text-align: center;
                                  word-wrap: break-word;
                                "
                              >
                                <p
                                  style="
                                    font-size: 14px;
                                    line-height: 140%;
                                    margin: 0px;
                                  "
                                >
                                  Se hai domande, scrivici a
                                  <a
                                    href="mailto:info.houseav@gmail.com?subject=Richiesta%20Informazioni%20|%20User&body=Ciao,%20ti%20scrivo%20per%20avere%20maggiori%20informazioni."
                                    style="
                                      color: rgb(158, 158, 158);
                                      text-decoration: underline;
                                      line-height: inherit;
                                    "
                                    >info.houseav@gmail.com</a
                                  >.
                                </p>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <table
                        style="font-family: 'Open Sans', sans-serif"
                        role="presentation"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        border="0"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="v-container-padding-padding"
                              style="
                                overflow-wrap: break-word;
                                word-break: break-word;
                                padding: 20px;
                                font-family: 'Open Sans', sans-serif;
                              "
                              align="left"
                            >
                              <table
                                height="0px"
                                align="center"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                width="63%"
                                style="
                                  border-collapse: collapse;
                                  table-layout: fixed;
                                  border-spacing: 0;
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  vertical-align: top;
                                  border-top: 1px solid #95a5a6;
                                  -ms-text-size-adjust: 100%;
                                  -webkit-text-size-adjust: 100%;
                                "
                              >
                                <tbody>
                                  <tr style="vertical-align: top">
                                    <td
                                      style="
                                        word-break: break-word;
                                        border-collapse: collapse !important;
                                        vertical-align: top;
                                        font-size: 0px;
                                        line-height: 0px;
                                        mso-line-height-rule: exactly;
                                        -ms-text-size-adjust: 100%;
                                        -webkit-text-size-adjust: 100%;
                                      "
                                    >
                                      <span>&#160;</span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                              <table
                                id="u_content_heading_3"
                                style="font-family: 'Open Sans', sans-serif"
                                role="presentation"
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                border="0"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="v-container-padding-padding"
                                      style="
                                        padding: 20px 0;
                                        font-family: 'Open Sans', sans-serif;
                                      "
                                      align="center"
                                    >
                                      <table
                                        align="center"
                                        style="
                                          border-collapse: collapse;
                                          text-align: center;
                                        "
                                      >
                                        <tr>
                                          <td>
                                            <img
                                              src="https://res.cloudinary.com/drizqfyp5/image/upload/v1738054373/world-map-svgrepo-com_1_pwlzkq.png"
                                              alt="Logo"
                                              width="40"
                                              style="
                                                display: block;
                                                outline: none;
                                                text-decoration: none;
                                                border: none;
                                              "
                                            />
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if (!mso)&(!IE)]><!-->
                            </td>
                            <!--<![endif]-->
                          </tr>
                        </tbody>
                      </table>

                      <!--[if (!mso)&(!IE)]><!-->
                    </div>
                    <!--<![endif]-->
                  </div>
                </div>
                <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
              </div>
            </div>
          </div>

          <!--[if (mso)|(IE)]>
              </td>
            </tr>
          </table>
          <![endif]-->
        </td>
      </tr>
    </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>
</html>
`;
