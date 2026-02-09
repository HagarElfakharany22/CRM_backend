import Lists from "../../../DB/models/lists.model.js";
import { asyncHandler } from "../../../utilities/error/error.js";
import Tasks from "../../../DB/models/tasks.model.js";
const getListByBoardId= asyncHandler(async(req , res , next)=>{
    const id=req.params.id;
    const tasks= await Tasks.find({listId:id});
    console.log(`tasks : ` , tasks);
    
    const lists= await Lists.find({boardId:id});
    if(lists.length===0){
        return res.status(404).json({message:'no lists found for this board'})
    }
  
    console.log('lists : ' , lists);
    
    return res.status(200).json({
        message:'lists retrieved successfully',
        lists
    })
})

export default getListByBoardId;