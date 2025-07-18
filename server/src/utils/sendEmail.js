const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(to, subject, message) {
  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev", // ✅ Works without domain verification
      to: to,
      subject,
      html: `<p>${message}</p>`,
    });

    if (error) {
      console.error("Email sending error:", error);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    console.error("Email exception:", err.message);
    return { success: false, error: err.message };
  }
}

module.exports = sendEmail;
