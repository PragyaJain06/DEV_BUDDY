// const cron = require("node-cron");
// const { subDays, endOfDay, startOfDay } = require("date-fns");
// const ConnectionRequest = require("../model/connectionRequest");
// const sendEmail = require("./sendEmail");
// cron.schedule("0 8 * * *", async () => {
//   try {
//     const yesterday = subDays(new Date(), 1);
//     const yesterdayEnd = endOfDay(yesterday);
//     const yesterDayStart = startOfDay(yesterday);
//     const pendingRequests = await ConnectionRequest.find({
//       status: "interested",
//       createdAt: {
//         $gte: yesterDayStart,
//         $lt: yesterdayEnd,
//       },
//     }).populate("fromUser toUser");

//     const listOfEmails = [
//       ...new Set(pendingRequests?.map((item) => item?.toUser?.email)),
//     ];
//     for (let email of listOfEmails) {
//       await sendEmail(
//         email,
//         "Someone is interested in you",
//         `You have pending requests pending.`
//       );
//     }
//   } catch (e) {
//     console.log(e, "error");
//   }
// });
