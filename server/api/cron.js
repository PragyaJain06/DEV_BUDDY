const connectToDb = require("../src/config/database");
const { processPendingRequests } = require("../src/utils/cronJobs");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("🔄 Cron job started at:", new Date().toISOString());
    await connectToDb();
    const count = await processPendingRequests();

    return res.status(200).json({
      success: true,
      message: "Cron job executed successfully",
      emailsSent: count
    });
  } catch (error) {
    console.error("❌ Cron job failed:", error);
    return res.status(500).json({ error: error.message });
  }
};
