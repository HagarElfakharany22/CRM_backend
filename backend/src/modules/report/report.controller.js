import { Router } from "express";
import { authentication } from "../../middleware/auth.middleware.js";
import report from "./report.service.js";


const router=Router();

// router.get('/report' , authentication() ,report)
export default router;