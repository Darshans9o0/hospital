import validator from "validator";
import bcrypt from "bcryptjs";
import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctor from "../models/doctor.model.js";
import appointmentModel from "../models/appointment.model.js";
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
    if (imageFile) {
      // upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;

      await UserModel.findByIdAndUpdate(userId, { image: imageUrl });
    }
    res.json({ success: true, message: "profile updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error message " });
  }
};

// api to book appointment ]
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;
    const docData = await doctor.findById(docId).select(["-password"]);

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }
    // check if slot is available
    const slotsBooked = docData.slots_booked;
    if (slotsBooked[slotDate]) {
      if (slotsBooked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot already booked" });
      } else {
        slotsBooked[slotDate].push(slotTime);
      }
    } else {
      // no slots booked for that date
      slotsBooked[slotDate] = [];
      slotsBooked[slotDate].push(slotTime);
    }

    const userData = await UserModel.findById(userId).select(["-password"]);
    // do not save doctor's appointment history
    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      slotDate,
      slotTime,
      userData,
      docData,
      ammount: docData.fees,
      data: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // save new slots data in doctor data
    await doctor.findByIdAndUpdate(docId, {
      slots_booked: slotsBooked,
    });

    return res.json({
      success: true,
      message: "Appoinment booked successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
// api to get user appoiments for frontend my-appointment page

const listAppointemt = async (req, res) => {
  try {
    const { userId } = req.body;

    // adding apotmet s
    const appointments = await appointmentModel.find({ userId });
    res.json({ success: true, data: appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// api to delete apointment
const deleteAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    // verfiy appointment user
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "unthorized logged in " });
    }
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

    res.json({ success: true, message: "Appointment message" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getProfileData,
  updateProfile,
  bookAppointment,
  listAppointemt,
  deleteAppointment,
};
