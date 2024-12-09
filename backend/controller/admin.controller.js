import validator from "validator";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import Doctor from "../models/doctor.model.js";
import jwt from "jsonwebtoken"

// api for adding doctor

const addDoctor = async (req, res) => {
  try {
    //console.log("inside post");
    const {
      name,
      email,
      degree,
      password,
      speciality,
      experience,
      about,
      fees,
      addres1,
    } = req.body;
     const imageFile = req.file;
     //console.log('addres' , addres1)
     //   console.log({name , email , degree , password ,     speciality , experience , about , fees , addres});
     // checking for all data to be added
    if (
      !name ||
      !email ||
      !degree ||
      !password ||
      !speciality ||
      !experience ||
      !about ||
      !fees ||
      !addres1
    ) {
      return res.json({ success: false, message: "missing details " });
    }
    // valiadate emial format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "please enter a valid email ",
      });
    }
    // validating stromg password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter a strong password",
      });
    }
    // hashing doctor pass
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //console.log("hashed password", hashedPassword)

    // upload image to vloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;
    console.log("After image", imageUrl)

    // saving the data  w

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      addres1: JSON.parse(addres1),
       
      
      createDate: new Date(),

    };
    console.log("saving doctor data",doctorData)
    console.log("addres" ,  addres1);
   // console.log(doctorData);
    const newDoctor = new Doctor(doctorData);
    await newDoctor.save();
    res.json({ success: true, message: "doctor data " });
  } catch (error) {
    console.log(error  , "in sa");
    res.json({ success: false, message: "error message " });
  }
};

// api for the admin login

const loginAdmin = async(req , res) => {
  try { 
    const { email , password} = req.body 
    if(email === process.env.ADMIN_EMAIL  && password === process.env.ADMIN_PASSWORD ) {
      const token = jwt.sign(email + password, process.env.JWT_SECREAT)
      res.json({success : true ,token})
    } else {
      res.json({success : false , message : "email and password are incorrect"})
    }
    
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error message " });
  }
}
// api to get all docters list to dashboard
const allDocterList = async(req , res) => {
   try {
    const doctors = await  Doctor.find({}).select('-password')
    res.json({success : true , doctors})
   } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error message " });
    
   }

}

export { addDoctor , loginAdmin , allDocterList };
