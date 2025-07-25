const app = require("./app");

// ✅ For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// ✅ For Vercel (Serverless)
module.exports = app;
