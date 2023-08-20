import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/user-routes";
import adminRouter from "./routes/admin-routes";
import movieRouter from "./routes/movie-routes";
import bookingRouter from "./routes/booking-routes";
const app = express();

dotenv.config();

//middleWares
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingRouter);

//
mongoose
  .connect(process.env.DATA_BASE)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to DB and listening to PORT");
    });
  })
  .catch((err) => console.log(err));

//${PORT}
