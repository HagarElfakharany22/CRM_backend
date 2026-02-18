import { Router } from "express";
import { upload } from "../../utilities/multer/multer.js";
import assignTask from "./services/assignTasks.service.js";
import { authentication } from "../../middleware/auth.middleware.js";
const router=Router()


router.post('/assign',authentication() ,upload.single("image"),assignTask)
export default router;