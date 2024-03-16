import { render } from "@react-email/render";
import nodemailer from "nodemailer";

const sendMail = () => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });
  return {
    transporter,
    render,
  };
};

export default sendMail;
