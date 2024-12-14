import express from "express"
import {registerUser , loginUser, getProfileData, updateProfile , bookAppointment ,listAppointemt , deleteAppointment} from"../controller/user.Controller.js"
import authUser from "../middlerware/authUser.midleware.js"
import upload from "../middlerware/multer.middleware.js"

const userRoutes =  express.Router()


userRoutes.post('/register' , registerUser)
userRoutes.post('/login' ,loginUser)
userRoutes.get('/get-profile' , authUser ,getProfileData)
userRoutes.post('/update-profile' , upload.single('image') , authUser ,   updateProfile ,) // two middleware coz one for image nd one for id 
userRoutes.post('/book-appointment' ,authUser , bookAppointment) 
userRoutes.get('/appointments' ,authUser ,listAppointemt) 
userRoutes.post('/cancel-appointment' ,authUser ,deleteAppointment) 

export default userRoutes