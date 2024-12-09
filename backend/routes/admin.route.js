 import express from 'express'
 import { addDoctor , allDocterList, loginAdmin } from '../controller/admin.controller.js'
 import upload from '../middlerware/multer.middleware.js'
import authAdmin from '../middlerware/authAdmin.middleware.js'
import { changeAvalibility } from '../controller/doctor.controller.js'

 const adminRouter = express.Router()

 adminRouter.post('/add-doctor'  , authAdmin,upload.single('image')   ,  addDoctor)
adminRouter.post('/login' , loginAdmin)
adminRouter.post('/all-doctors' ,authAdmin ,  allDocterList)
adminRouter.post('/change-available' ,authAdmin , changeAvalibility)

 export default adminRouter