import { Router } from "express";
import { authentication } from "../../middleware/auth.middleware.js";
import addBoard from "./services/addBoard.service.js";
import updateBoard from "./services/updateBoard.service.js";
import deleteBoard from "./services/deleteBoard.service.js";
import getAllBoards from "./services/getAllBoards.service.js";
import getBoardByOwnerId from "./services/getBoardByOwnerId.service.js";
const router=Router();

router.post('/add' , authentication() , addBoard)
router.put('/update/:id' , authentication(), updateBoard)
router.delete('/delete/:id' , authentication() , deleteBoard)
router.get('/all' , authentication() , getAllBoards)
router.get('/owner' , authentication() , getBoardByOwnerId)
export default router;