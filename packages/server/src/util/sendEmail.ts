import {
  COMPANY_EMAIL,
  COMPANY_NAME,
  EMAIL_PASSWORD,
  EMAIL_USERNAME
} from "@util/secrets";
import nodemailer from "nodemailer";

export default async (
  email: string,
  subject: string,
  text: string,
  html: string
) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true, // true for 465, false for other ports
      auth: {
        user: EMAIL_USERNAME, // generated ethereal user
        pass: EMAIL_PASSWORD // generated ethereal password
      }
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"${COMPANY_NAME}" <${COMPANY_EMAIL}>`, // sender address
      to: email, // list of receivers
      subject, // Subject line
      text, // plain text body
      html // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (e) {
    console.error(e);
  }
};
