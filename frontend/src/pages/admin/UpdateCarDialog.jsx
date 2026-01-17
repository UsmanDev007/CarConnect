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

export function UpdateCarDialog({ car, onUpdate }) {
  const [open, setOpen] = useState(false);

  // Car fields
  const [brand, setBrand] = useState(car.brand);
  const [model, setModel] = useState(car.model);
  const [price, setPrice] = useState(car.price);
  const [year, setYear] = useState(car.year);

  // Image URLs
  const [frontImg, setFrontImg] = useState(car.carImgUrl?.frontImg || "");
  const [backImg1, setBackImg1] = useState(car.carImgUrl?.backImg1 || "");
  const [backImg2, setBackImg2] = useState(car.carImgUrl?.backImg2 || "");
  const [backImg3, setBackImg3] = useState(car.carImgUrl?.backImg3 || "");

  const handleSubmit = () => {
    const updatedData = {
      brand,
      model,
      price,
      year,
      carImgUrl: {
        frontImg,
        backImg1,
        backImg2,
        backImg3,
      },
    };
    onUpdate(car._id, updatedData); // call your updateCar hook
    setOpen(false); // close dialog
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Edit size={16} />
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Car</DialogTitle>
          <DialogDescription>
            Edit car details and click "Update" to save.
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
            placeholder="Front Image URL"
            value={frontImg}
            onChange={(e) => setFrontImg(e.target.value)}
          />
          <Input
            placeholder="Back Image 1 URL"
            value={backImg1}
            onChange={(e) => setBackImg1(e.target.value)}
          />
          <Input
            placeholder="Back Image 2 URL"
            value={backImg2}
            onChange={(e) => setBackImg2(e.target.value)}
          />
          <Input
            placeholder="Back Image 3 URL"
            value={backImg3}
            onChange={(e) => setBackImg3(e.target.value)}
          />
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
