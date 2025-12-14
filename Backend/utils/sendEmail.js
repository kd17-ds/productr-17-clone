const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.sendEmail = async (email, subject, htmlContent) => {
  try {
    await sgMail.send({
      to: email,
      from: process.env.SENDGRID_SENDER,
      subject,
      html: htmlContent,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email failed:", error.response?.body || error);
  }
};
