const connectToDb = require("./config/database");
const { processPendingRequests } = require("./utils/cronJobs");

module.exports = async (req, res) => {
  try {
    await connectToDb();
    const count = await processPendingRequests();
    return res.status(200).json({ message: "Cron job executed", emailsSent: count });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Cron job failed" });
  }
};
