require("dotenv").config();

const express = require("express");
const connectToDb = require("./config/database");

const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const profileRoute = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRoute = require("./routes/user");
const cors = require("cors");
const app = express();
// Apply CORS to all requests, not just OPTIONS
app.use(cors({
    origin: ["https://dev-buddy-full.vercel.app", "http://localhost:5173"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(cookieParser());

app.use("/", authRoute);
app.use("/profile", profileRoute);
app.use("/request", requestRouter);
app.use("/user", userRoute);
connectToDb()
  .then(() => {
    console.log("db is connected successfully!");
    app.listen(process.env.PORT, () => {
      console.log(`server is listening at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
