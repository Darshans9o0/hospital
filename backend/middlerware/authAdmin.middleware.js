import jwt from"jsonwebtoken"

// admin auth midlewaew
const authAdmin = async (req ,res , next) => {
    try { 
        const {atoken}= req.headers 
        console.log(atoken)
        if(!atoken) {
            return res.json({ success : false , message : "Not authorised login agaian"})
        }
        const token_decode = jwt.verify(atoken , process.env.JWT_SECREAT) // verifyinf thtsy decode 
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success : false , message : "Not authorised login agaian"})
        }
        next()
    } catch (error) {
        console.log(error);
    res.json({ success: false, message: "error message " });
        
    }
}
export default authAdmin