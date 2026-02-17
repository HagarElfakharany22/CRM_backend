import User from "../../../DB/models/User.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";

const getUserById= asyncHandler(async (req , res , next) => {
    let id= req.params.id;
    let user = await User.findById(id)
    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }
    return res.status(200).json({
        user
    })
})

export default getUserById