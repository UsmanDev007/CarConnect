import { useEffect } from "react";
import { useCars } from "../../hooks/useCars";
import { Check, X, MapPin, Calendar, Gauge, Trash2 } from "lucide-react";
import { Spinner } from "../../components/ui/spinner";

const PendingCars = () => {
  const { pendingCars, loading, fetchPendingCars, reviewDealerCar } = useCars();
  
  useEffect(() => {
    fetchPendingCars();
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Pending Approval
        </h1>
        <p className="text-slate-400">
          Review and manage new car listings from dealers.
        </p>
      </div>

      {/* GRID SECTION */}
      {pendingCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {pendingCars.map((car) => (
            <div
              key={car._id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all group"
            >
              {/* IMAGE SECTION */}
              <div className="relative h-48 w-full bg-slate-800">
                <img
                  src={car.images[0] || "/api/placeholder/400/320"}
                  alt={car.model}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border border-amber-500/20 backdrop-blur-md">
                    Pending Review
                  </span>
                </div>
              </div>

              {/* CONTENT SECTION */}
              <div className="p-5 space-y-4">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-white">
                      {car.brand} {car.model}
                    </h3>
                    <span className="text-blue-500 font-bold text-lg">
                      ${car.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500 text-sm mt-1">
                    <MapPin size={14} />
                    <span>{car.location}</span>
                  </div>
                </div>

                {/* SPEC GRID */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800">
                  <div className="flex flex-col items-center gap-1">
                    <Calendar size={14} className="text-slate-400" />
                    <span className="text-xs text-white">{car.year}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Gauge size={14} className="text-slate-400" />
                    <span className="text-xs text-white">{car.mileage}km</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Trash2 size={14} className="text-slate-400" />
                    <span className="text-xs text-white truncate w-full text-center">
                      {car.condition}
                    </span>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-3 pt-2">
                  <button
                    className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-emerald-600/10"
                    onClick={() => reviewDealerCar(car._id, "approved")}
                  >
                    <Check size={16} />
                    Approve
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-red-900/30 text-slate-300 hover:text-red-500 py-2 rounded-xl text-sm font-semibold transition-all border border-slate-700 hover:border-red-900/50">
                    <X size={16} />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* EMPTY STATE */
        <div className="flex flex-col items-center justify-center py-20 bg-slate-900/50 border border-dashed border-slate-800 rounded-3xl">
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-500">
            <Check size={32} />
          </div>
          <h2 className="text-xl font-semibold text-white">All caught up!</h2>
          <p className="text-slate-400">
            There are no cars waiting for approval.
          </p>
        </div>
      )}
    </div>
  );
};

export default PendingCars;
