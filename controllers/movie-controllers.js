// import Movie from "../models/Movie";
import jwt from "jsonwebtoken";
import Movie from "../models/Movie";

import mongoose from "mongoose";
import Admin from "../models/Admin";

export const addMovie = async (req, res, next) => {
  //
  const extractedToken = req.headers.authorization.split(" ")[1];
  //

  if (!extractedToken && extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token not found!" });
  }

  console.log(extractedToken);
  //
  let adminId;
  /////verify token and store adminId
  //
  jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });
  //
  /////create new movie
  const {
    title,
    description,
    posterUrl,
    releaseDate,
    featured,
    actors,
    admin,
  } = req.body;

  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() === "" &&
    !featured &&
    featured.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid data!" });
  }
  let movie;
  try {
    movie = new Movie({
      title,
      description,
      actors,
      releaseDate: new Date(`${releaseDate}`),
      featured,
      posterUrl,
      admin: adminId,
    });

    //
    const session = await mongoose.startSession();

    const adminUser = await Admin.findById(adminId);

    session.startTransaction();

    await movie.save({ session });

    adminUser.addedMovies.push(movie);

    await adminUser.save({ session });

    session.commitTransaction();

    //
  } catch (err) {
    console.log(err);
  }

  if (!movie) {
    return res.status(500).json({ message: "Request failed!" });
  }
  return res.status(202).json({ movie });
};

export const getAllMovies = async (req, res, next) => {
  let movies;
  try {
    movies = await Movie.find();
  } catch (err) {
    console.log(err);
  }
  if (!movies) {
    return res.status(500).json({ message: "Request failed!" });
  }
  return res.status(200).json({ movies });
};

export const getMovieById = async (req, res, next) => {
  let movie;
  const id = req.params.id;
  try {
    movie = await Movie.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!movie) {
    return res.status(404).json({ message: "Invalid movie Id" });
  }
  return res.status(200).json({ movie });
};
