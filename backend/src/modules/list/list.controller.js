import { Router } from "express";
import { authentication } from "../../middleware/auth.middleware.js";
import addList from "./services/addList.service.js";
import updateList from "./services/updateLIst.service.js";
import deleteList from "./services/deleteList.service.js";
import getAllLists from "./services/getAllLists.service.js";

const router=Router();


router.post('/add' , authentication() , addList)
router.put('/update/:id' , authentication() , updateList)
router.delete('/delete/:id' , authentication() , deleteList)
router.get('/all' , authentication() , getAllLists)
export default router;