import express from "express";
import { getBookingById, newBooking } from "../controllers/booking-controller";
const bookingRouter = express.Router();

bookingRouter.post("/addnew", newBooking);
bookingRouter.get("/getone/:id", getBookingById);

export default bookingRouter;
