require("dotenv").config();
const express = require("express");
const connectToDb = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("./utils/cronJob");
// Routes
const authRoute = require("./routes/auth");
const profileRoute = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRoute = require("./routes/user");

const app = express();

// ✅ CORS
app.use(
  cors({
    origin: ["https://dev-buddy-full.vercel.app", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/", authRoute);
app.use("/profile", profileRoute);
app.use("/request", requestRouter);
app.use("/user", userRoute);

// ✅ Connect to DB
connectToDb()
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.error("DB connection failed:", err));

module.exports = app;
