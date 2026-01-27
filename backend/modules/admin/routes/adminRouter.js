import express from "express";
import { getAdmin, getPendingCars, reviewDealerCar } from "../controller/adminController.js";
import { addCar, deleteCar, getAdminAllCar, updateCar } from "../controller/CarsController.js";
import { verifyToken } from "../../../middleware/authMiddleWare.js";
import { getMyNotifications } from "../controller/notificationController.js";
const router = express.Router();

// POST /api/admin/login public router
router.post("/login", getAdmin);
// private route
router.post("/addCar",verifyToken,addCar)
router.get("/allAdminCars",verifyToken,getAdminAllCar)
router.put("/updateCar/:id",verifyToken,updateCar)
router.delete("/deleteCar/:id",verifyToken,deleteCar)
// for review dealer
router.get("/pending-cars", verifyToken, getPendingCars);
router.put("/review-car", verifyToken, reviewDealerCar);
// for notification
router.get("/my-notification",verifyToken,getMyNotifications)
export default router;
// {
//     "email":"admin@carconnect.com",
//     "password":"123456"
// }