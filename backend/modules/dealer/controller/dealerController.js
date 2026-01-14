import Dealer from "../model/Dealer.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import DealerCar from "../model/DealerCar.js";
import Admin from "../../admin/model/AdminCar.js";
import Notification from "../../admin/model/Notification.js";
export const registerDealer = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const existingDealer = await Dealer.findOne({ email });
    if (existingDealer)
      return res.status(200).json({ message: "Dealer Already Exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newDealer = new Dealer({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    await newDealer.save();
    res.status(201).json({ message: "Registered Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const loginDealer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const dealer = await Dealer.findOne({ email });

    if (!dealer) return res.status(404).json({ message: "Dealer not found" });

    const isMatch = await bcrypt.compare(password, dealer.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate Token (Valid for 1 day)
    const token = jwt.sign(
      { id: dealer._id, role: "dealer" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res
      .status(200)
      .json({ message: "Login Successfully", email: dealer.email, JWT: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// add car by dealer
export const addDealerCar = async (req, res) => {
  try {
    // We spread req.body to get all the car specs,
    // then force dealerId and status for security.
    const newDealerCar = new DealerCar({
      ...req.body,
      dealerId: req.dealerId, // Extracted from JWT middleware
      status: "pending", // Ensure it always starts as pending
    });

    const savedCar = await newDealerCar.save();
     const admin=await Admin.findOne()
      if (admin) {
      await Notification.create({
        recipient: admin._id,
        recipientModel: 'Admin', // This matches your Enum in the schema
        message: `New car alert! A dealer has uploaded a ${req.body.brand} ${req.body.model}.`
      });
    }
    
    res.status(201).json({
      message:
        "Car submitted successfully. It will be visible once Admin approves it.",
      carId: savedCar._id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add car", error: error.message });
  }
};
// get car
export const getMyUploadedCars = async (req, res) => {
  try {
    const myCars = await DealerCar.find({ dealerId: req.dealerId });

    res.status(200).json(myCars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateMyUploadCars = async (req, res) => {
  try {
     const {id}=req.params
     const updateCar=await DealerCar.findByIdAndUpdate({_id:id,dealerId:req.dealerId},{ ...req.body, status: "pending" },{ new: true })
     if (!updateCar) {
      return res.status(404).json({ message: "Car not found or unauthorized" });
    }
    res.status(200).json({ message: "Car updated and sent for re-approval", updateCar });
  } catch (error) {
    res.status(500).json({message:error.message});
  }
};
export const deleteMyUploadCars = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCar = await DealerCar.findOneAndDelete({
      _id: id,
      dealerId: req.dealerId // Ensures only the owner can delete
    });

    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found or unauthorized" });
    }

    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
