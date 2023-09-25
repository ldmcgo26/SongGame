import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import callbackRouter from "./routes/callback.js";
import dotenv from "dotenv";
import session from "express-session";
// import cron from "node-cron"
// import { refreshAccessToken } from "./routes/callback.js";

dotenv.config();

const app = express();

app.use(
  session({
    secret: (Math.random().toString(36) + "00000000000000000").slice(2, 18), // Change this to a strong, random value in production
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(cors());

app.use("/auth", authRouter);
app.use("/callback", callbackRouter);

app.listen(3000, () => {
  console.log("App listening at port 3000");
});
