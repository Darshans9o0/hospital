import bcrypt from "bcryptjs";
import doctor from "../models/doctor.model.js";
import appointmentModel from "../models/appointment.model.js";
import jwt from "jsonwebtoken";

const changeAvalibility = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctor.findById(docId);
    await doctor.findByIdAndUpdate(docId, { available: !docData.available });
    res.json({ success: true, message: "Avalability changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error message " });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctor.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error message " });
  }
};
// api for doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const docter = await doctor.findOne({ email });

    if (!docter) {
      res.json({ success: false, message: "inavalid credintials" });
    }
    console.log("Password (input):", email);
    console.log("Doctor object:", docter);
    if (docter) {
      console.log("Doctor password:", docter.password);
    }

    const isMatch = await bcrypt.compare(password, docter.password);

    if (isMatch) {
      const token = jwt.sign({ id: docter._id }, process.env.JWT_SECREAT);
      req.headers.dtoken = token;

      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "inavalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api to get doctor appointment
const getAppointments = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api to get appointment completed for doctor panel
const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: "Appointment Completed" });
    } else {
      res.json({ success: false, message: "mark failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// api to get appointment cancel for doctor panel
const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "Appointment Cancelled" });
    } else {
      console.log(error);
      res.json({ success: false, message: "cancelletion failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

/// api to get dashboard data for doctor fanel
const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });

    let earning = 0;
    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earning += item.ammount;
      }
    });

    let patients = [];

    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      earning,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointment: appointments.reverse().slice(0, 5),
    };
    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api to  get profile dat
const doctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;

    const profileData = await doctor.findById(docId).select("-password");
    res.json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// api to edit doctor details
const updateDocPro = async (req, res) => {
  try {
    const { docId, fees, adddres, available } = req.body;

    await doctor.findByIdAndUpdate(docId, { fees, adddres, available });
    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  changeAvalibility,
  doctorList,
  loginDoctor,
  getAppointments,
  appointmentCancel,
  appointmentComplete,
  doctorDashboard,
  doctorProfile ,
  updateDocPro
};
