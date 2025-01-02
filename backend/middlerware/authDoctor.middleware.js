import jwt from"jsonwebtoken"

// admin auth midlewaew
const authDoctor = async (req ,res , next) => {
    try { 
        const {dtoken}= req.headers;
        console.log( req.headers)
        console.log( dtoken)
       

        if(!dtoken) {
            return res.json({ success : false , message : "Not authorised login again" })
        }
        const token_decode = jwt.verify(dtoken , process.env.JWT_SECREAT) // verifyinf thtsy decode 
        req.body.docId = token_decode.id
        next()
    } catch (error) {
        console.log(error);
    res.json({ success: false, message: "error message " });
        
    }
}
export default authDoctor