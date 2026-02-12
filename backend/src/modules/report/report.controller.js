import { Router } from "express";
import { authentication } from "../../middleware/auth.middleware.js";
import getMonthlyReport from './report.service.js'


const router=Router();

router.get('/'  ,getMonthlyReport)
export default router;