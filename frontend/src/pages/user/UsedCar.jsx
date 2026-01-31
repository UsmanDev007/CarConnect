import React, { useEffect, useState } from "react";
import { useDealerCar } from "../../hooks/useDealerCars";
import Navbar from "../../components/ui/navbar";
import Footer from "../../components/ui/footer";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Gauge, ArrowUpRight, Search } from "lucide-react";
import { Spinner } from "../../components/ui/spinner";
import { useSearch } from "../../hooks/useSearch";

const UsedCar = () => {
  const { car, fetchCars, loading, error } = useDealerCar();
  const { searchTerm, setSearchTerm, filterCars }=useSearch(car)
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCars();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]">
            Certified Inventory
          </div>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-6 leading-none">
            Pre-Loved <span className="text-blue-500">Performers</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-10">
            Hand-picked, multi-point inspected used cars from Pakistan’s top
            dealers. Quality drive, budget-friendly prices.
          </p>

          {/* Quick Filter Search */}
          <div className="max-w-2xl mx-auto bg-slate-900/50 backdrop-blur-md border border-white/5 p-2 rounded-2xl flex flex-col md:flex-row gap-2 shadow-2xl">
            <div className="flex-1 flex items-center px-4 gap-3">
              <Search size={18} className="text-slate-500" />
              <input
                type="text"
                placeholder="Search Brand or Model..."
                className="bg-transparent border-none outline-none w-full py-3 text-sm"
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-blue-600/20">
              Find My Car
            </button>
          </div>
        </div>
      </section>

      {/* --- CAR LISTING GRID --- */}
      <main className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 border-b border-white/5 pb-8">
          <div>
            <h2 className="text-2xl font-black italic uppercase tracking-tight">
              Available <span className="text-blue-500">Listings</span>
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Showing {filterCars?.length || 0} approved vehicles in Pakistan
            </p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            {/* You can add Sort/Filter dropdowns here later */}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Spinner />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 font-bold">
            {error}
          </div>
        ) : !filterCars?.length ? (
          <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-dashed border-white/10">
            <p className="text-slate-500 italic">
              No approved cars found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filterCars.map((item) => (
              <div
                key={item._id}
                className="group bg-slate-900/30 border border-white/5 rounded-[32px] overflow-hidden hover:border-blue-500/50 transition-all duration-500"
              >
                {/* Image Wrap */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={
                      item.images?.[0] ||
                      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800"
                    }
                    alt={`${item.brand} ${item.model}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-blue-600 text-white text-[9px] font-black uppercase px-3 py-1 rounded-full">
                      Used
                    </span>
                    <span className="bg-slate-950/80 backdrop-blur-md text-white text-[9px] font-black uppercase px-3 py-1 rounded-full border border-white/10">
                      {item.transmission}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-950 to-transparent" />
                </div>

                {/* Content Wrap */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-black italic uppercase tracking-tighter leading-none">
                        {item.brand} {item.model}
                      </h3>
                      <div className="flex items-center gap-1 text-slate-500 mt-2 text-xs">
                        <MapPin size={12} className="text-blue-500" />
                        {item.location}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-500 font-black text-xl leading-none">
                        ${item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Icon Specs Grid */}
                  <div className="grid grid-cols-2 gap-3 py-4 border-y border-white/5 my-6">
                    <div className="flex items-center gap-2 text-slate-400 text-[11px] font-bold">
                      <Calendar size={14} className="text-blue-500" />
                      {item.year} Model
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-[11px] font-bold">
                      <Gauge size={14} className="text-blue-500" />
                      {item.mileage.toLocaleString()} KM
                    </div>
                  </div>

                  <Link
                    to={``}
                    state={{ car: item }}
                    className="flex items-center justify-center gap-2 w-full bg-white/5 hover:bg-blue-600 text-white border border-white/10 hover:border-blue-500 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all group/btn"
                  >
                    Explore Details{" "}
                    <ArrowUpRight
                      size={14}
                      className="group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default UsedCar;
