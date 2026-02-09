import { Router } from "express";
import { authentication } from "../../middleware/auth.middleware.js";
import addList from "./services/addList.service.js";
import updateList from "./services/updateLIst.service.js";
import deleteList from "./services/deleteList.service.js";
import getAllLists from "./services/getAllLists.service.js";
import getListById from "./services/getListById.service.js";
import getListByBoardId from "./services/getListByBoardId.service.js";
const router=Router();


router.post('/add' , authentication() , addList)
router.put('/update/:id' , authentication() , updateList)
router.delete('/delete/:id' , authentication() , deleteList)
router.get('/all' , authentication() , getAllLists)
router.get('/get/:id' , authentication() , getListById)
router.get('/by-board-id/:id' , authentication() , getListByBoardId)
export default router;