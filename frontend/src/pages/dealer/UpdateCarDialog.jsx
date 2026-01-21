"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"; // shadcn dialog
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit } from "lucide-react";

export function UpdateDealerCarDialog({ car, onUpdate }) {
  const [open, setOpen] = useState(false);

  // DealerCar fields
  const [brand, setBrand] = useState(car.brand);
  const [model, setModel] = useState(car.model);
  const [price, setPrice] = useState(car.price);
  const [year, setYear] = useState(car.year);
  const [mileage, setMileage] = useState(car.mileage || "");
  const [condition, setCondition] = useState(car.condition || "");
  const [transmission, setTransmission] = useState(
    car.transmission || "Manual",
  );
  const [fuelType, setFuelType] = useState(car.fuelType || "");
  const [previousOwners, setPreviousOwners] = useState(car.previousOwners || 1);
  const [location, setLocation] = useState(car.location || "");
  const [description, setDescription] = useState(car.description || "");

  // Images array (up to 4)
  const [images, setImages] = useState(car.images || ["", "", "", ""]);

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const handleSubmit = () => {
    const updatedData = {
      brand,
      model,
      price,
      year,
      mileage,
      condition,
      transmission,
      fuelType,
      previousOwners: Math.min(Math.max(previousOwners, 1), 2), // min 1, max 2
      location,
      description,
      images,
    };
    onUpdate(car._id, updatedData);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Edit
          size={16}
          className="text-yellow-400 group-hover:text-white transition-colors"
        />
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Update Dealer Car</DialogTitle>
          <DialogDescription>
            Edit dealer car details and click "Update" to save.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4">
          <Input
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <Input
            placeholder="Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
          <Input
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <Input
            placeholder="Year"
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          />
          <Input
            placeholder="Mileage"
            type="number"
            value={mileage}
            onChange={(e) => setMileage(Number(e.target.value))}
          />

          {/* Condition */}
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-50 ring-offset-slate-950 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="" disabled>
              Select Condition
            </option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Needs Repair">Needs Repair</option>
          </select>

          {/* Transmission */}
          <select
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
            className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-50 ring-offset-slate-950 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="" disabled>
              Select Transmission
            </option>
            <option value="Manual">Manual</option>
            <option value="Automatic">Automatic</option>
          </select>

          <Input
            placeholder="Fuel Type"
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
          />
          <Input
            placeholder="Previous Owners"
            type="number"
            value={previousOwners}
            min={1}
            max={2}
            onChange={(e) => setPreviousOwners(Number(e.target.value))}
          />
          <Input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {images.map((img, idx) => (
            <Input
              key={idx}
              placeholder={`Image URL ${idx + 1}`}
              value={img}
              onChange={(e) => handleImageChange(idx, e.target.value)}
            />
          ))}
        </div>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleSubmit}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
