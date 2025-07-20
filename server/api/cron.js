const connectToDb = require("../src/config/database");
const { processPendingRequests } = require("../src/utils/cronJobs");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("🔄 Cron job started at:", new Date().toISOString());

    await connectToDb();
    console.log("✅ Database connected");

    const count = await processPendingRequests();
    console.log(`✅ Cron job completed. Emails sent: ${count}`);

    return res.status(200).json({
      success: true,
      message: "Cron job executed successfully",
      emailsSent: count,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Cron job failed:", error);
    return res.status(500).json({
      success: false,
      error: "Cron job failed",
      details: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};
