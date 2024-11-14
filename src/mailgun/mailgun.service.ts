import { Injectable } from '@nestjs/common';
import * as formData from 'form-data';
import Mailgun, { MessagesSendResult } from 'mailgun.js';
import {
  MAILGUN_DOMAIN,
  MAILGUN_FROM_NO_REPLY,
  MAILGUN_USER,
} from '../../utils/constants';
import { alert } from './templates/sign-up';
import { ForgotPassword } from './templates/forgot-password';
import { UserVerifiedMailTemplate } from './templates/user-verified';

@Injectable()
export class MailgunService {
  async sendEmail(destinationEmail: string): Promise<MessagesSendResult> {
    try {
      const mailgun = new Mailgun(formData);
      const mg = mailgun.client({
        username: 'mailgun@support.houseav.life',
        key: process.env.MAILGUN_API_KEY,
      });

      const msg = await mg.messages.create(MAILGUN_DOMAIN, {
        from: `${MAILGUN_USER} <${MAILGUN_FROM_NO_REPLY}>`,
        to: [destinationEmail],
        subject: '[Houseav] Hello There!',
        html: alert,
      });
      console.log(`[INFO] email sent: ${JSON.stringify(msg)}`);
      return msg;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async sendForgotPasswordEmail(
    temporaryPassword: string,
    email: string,
    timeCreation: Date,
  ): Promise<MessagesSendResult> {
    try {
      const mailgun = new Mailgun(formData);
      const mg = mailgun.client({
        username: 'mailgun@support.houseav.life',
        key: process.env.MAILGUN_API_KEY,
      });

      const msg = await mg.messages.create(MAILGUN_DOMAIN, {
        from: `${MAILGUN_USER} <${MAILGUN_FROM_NO_REPLY}>`,
        to: [email],
        subject: '[Houseav] Reset Password',
        html: ForgotPassword(temporaryPassword, email, timeCreation),
      });

      return msg;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async sendEmailVerified(email: string): Promise<MessagesSendResult> {
    try {
      const mailgun = new Mailgun(formData);
      const mg = mailgun.client({
        username: 'mailgun@support.houseav.life',
        key: process.env.MAILGUN_API_KEY,
      });

      const msg = await mg.messages.create(MAILGUN_DOMAIN, {
        from: `${MAILGUN_USER} <${MAILGUN_FROM_NO_REPLY}>`,
        to: [email],
        subject: '[Houseav] Account Verified',
        html: UserVerifiedMailTemplate(),
      });

      return msg;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
