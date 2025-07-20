const { subDays, endOfDay, startOfDay } = require("date-fns");
const ConnectionRequest = require("../model/connectionRequest");
const sendEmail = require("./sendEmail");

const processPendingRequests = async () => {
  try {
    console.log("📧 Processing pending requests...");
    
    const yesterday = subDays(new Date(), 1);
    const yesterdayEnd = endOfDay(yesterday);
    const yesterdayStart = startOfDay(yesterday);
    
    console.log(`🔍 Searching for requests between ${yesterdayStart} and ${yesterdayEnd}`);
    
    const pendingRequests = await ConnectionRequest.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lt: yesterdayEnd,
      },
    }).populate("fromUser toUser");

    console.log(`🔍 Found ${pendingRequests.length} pending requests`);

    const listOfEmails = [
      ...new Set(pendingRequests?.map((item) => item?.toUser?.email).filter(Boolean)),
    ];
    
    console.log(`📬 Unique emails to send: ${listOfEmails.length}`);
    
    let emailsSent = 0;
    for (let email of listOfEmails) {
      if (email) {
        await sendEmail(
          email,
          "Someone is interested in you",
          "You have pending connection requests. Please check your Dev Buddy account."
        );
        emailsSent++;
        console.log(`📨 Email sent to: ${email}`);
      }
    }
    
    console.log(`✅ Total emails sent: ${emailsSent}`);
    return emailsSent;
  } catch (e) {
    console.error("❌ Error in processPendingRequests:", e);
    throw e;
  }
};

// ✅ For local development only
if (process.env.NODE_ENV !== "production") {
  const cron = require("node-cron");
  console.log("🔧 Setting up local cron job for development");
  cron.schedule("0 8 * * *", async () => {
    console.log("🔄 Running local cron job");
    try {
      const connectToDb = require("../config/database");
      await connectToDb();
      await processPendingRequests();
    } catch (error) {
      console.error("❌ Local cron job failed:", error);
    }
  });
}

module.exports = { processPendingRequests };
