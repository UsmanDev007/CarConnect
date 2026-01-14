import mongoose from "mongoose";

const dealerCarSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  price: { type: Number, required: true },
  year: { type: Number, required: true },
  
  // 🚗 Additional Details for Dealer Cars
  mileage: { type: Number, required: true },
  condition: { type: String, required: true }, // e.g., "Excellent", "Good", "Needs Repair"
  transmission: { type: String, enum: ["Manual", "Automatic"], required: true },
  fuelType: { type: String, required: true },
  previousOwners: { type: Number, default: 1 },
  location: { type: String, required: true }, // Which city is the car in?
  
  images: [String], 
  description: { type: String },

  // 🛡️ Admin Approval Logic
  status: { 
    type: String, 
    enum: ["pending", "approved", "rejected"], 
    default: "pending" 
  },

  // 🆔 Relationship
  dealerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Dealer', 
    required: true 
  }
}, { timestamps: true });

export default mongoose.model("DealerCar", dealerCarSchema);