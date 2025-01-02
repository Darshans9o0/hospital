import express from "express"
import {doctorList , loginDoctor ,getAppointments ,appointmentCancel , appointmentComplete, doctorDashboard , doctorProfile , updateDocPro} from "../controller/doctor.controller.js"
import  authDoctor from "../middlerware/authDoctor.middleware.js"

const doctorRouter = express.Router()

doctorRouter.get('/list' , doctorList)
doctorRouter.post('/login' , loginDoctor)
doctorRouter.get('/appointments' , authDoctor , getAppointments)
doctorRouter.post('/complete-appointments' , authDoctor , appointmentComplete)
doctorRouter.post('/cancel-appointments' , authDoctor , appointmentCancel)
doctorRouter.get('/doc-dashboard' , authDoctor , doctorDashboard)
doctorRouter.get('/doc-profile' , authDoctor , doctorProfile)
doctorRouter.post('/doc-update-profile' , authDoctor , updateDocPro)



export default doctorRouter