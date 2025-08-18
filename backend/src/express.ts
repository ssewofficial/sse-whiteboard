import express from "express";
import cookieParser from "cookie-parser";
import morganMiddleware from "./logger/morgan.logger";
import { errorHandler } from "./middlewares/error.middlewares";
import UserRoute from "./routes/user.routes";
import connectDB from "./lib/db";

const app = express();

connectDB();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morganMiddleware);

app.get("/", (req, res) => {
  res.status(200).send("Express Routes Found");
});
app.use("/users", UserRoute);

app.use(errorHandler);

export default app;
