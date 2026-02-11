import { asyncHandler } from "../../../utilities/error/error.js";


const testSocket=asyncHandler(async(req , res , next)=>{
    req.io.emit('server-notification' , {message:'Hello from the server!'});
    
    return res.status(200).json({message:'Message sent to clients via Socket.io'});
})
export default testSocket;