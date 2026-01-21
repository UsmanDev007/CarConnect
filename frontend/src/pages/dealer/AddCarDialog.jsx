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
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

export function AddDealerCarDialog({ onAdd }) {
  const [open, setOpen] = useState(false);

  // Basic info
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");

  // Dealer-specific fields
  const [mileage, setMileage] = useState("");
  const [condition, setCondition] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [previousOwners, setPreviousOwners] = useState(1);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  // Images (URLs only)
  const [images, setImages] = useState(["", ""]);

  const handleSubmit = async () => {
    const newDealerCar = {
      brand,
      model,
      price: Number(price),
      year: Number(year),
      mileage: Number(mileage),
      condition,
      transmission, // "Manual" | "Automatic"
      fuelType,
      previousOwners: Number(previousOwners),
      location,
      description,
      images: images.filter(Boolean), // remove empty URLs
    };

    const result = await onAdd(newDealerCar);

    if (result?.success) {
      setOpen(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setBrand("");
    setModel("");
    setPrice("");
    setYear("");
    setMileage("");
    setCondition("");
    setTransmission("");
    setFuelType("");
    setPreviousOwners(1);
    setLocation("");
    setDescription("");
    setImages(["", "", "", ""]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="group flex items-center gap-2 bg-white text-black hover:bg-blue-500 hover:text-white px-6 py-3 rounded-2xl font-black transition-all shadow-lg">
          <Plus
            size={20}
            className="group-hover:rotate-90 transition-transform"
          />
          List New Car
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Dealer Car</DialogTitle>
          <DialogDescription>
            Fill dealer car details (Admin approval required).
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
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            placeholder="Year"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />

          <Input
            placeholder="Mileage (km)"
            type="number"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
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
            <option value="Excellent">
              Excellent
            </option>
            <option value="Good">
              Good
            </option>
            <option value="Needs Repair">
              Needs Repair
            </option>
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
            <option value="Manual">
              Manual
            </option>
            <option value="Automatic">
              Automatic
            </option>
          </select>
          <Input
            placeholder="Fuel Type"
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
          />
          <Input
            placeholder="Previous Owners"
            type="number"
            min={1}
            max={3}
            value={previousOwners}
            onChange={(e) => setPreviousOwners(e.target.value)}
          />

          <Input
            placeholder="Location (City)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {images.map((img, index) => (
            <Input
              key={index}
              placeholder={`Image URL ${index + 1}`}
              value={img}
              onChange={(e) => {
                const copy = [...images];
                copy[index] = e.target.value;
                setImages(copy);
              }}
            />
          ))}
        </div>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Car</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
