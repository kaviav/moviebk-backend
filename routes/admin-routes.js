import express from "express";
import { adminLogin, signUp } from "../controllers/admin-controllers";
const adminRouter = express.Router();

adminRouter.post("/signup", signUp);
adminRouter.post("/login", adminLogin);

export default adminRouter;
