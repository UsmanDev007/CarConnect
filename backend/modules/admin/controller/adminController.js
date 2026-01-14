import Admin from "../model/AdminCar.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import DealerCar from "../../dealer/model/DealerCar.js";
import Notification from "../model/Notification.js";
export async function getAdmin(req, res) {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email: email.trim().toLowerCase() });

    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    if (!admin.isActive) {
      return res.status(403).json({ message: "Admin is disabled" });
    }
    // hashing the password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      message: "Login successful",
      token,
      admin: { name: admin.name, email: admin.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}


// 1. GET ALL PENDING CARS (For the Admin Dashboard)
export const getPendingCars = async (req, res) => {
  try {
    const pendingCars = await DealerCar.find({ status: "pending" }).populate("dealerId", "name email");
    res.status(200).json(pendingCars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2. APPROVE OR REJECT A CAR
export const reviewDealerCar = async (req, res) => {
  try {
    const { carId, action } = req.body; 

    const car = await DealerCar.findByIdAndUpdate(
      carId,
      { status: action },
      { new: true }
    );

    if (!car) return res.status(404).json({ message: "Car not found" });

    // --- NOTIFICATION LOGIC ---
    const statusText = action === "approved" ? "approved! It is now live." : "rejected.";
    
    await Notification.create({
      recipient: car.dealerId, // The dealer who uploaded the car
      recipientModel: 'Dealer',
      message: `Your car (${car.brand} ${car.model}) has been ${statusText}`
    });
    // ---------------------------

    res.status(200).json({ message: `Car ${action} and Dealer notified!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};