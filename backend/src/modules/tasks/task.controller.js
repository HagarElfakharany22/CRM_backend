import { Router } from "express";
import addTask from "./services/addTask.service.js";
import { authentication } from "../../middleware/auth.middleware.js";
import { upload } from "../../utilities/multer/multer.js";
import editTask from "./services/editTask.service.js";
import deleteTask from "./services/deleteTask.service.js";
import getAllTasks from "./services/getAllTasks.service.js";
import getTasksByUserId from "./services/getTaskByUserId.service.js";
import assignTask from "./services/assignTask.service.js";
import getDepartmentTasks from "./services/getDepartmentTasks.service.js";
import getTasksByListId from "./services/getTasksByListId.service.js";
const router=Router();

router.post('/add' , authentication() ,upload.single("image"), addTask)
router.put('/edit/:id' ,authentication() , upload.single("image"), editTask)
router.delete('/delete/:id' ,authentication() , deleteTask)
router.get('/all' ,authentication() , getAllTasks)
router.get('/user' , authentication() , getTasksByUserId)
router.get('/user/:id' ,authentication(),getDepartmentTasks)
router.post('/assign' ,authentication() , upload.single("image"), assignTask)
router.get('/by-list-id/:id' , authentication() , getTasksByListId)

export default router;