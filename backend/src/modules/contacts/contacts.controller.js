import { Router } from "express";
import createContact from "./services/createContact.services.js";
import { authentication } from "../../middleware/auth.middleware.js";
import getAllContacts from "./services/getAllContacts.service.js";
import getContactsByUserId from "./services/getContactsByUserId.service.js";
import updateContact from "./services/updateContact.service.js";
import deleteContact from "./services/deleteContact.service.js";
const router= Router()

router.post('/create' , authentication() , createContact)
router.get('/all' , authentication() , getAllContacts)
router.get('/by-user-id' , authentication() , getContactsByUserId)
router.put('/update/:id' , authentication() , updateContact)
router.delete('/delete/:id' , authentication() , deleteContact)

export default router