const nodemailer = require("nodemailer");
require("dotenv").config();

const sendVerificationMail = (email, emailToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDEREMAIL,
      pass: process.env.SENDERPASSWORD,
    },
  });

  const mailOption = {
    from: "no-reply.voxify@gmail.com",
    to: email,
    subject: "Voxify Email Verification",
    html: `<p>Hello, verify your email address by clicking on this</p>
        <br>
        <a href="http://172.22.33.127:5000/verify-email?emailToken=${emailToken}">Click here to verify !</a>
        `,
  };

  transporter.sendMail(mailOption, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendVerificationMail;
