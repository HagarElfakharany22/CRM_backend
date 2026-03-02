import { Router } from "express";
import createDeal from "./services/createDeal.service.js";
import { authentication } from "../../middleware/auth.middleware.js";
import getAllDeals from "./services/getAllDeals.service.js";
import deleteDeal from "./services/deleteDeal.service.js";
const router= Router()

router.post('/create' , authentication() , createDeal)
router.get('/all' , authentication() , getAllDeals)
router.delete('/delete/:id' , authentication() , deleteDeal)

export default router;