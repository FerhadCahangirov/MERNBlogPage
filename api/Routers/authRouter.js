import express  from "express";
import { authentication, authorization, profile, resetPasswordSendMail, resetPasswordVerify, unauthentication } from "../Controllers/authController.js";

const router = express.Router();

router.post("/register", authorization);
router.post("/login", authentication);
router.get("/profile", profile);
router.post("/logout", unauthentication);
router.post('/resetPasswordSendMail', resetPasswordSendMail);
router.post('/resetPasswordVerify/:token', resetPasswordVerify);


export default router;

