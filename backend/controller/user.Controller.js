import validator from "validator";
import bcrypt from "bcryptjs";
import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from "cloudinary"
// api to rgister user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("register", req.body);

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing details" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "enter a Strong password" });
    }
    // bcrypting the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new UserModel(userData);
    const user = await newUser.save();
    // _id
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECREAT);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error message " });
  }
};
// api for user login
const loginUser = async (req, res) => {
  console.log("Request Body:", req.body);
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    console.log(req.body);
    if (!user) {
      return res.json({ success: false, message: "user doesn't exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECREAT);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "invalid crdentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error message " });
  }
};
// api to get use profle data
const getProfileData = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await UserModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error message " });
  }
};

// api to update user profle
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, dob, addres, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !addres || !gender) {
      return res.json({ success: false, message: "Data is missing " });
    }
    await UserModel.findByIdAndUpdate(userId, {
      name,
      phone,
      addres: JSON.parse(addres),
      dob,
      gender,
    });
    if(imageFile) {
      // upload image to cloudinary 
      const imageUpload = await cloudinary.uploader.upload(imageFile.path , {resource_type : "image"})
      const imageUrl = imageUpload.secure_url

      await UserModel.findByIdAndUpdate(userId ,{image : imageUrl})

    }
    res.json({success : true , message :"profile updated"})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error message " });
  }
};

export { registerUser, loginUser, getProfileData , updateProfile };
