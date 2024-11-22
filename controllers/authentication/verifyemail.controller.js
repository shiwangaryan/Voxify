const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const User = require("../../models/user.model");
require("dotenv").config();

const CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRETKEY;
const REDIRECT_URI = process.env.OAUTH_REDIRECT_URI;
const REFRESH_TOKEN = process.env.OAUTH_REFRESH_TOKEN;

// Initialize OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendVerificationMail = async (email, emailToken) => {
  try {
    const baseurl = process.env.BASEURL;
    // Get the access token using the refresh token
    const accessToken = await oauth2Client.getAccessToken();

    // Create the transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.SENDEREMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOption = {
      from: "no-reply@voxify.com",
      //   from: process.env.SENDEREMAIL,
      to: email,
      subject: "Voxify Email Verification",
      html: `<p>Hello, verify your email address by clicking on this</p>
        <br>
        <a href="${baseurl}/auth/verify-email?emailToken=${emailToken}">Click here to verify !</a>
        `,
    };

    const result = await transporter.sendMail(mailOption);
    console.log("Email sent successfully:", result.response);
  } catch (err) {
    console.log("Error in sending email: ", err);
  }
};

const verifyUser = async (req, res) => {
  const { emailToken } = req.query;

  if (!emailToken) {
    return res.status(400).json({ message: "Invalid token" });
  }

  try {
    const user = await User.findOne({
      emailToken: emailToken,
      emailTokenExpiry: { $gt: Date.now() }, // as we saved the expiry value 1 hour ahead so it finds the user where emailTokenExpiry is greater than Date.now() i.e. within 1 hour time period
    });
    if (!user) {
      return res.status(400).json({ message: "Incorrect token" });
    }

    user.verified = true;
    user.emailToken = null;
    user.emailTokenExpiry = null;
    await user.save();

    return res.status(200).json({ message: "Email verified" });
  } catch (err) {
    console.log("Internal server error while verifying email " + err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const resendVerificationMail = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = User.findById(userId);

    if (!userId) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.verified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    user.emailTokenExpiry = Date.now() + 3600000;
    await user.save();

    sendVerificationMail(user.email, user.emailToken);
    return res.status(200).json({ message: "Verification mail sent" });
  } catch (error) {
    console.log("Error in resending verification mail: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { sendVerificationMail, verifyUser, resendVerificationMail };
