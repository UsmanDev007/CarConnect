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
} from "@/components/ui/dialog"; // shadcn Dialog
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

export function AddCarDialog({ onAdd }) {
  const [open, setOpen] = useState(false);
  // Car fields
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [detail,setDetail]=useState("")

  // Images
  const [frontImg, setFrontImg] = useState("");
  const [backImg1, setBackImg1] = useState("");
  const [backImg2, setBackImg2] = useState("");
  const [backImg3, setBackImg3] = useState("");

  const handleSubmit = async () => {
    const newCarData = {
      brand,
      model,
      price: Number(price),
      year: Number(year),
      detail,
      carImgUrl: {
        frontImg,
        backImg1,
        backImg2,
        backImg3,
      },
    };

    const result = await onAdd(newCarData);
    if (result.success) {
      setOpen(false); 
      // Reset form
      setBrand("");
      setModel("");
      setPrice("");
      setYear("");
      setDetail("")
      setFrontImg("");
      setBackImg1("");
      setBackImg2("");
      setBackImg3("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus size={18} className="mr-2" /> Add New Car
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle >Add New Car</DialogTitle>
          <DialogDescription>
            Fill in car details and images, then click "Add".
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
            placeholder="Detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
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
            Add Car
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
