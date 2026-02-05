import { Router } from "express";
import { authorization , authentication } from "../../middleware/auth.middleware.js";
import { endpoint } from "../user/user.endpoint.js";
import addReview from "./services/addReview.service.js";
import deleteReview from "./services/deleteReview.service.js";
import updateReview from "./services/updateReview.service.js";
import getAllReviews from "./services/getAllReviews.service.js";
const router= Router()

router.post('/addReview/:id' , authentication() , addReview)
router.delete('/deleteReview/:id' , authentication() , deleteReview)
router.put('/updateReview/:id' , authentication() , updateReview)
router.get('/all' , authentication() , getAllReviews)


export default router