import mongoose from "mongoose";
import Booking from "../models/Booking";
import Movie from "../models/Movie";
import User from "../models/User";
export const newBooking = async (req, res, next) => {
  let newBooking;
  const { movie, seatNumber, date, user } = req.body;

  let existingMovie;
  let existingUser;

  try {
    existingMovie = await Movie.findById(movie);
    existingUser = await User.findById(user);
  } catch (err) {
    console.log(err);
  }

  if (!existingMovie) {
    return res
      .status(404)
      .json({ message: "There is no movie with the given Id!" });
  }

  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "There is no user with the given id!" });
  }

  try {
    newBooking = new Booking({
      movie,
      date: new Date(`${date}`),
      seatNumber,
      user,
    });
    //
    //

    const session = await mongoose.startSession();
    session.startTransaction();
    //

    existingMovie.bookings.push(newBooking);
    existingUser.bookings.push(newBooking);
    //
    await existingMovie.save({ session });
    await existingUser.save({ session });
    await newBooking.save({ session });
    //
    session.commitTransaction();
    //
    //
    newBooking = await newBooking.save();
  } catch (err) {
    console.log(err);
  }

  if (!newBooking) {
    return res.status(500).json({ message: "Unable to book the movie!" });
  }
  return res.status(201).json({ newBooking });
};

export const getBookingById = async (req, res, next) => {
  let booking;
  const id = req.params.id;
  try {
    booking = await Booking.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!booking) {
    return res.status(404).json({ message: "Invalid Id!" });
  }
  return res.status(200).json({ booking });
};

export const deleteBooking = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Booking.findByIdAndRemove(id).populate("user movie");
    console.log(booking);
    const session = await mongoose.startSession();
    session.startTransaction();
    await booking.user.bookings.pull(booking);
    await booking.movie.bookings.pull(booking);
    await booking.movie.save({ session });
    await booking.user.save({ session });
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unable to Delete" });
  }
  return res.status(200).json({ message: "Successfully Deleted" });
};
