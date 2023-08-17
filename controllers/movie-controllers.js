// import Movie from "../models/Movie";
import jwt from "jsonwebtoken";
import Movie from "../models/Movie";

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

    movie = await movie.save();
  } catch (err) {
    console.log(err);
  }

  if (!movie) {
    return res.status(500).json({ message: "Request failed!" });
  }
  return res.status(202).json({ movie });
};
