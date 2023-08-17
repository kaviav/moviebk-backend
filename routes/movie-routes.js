import express from "express";
import { addMovie } from "../controllers/movie-controllers";

const movieRouter = express.Router();

movieRouter.post("/add", addMovie);

export default movieRouter;
