import bcrypt from "bcryptjs";
import Admin from "../models/Admin";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { email, password } = req.body;
  let existingAdmin;

  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    console.log(err);
  }

  if (existingAdmin) {
    return res.status(400).json({ message: "Admiin already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password);
  let admin = new Admin({ email, password: hashedPassword });
  try {
    admin = await admin.save();
  } catch (err) {
    console.log(err);
  }

  if (!admin) {
    return res.status(500).json({ message: "Unable to add admin" });
  }
  return res.status(200).json({ admin });
};

//

export const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid inputs!" });
  }

  let existingAdmin;

  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    console.log(err);
  }

  if (!existingAdmin) {
    return res.status(400).json({ message: "Admin not found" });
  }

  const isPasswordCorrect = bcrypt.compareSync(
    password,
    existingAdmin.password
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect password" });
  }
  //

  const token = jwt.sign({ id: existingAdmin._id }, process.env.SECRET_KEY, {
    expiresIn: "5d",
  });

  return res
    .status(200)
    .json({ message: "Loggedin successfully", token, id: existingAdmin._id });
};

// export const getAllAdmins = async (req, res, next) => {
//   let admins;
//   try {
//     admins = await Admin.find();
//   } catch (err) {
//     console.log(err);
//   }

//   if (!admins) {
//     return res.status();
//   }
// };
