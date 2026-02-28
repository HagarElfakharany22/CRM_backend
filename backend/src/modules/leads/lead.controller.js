import { Router } from "express";
import { authentication } from "../../middleware/auth.middleware.js";
import createLead from "./services/createLead.service.js";
import updatLead from "./services/updateLeads.service.js";
import getAllLeads from "./services/getAllLeads.service.js";
import getLeadsByUserId from "./services/getLeadsByUserId.service.js";
import deleteLead from "./services/deleteLead.service.js";
const router= Router();

router.post('/create'  , authentication() , createLead)
router.put('/update/:id' , authentication() , updatLead)
router.get('/all' , authentication() , getAllLeads)
router.get('/by-user-id' , authentication() , getLeadsByUserId)
router.delete('/delete/:id' , authentication() , deleteLead)
export default router