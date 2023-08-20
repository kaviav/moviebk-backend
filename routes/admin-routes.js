import express from "express";
import {
  adminLogin,
  getAdminById,
  getAllAdmins,
  signUp,
} from "../controllers/admin-controllers";
const adminRouter = express.Router();

adminRouter.post("/signup", signUp);
adminRouter.post("/login", adminLogin);
adminRouter.get("/getall", getAllAdmins);
adminRouter.get("/getone/:id", getAdminById);

export default adminRouter;
