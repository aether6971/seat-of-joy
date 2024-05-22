import SMTPTransport from "nodemailer/lib/smtp-transport";
import nodemailer from "nodemailer";

export const sendMail = async (
  email: string,
  body: string,
  title: string,
  transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>
) => {
  await transporter.sendMail({
    from: {
      name: "Seat of Joy",
      address: "emailverify@seatofjoy.com",
    },
    to: email || "",
    subject: title,
    html: body, // HTML body
  });
};
