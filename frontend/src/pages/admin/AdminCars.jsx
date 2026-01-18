import React, { useState } from "react";
import { Trash2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCars } from "../../hooks/useCars";
import { UpdateCarDialog } from "./UpdateCarDialog";
import { AddCarDialog } from "./AddCarDialog";

const AdminCars = () => {
  const { cars, loading, error, deleteCar, updateCar, addCar } = useCars();
  const [searchTerm, setSearchTerm] = useState("");
  const filterCars = React.useMemo(() => {
    return cars.filter((car) => {
      if (!searchTerm) return true;
      const brand = car.brand?.toLowerCase() || "";
      const model = car.model?.toLowerCase() || "";
      const search = searchTerm.toLowerCase();
      return brand.includes(search) || model.includes(search);
    });
  }, [cars, searchTerm]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Car")) {
      await deleteCar(id);
    }
  };
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6  max-w-full px-4 md:px-0">
      {/* SEARCH & FILTERS: Full width input */}
      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div className="relative w-full max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            size={18}
          />
          <Input
            placeholder="Search by brand or model..."
            className="pl-10 bg-slate-950 border-slate-800 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* DATA TABLE: Horizontal scroll container */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="min-w-[800px] w-full text-left border-collapse">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="p-4 font-semibold whitespace-nowrap">
                  Car Details
                </th>
                <th className="p-4 font-semibold whitespace-nowrap">Price</th>
                <th className="p-4 font-semibold whitespace-nowrap">
                  Year/Milage
                </th>
                <th className="p-4 font-semibold whitespace-nowrap">Status</th>
                <th className="p-4 font-semibold text-right whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="p-10 text-center text-slate-500 italic"
                  >
                    Loading inventory...
                  </td>
                </tr>
              ) : (
                filterCars.map((car) => (
                  <tr
                    key={car._id}
                    className="hover:bg-slate-800/30 transition-colors group"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-12 h-8 md:w-16 md:h-10 bg-slate-800 rounded overflow-hidden border border-slate-700">
                          <img
                            src={car.carImgUrl?.frontImg}
                            alt={car.model}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/150?text=No+Image";
                            }}
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-white truncate max-w-[120px] md:max-w-none">
                            {car.brand}
                          </div>
                          <div className="text-xs text-blue-400 font-medium truncate">
                            {car.model}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 text-emerald-400 font-mono font-bold whitespace-nowrap">
                      ${car.price?.toLocaleString()}
                    </td>

                    <td className="p-4 text-slate-300 whitespace-nowrap">
                      <div className="text-sm">{car.year}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-tighter">
                        {new Date(car.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase bg-slate-950 border border-slate-800 text-slate-400 whitespace-nowrap">
                        In Stock
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex justify-end items-center gap-1 md:gap-2">
                        <UpdateCarDialog car={car} onUpdate={updateCar} />
                        <button
                          onClick={() => handleDelete(car._id)}
                          className="p-2 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCars;
