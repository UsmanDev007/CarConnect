import express from "express";
import { loginUser, registerUser } from "../controller/userController.js";
import { addComment, getCarComments } from "../controller/commentController.js";
import { verifyToken } from "../../../middleware/userMiddleWare.js";
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/add-comment",verifyToken,addComment)
router.get("/comments/:carId",getCarComments)

export default router;
// user
// {
//     hamza.tariq@gmail.com
//     hamza@123
// }
// {
//     Osman.Wad69@gmail.com
//     usman@123
// }
