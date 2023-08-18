import express from "express";
import {
  addMovie,
  getAllMovies,
  getMovieById,
} from "../controllers/movie-controllers";

const movieRouter = express.Router();

movieRouter.post("/add", addMovie);
movieRouter.get("/getall", getAllMovies);
movieRouter.get("/getone/:id", getMovieById);

export default movieRouter;
