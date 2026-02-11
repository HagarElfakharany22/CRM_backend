import { Router } from "express";
import { authentication , authorization  } from "../../middleware/auth.middleware.js";
// import { endpoint } from "./user.endpoint.js";
import signup  from "./services/signup.service.js";
import login from "./services/login.service.js";
import updateProfile from "./services/updateProfile.service.js";
import getProfileData from "./services/getProfileData.service.js";
import changePassword from "./services/changePassword.service.js";
import confirmEmail from "./services/confirmEmail.service.js";
import { endpoint } from "./user.endpoint.js";
import getAttendace from "./services/getAttendence.service.js";
import { logout } from "./services/logout.service.js";
import testSocket from "./services/testSocket.js";


const router=Router();
router.post('/register' , signup)
router.post('/login' , login)
router.post('/logout' , logout)
router.post('/confirm-email' , confirmEmail)
router.put('/update',authentication()  , updateProfile)
router.get('/profile',authentication() , getProfileData)
router.get('/attendance',authentication() , getAttendace)
router.put('/password',authentication() , changePassword)
router.get('/test-socket', testSocket)
export default router;