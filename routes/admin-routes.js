import express from "express";
import {
  adminLogin,
  getAllAdmins,
  signUp,
} from "../controllers/admin-controllers";
const adminRouter = express.Router();

adminRouter.post("/signup", signUp);
adminRouter.post("/login", adminLogin);
adminRouter.get("/getall", getAllAdmins);

export default adminRouter;
