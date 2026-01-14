import express from "express";
import dotenv from "dotenv";
import { ConnectDB } from "./config/database.js";
import router from "./modules/admin/routes/adminRouter.js";
import dealer_router from "./modules/dealer/routes/dealerRoutes.js"
import user_router from "./modules/users/routes/userRoutes.js"
dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/admin", router);
app.use("/api/dealer",dealer_router)
app.use("/api/user",user_router)
const startServer = async () => {
  try {
    await ConnectDB();
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
      
    });
  } catch (error) {
    console.error("DB connection failed", error);
  }
};

startServer();
