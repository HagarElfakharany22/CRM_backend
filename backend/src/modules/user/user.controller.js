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
import getUserById from "./services/getUserById.service.js";
import { checkIn } from "./services/checkIn.service.js";
import { getMyAttendanceStatus } from "./services/getattendanceStatus.service.js";
import getDashboardData from "./services/getDashboardData.service.js";
const router=Router();
router.post('/register' , signup)
router.post('/login' , login)
router.post('/attendance/checkIn',authentication() , checkIn)
router.post('/attendance/logout' ,authentication() , logout)
router.get('/attendance/me' ,authentication() , getMyAttendanceStatus)
router.post('/confirm-email' , confirmEmail)
router.put('/update',authentication()  , updateProfile)
router.get('/profile',authentication() , getProfileData)
router.get('/attendance',authentication() , getAttendace)
// router.get('/attendance/status',authentication() , getMyAttendanceStatus)
router.put('/password',authentication() , changePassword)
router.get('/test-socket', testSocket)
router.get('/by-id/:id' , authentication() , getUserById)
router.get('/dashboard' , authentication(), getDashboardData)
export default router;