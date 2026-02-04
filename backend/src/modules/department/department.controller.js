import { Router } from "express";
import { authentication } from "../../middleware/auth.middleware.js";
import addDepartment from "./services/addDepartment.service.js";
import updateDepartment from "./services/updateDepartment.service.js";
import deleteDepartment from "./services/deleteDepartment.service.js";
import getAllDepartments from "./services/getAllDepartments.service.js";
import getDepartmentById from "./services/getDepartmentById.service.js";
import addUsersToDepartment from "./services/addUsersToDepartment.service.js";
const router=Router();

router.post('/add' , authentication() , addDepartment)
router.put('/update/:id' , authentication() , updateDepartment)
router.delete('/delete/:id' , authentication() , deleteDepartment)
router.get('/all' , authentication() , getAllDepartments)
router.get('/get/:id' , authentication() , getDepartmentById)
router.put('/add-users/:id' , authentication() , addUsersToDepartment)

export default router;