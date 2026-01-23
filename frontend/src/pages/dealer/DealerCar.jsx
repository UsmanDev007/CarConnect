import React, { useEffect } from "react";
import { useDealerCar } from "../../hooks/useDealerCars";
import {
  Plus,
  Gauge,
  Fuel,
  Zap,
  MapPin,
  MoreVertical,
  Edit3,
  Trash2,
  PackageOpen,
  Loader2,
} from "lucide-react";
import { AddDealerCarDialog } from "./AddCarDialog";
import { UpdateDealerCarDialog } from "./UpdateCarDialog";

const DealerCar = () => {
  const { car, addCar, fetchCars, deleteCar, loading, error, updateCar } =
    useDealerCar();
  useEffect(() => {
    fetchCars();
  }, []);
  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you Sure you want to delete this Car if you Delete the Car it will be not showing to End User Anymore",
      )
    ) {
      await deleteCar(id);
    }
  };

  // --- 1. LOADING STATE (Skeleton Grid) ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] p-4 md:p-8">
        <div className="flex justify-between items-center mb-10">
          <div className="h-10 w-48 bg-slate-800 animate-pulse rounded-lg"></div>
          <div className="h-12 w-32 bg-slate-800 animate-pulse rounded-xl"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-[450px] bg-slate-900/40 border border-slate-800 rounded-3xl animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  // --- 2. EMPTY STATE (No Cars Found) ---
  if (!car || car.length === 0) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6">
        <div className="relative">
          <div className="absolute -inset-1 bg-blue-500 rounded-full blur opacity-20 animate-pulse"></div>
          <div className="relative bg-slate-900 border border-slate-800 p-8 rounded-full mb-6">
            <PackageOpen size={60} className="text-slate-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Inventory Empty</h2>
        <p className="text-slate-400 text-center max-w-sm mb-8">
          You haven't listed any vehicles yet. Start your journey by adding your
          first car to the showroom.
        </p>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-bold transition-all transform hover:scale-105 shadow-xl shadow-blue-600/20">
          <Plus size={20} /> Add Your First Vehicle
        </button>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-red-500/10 p-6 rounded-full mb-6">
          <div className="bg-red-500/20 p-4 rounded-full">
            {/* AlertOctagon or AlertCircle icon */}
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Connection Error</h2>
        <p className="text-slate-400 max-w-sm mb-8">
          {error ||
            "We couldn't reach the server. Please check your internet connection and try again."}
        </p>
        <button
          onClick={() => fetchCars()} // Call fetchCars again to retry
          className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-xl font-bold transition-all border border-slate-700"
        >
          Try Again
        </button>
      </div>
    );
  }
  // --- 3. MAIN DATA STATE (Grid of Cards) ---
  return (
    <div className="min-h-screen bg-[#020617] p-4 md:p-8 text-slate-100">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white italic uppercase">
            Showroom <span className="text-blue-500">Inventory</span>
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
            <p className="text-slate-400 text-sm font-medium">
              {car.length} Vehicles Online & Active
            </p>
          </div>
        </div>
        {/* add new car */}
        <AddDealerCarDialog onAdd={addCar} />
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {car.map((item) => (
          <div
            key={item._id}
            className="group relative bg-slate-900/40 border border-slate-800/50 rounded-[2.5rem] overflow-hidden hover:border-blue-500/50 transition-all duration-500 flex flex-col hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            {/* Image Section */}
            <div className="relative h-60 overflow-hidden">
              <img
                src={
                  item.images[0] ||
                  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000&auto=format&fit=crop"
                }
                alt={item.model}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
              />

              {/* Status Badge */}
              <div
                className={`absolute top-5 left-5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border backdrop-blur-xl shadow-2xl  ${
                  item.status === "approved"
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                    : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                }`}
              >
                {item.status}
              </div>

              {/* Price Tag Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 to-transparent p-6 pt-10 text-right">
                <p className="text-2xl font-black text-white italic">
                  ${item.price.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-7 pt-5 flex-grow">
              <div className="mb-8">
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">
                  {item.brand}
                </span>
                <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                  {item.model}
                </h2>
                <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-2">
                  <MapPin size={12} className="text-blue-500" />
                  <span className="font-medium">{item.location}</span>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 py-5 border-y border-slate-800/50 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-800/50 rounded-xl text-blue-400">
                    <Gauge size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">
                      Mileage
                    </span>
                    <span className="text-xs font-bold text-slate-200">
                      {item.mileage.toLocaleString()} km
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-800/50 rounded-xl text-emerald-400">
                    <Zap size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">
                      Gearbox
                    </span>
                    <span className="text-xs font-bold text-slate-200">
                      {item.transmission}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-800/50 rounded-xl text-purple-400">
                    <Fuel size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">
                      Fuel
                    </span>
                    <span className="text-xs font-bold text-slate-200">
                      {item.fuelType}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-800/50 rounded-xl text-amber-400 font-black text-[10px] italic">
                    {item.year.toString().slice(-2)}'
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">
                      Cond.
                    </span>
                    <span className="text-xs font-bold text-slate-200">
                      {item.condition}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-auto">
                <UpdateDealerCarDialog car={item} onUpdate={updateCar} />
                <button
                  className="px-5 flex items-center justify-center bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-3 rounded-2xl transition-all duration-300"
                  onClick={() => handleDelete(item._id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealerCar;
