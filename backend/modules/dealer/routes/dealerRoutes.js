import express from "express";
import {
  addDealerCar,
  deleteMyUploadCars,
  getMyUploadedCars,
  loginDealer,
  registerDealer,
  updateMyUploadCars,
} from "../controller/dealerController.js";
import { verifyToken } from "../../../middleware/dealerVerifyMW.js";
import { getMyNotifications } from "../../admin/controller/notificationController.js";

const router = express.Router();
router.post("/register", registerDealer);
router.post("/login", loginDealer);
router.post("/add-car", verifyToken, addDealerCar);
router.get("/get-cars", verifyToken, getMyUploadedCars);
router.put("/update-car/:id", verifyToken, updateMyUploadCars);
router.delete("/delete-car/:id", verifyToken, deleteMyUploadCars);
// for notication
router.get("/my-notification", verifyToken, getMyNotifications);
export default router;

//  dealers credentials
// {
//     "email": "john@citymotors.com",
//     "password": "dealerpass123"
// }
// {
//   email: 'contact@apexmotors.com',
//   password: 'password123',
// }
