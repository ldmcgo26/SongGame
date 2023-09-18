import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import callbackRouter from "./routes/callback.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRouter);
app.use("/callback", callbackRouter);

app.listen(3000, () => {
  console.log("App listening at port 3000");
});
