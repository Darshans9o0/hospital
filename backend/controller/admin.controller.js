import validator from "validator";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken"
import appointmentModel from "../models/appointment.model.js";
import doctor from "../models/doctor.model.js";
import UserModel from "../models/user.model.js"


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
    const newDoctor = new doctor(doctorData);
    await newDoctor.save();
    res.json({ success: true, message: "doctor data " });
  } catch (error) {
    console.log(error  , "Doctor");
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
    const doctors = await  doctor.find({}).select('-password')
    res.json({success : true , doctors})
   } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error message " });
    
   }

}
 // api too get all docter
 const appointmentsAdmin = async (req , res) => {
  try {
    const appointment = await appointmentModel.find({})
    res.json({success : true , appointment})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error message " });
  }
 }


 // cancel appoint 
 const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
   
    const appointmentData = await appointmentModel.findById(appointmentId);
  
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });
    // realsing docter slot

    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctor.findById(docId);

    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await doctor.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api to get all dashboard data for admin panel
const adminDashboard = async(req , res) => {

  try {
    const doctors = await doctor.find({})
    const users = await UserModel.find({})
    const appointments = await appointmentModel.find({})


    const dashData = {
      doctors : doctors.length ,
      appointments : appointments.length ,
      patients : users.length ,
      latestAppointment : appointments.reverse().slice(0,4)
    }
    res.json({success : true , dashData})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
    
  }

}




export { addDoctor , loginAdmin , allDocterList , appointmentsAdmin  , cancelAppointment , adminDashboard ,};
