import mongoose from "mongoose";
const CarSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    carImgUrl: {
      frontImg: { type: String, required: true },
      backImg1: { type: String, required: true },
      backImg2: { type: String, required: true },
      backImg3: { type: String, required: true },
    },
    detail: {
      type: String,
      required: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" }, // Links the car to the admin who added it
  },
  { timestamps: true }
);
const Car = mongoose.model("Car", CarSchema);
export default Car;
