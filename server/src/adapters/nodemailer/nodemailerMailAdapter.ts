import { MailAdapter, SendMailData } from "../mailAdapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5ab2507f8f6ab6",
    pass: "770a9e3648dbe5"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ body, subject }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Israel Santana <israelofi2@gmail.com>',
      subject,
      html: body
    });
  };
}