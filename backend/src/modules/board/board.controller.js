import { Router } from "express";
import { authentication } from "../../middleware/auth.middleware.js";
import addBoard from "./services/addBoard.service.js";
import updateBoard from "./services/updateBoard.service.js";
import deleteBoard from "./services/deleteBoard.service.js";
import getAllBoards from "./services/getAllBoards.service.js";
import getBoardByOwnerId from "./services/getBoardByOwnerId.service.js";
import assignUsersToBoard from "./services/assignUrsersToBoard.service.js";
import getBoardByItsId from "./services/getBoardByItsId.service.js";
import assignUserToBoardByEmail from "./services/assignUserToBoardByEmail.service.js";
const router=Router();

router.post('/add' , authentication() , addBoard)
router.put('/update/:id' , authentication(), updateBoard)
router.delete('/delete/:id' , authentication() , deleteBoard)
router.get('/all' , authentication() , getAllBoards)
router.get('/owner' , authentication() , getBoardByOwnerId)
router.put('/assign-Users/:id' , authentication() , assignUsersToBoard)
router.get('/:id' , authentication() , getBoardByItsId)
router.put('/by-email/:id' , authentication() , assignUserToBoardByEmail)
export default router;