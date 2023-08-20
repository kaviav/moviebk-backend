import express from "express";
import {
  deleteBooking,
  getBookingById,
  newBooking,
} from "../controllers/booking-controller";
const bookingRouter = express.Router();

bookingRouter.post("/addnew", newBooking);
bookingRouter.get("/getone/:id", getBookingById);
bookingRouter.delete("/delete/:id", deleteBooking);

export default bookingRouter;
