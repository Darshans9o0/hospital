import doctor from "../models/doctor.model.js";


const changeAvalibility = async (req , res) => {
    try {
        const {docId } = req.body
        const docData = await doctor.findById(docId)
        await doctor.findByIdAndUpdate(docId , {available : !docData.available})
        res.json({success : true , message : "Avalability changed"})


        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error message " });
    }

}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctor.find({}).select(['-password' , '-email'])
        res.json({success : true , doctors})
    } catch (error) {

         console.log(error);
        res.json({ success: false, message: "error message " });
    }
}

export {changeAvalibility , doctorList}