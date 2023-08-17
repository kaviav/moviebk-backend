import express from "express";
import {
  deleteUser,
  getAllUsers,
  loginUser,
  signUp,
  updateUser,
} from "../controllers/user-controllers";

const userRouter = express.Router();

userRouter.get("/getall", getAllUsers);
userRouter.post("/signup", signUp);
userRouter.put("/update/:id", updateUser);
userRouter.delete("/delete/:id", deleteUser);
userRouter.post("/login/:id", loginUser);

export default userRouter;
