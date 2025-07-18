const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(to, subject, message) {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev", // ✅ Sandbox mode
      to: to, // must be a verified email in Resend
      subject: subject,
      html: `<p>${message}</p>`,
    });

    if (error) {
      console.error("Error sending email:", error);
      return { success: false, error };
    } else {
      console.log("✅ Email sent successfully:", data);
      return { success: true, data };
    }
  } catch (err) {
    console.error("Exception while sending email:", err);
    return { success: false, error: err.message };
  }
}

module.exports = sendEmail;
