import jwt from"jsonwebtoken"

// admin auth midlewaew
const authUser= async (req ,res , next) => {
    try { 
        const {token}= req.headers 
       // console.log(token)
        if(!token) {
            return res.json({ success : false , message : "Not authorised login agaian"})
        }
        const token_decode = jwt.verify(token , process.env.JWT_SECREAT) // verifyinf thtsy decode 
        req.body.userId = token_decode.id
        
        next()
    } catch (error) {
        console.log(error);
    res.json({ success: false, message: "error message " });
        
    }
}
export default authUser