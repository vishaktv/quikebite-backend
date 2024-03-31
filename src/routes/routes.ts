import express from "express";
import { requestOtp, verifyOtp } from "../controllers/authController";

const router = express.Router();

router.route("/generate-otp").get(requestOtp);
router.route("/verify-otp").post(verifyOtp);

export { router as AuthRouter };