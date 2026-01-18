import Car from "../model/CarSchema.js";

export async function addCar(req, res) {
  try {
    const { brand, model, price, year, carImgUrl, detail } = req.body;
    const newCar = new Car({
      brand,
      model,
      price,
      year,
      carImgUrl,
      detail,
      createdBy: req.adminId,
    });
    const savedCar = await newCar.save();
    res.status(201).json({
      success: true,
      message: "Car Added Successfully",
      car: savedCar,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Validation failed or Failed to Add",
      error: error.message,
    });
  }
}
// get the cars
export async function getAdminAllCar(req, res) {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
//update the car
export async function updateCar(req, res) {
  try {
    const { id } = req.params;
    const updatedCar = req.body;
    const car = await Car.findByIdAndUpdate(id, updatedCar, {
      new: true,
      runValidators: true,
    });
    if (!car) {
      return res.status(404).json({ message: "Car not Found" });
    }
    res.status(200).json({ message: "Car Updated Successfully!" });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Updated Failed", error: error.message });
  }
}
//delete Car
export async function deleteCar(req, res) {
  try {
    const { id } = req.params;
    const car = await Car.findByIdAndDelete(id);
    if (!car) {
      return res.status(404).json({ message: "Car not Found" });
    }
    res.status(200).json({ message: "Car Deleted Successfully!" });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Deleted Failed", error: error.message });
  }
}
