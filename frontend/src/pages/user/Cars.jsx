import { useCars } from "../../hooks/useCars";
import Navbar from "../../components/ui/navbar";
import { Search, Fuel, Calendar, Gauge, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../components/ui/footer";

const Cars = () => {
  const { cars, loading } = useCars();
  // Helper to format price to PKR style
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20">
      <Navbar />

      {/* 1. HERO SECTION */}
      <div className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent -z-10" />

        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6">
            Find Your <span className="text-blue-500">Dream Drive</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-lg">
            Browse through Pakistan's most exclusive collection of verified
            luxury and local vehicles.
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute inset-0 bg-blue-600 blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="relative flex items-center bg-slate-900 border border-white/10 rounded-2xl p-2 shadow-2xl">
              <Search className="ml-4 text-slate-500" size={20} />
              <input
                type="text"
                placeholder="Search by brand, model, or city..."
                className="bg-transparent border-none outline-none w-full px-4 py-3 text-white placeholder:text-slate-600"
              />
              <button className="bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CAR LISTING GRID */}
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-6">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter">
            Available <span className="text-blue-500">Inventory</span>
          </h2>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">
            Showing {cars?.length || 0} Vehicles
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars?.map((car) => (
              <div
                key={car._id}
                className="group bg-slate-900/50 border border-white/5 rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={car.carImgUrl.frontImg}
                    alt={car.model}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full italic">
                    {car.brand}
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-950 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-black italic uppercase tracking-tight leading-none">
                      {car.model}
                    </h3>
                    <span className="text-blue-500 font-bold text-lg">
                      {formatPrice(car.price)}
                    </span>
                  </div>

                  {/* Features Mini-Bar */}
                  <div className="flex items-center gap-4 mb-6 py-3 border-y border-white/5">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Calendar size={14} className="text-blue-500" />
                      <span className="text-xs font-bold">{car.year}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Gauge size={14} className="text-blue-500" />
                      <span className="text-xs font-bold">New</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Fuel size={14} className="text-blue-500" />
                      <span className="text-xs font-bold">Petrol</span>
                    </div>
                  </div>

                  <p className="text-slate-500 text-sm line-clamp-2 mb-6 h-10">
                    {car.detail}
                  </p>

                  <Link
                    to={`/cars/${car._id}`}
                    state={{ car }}
                    className="w-full bg-white/5 hover:bg-blue-600 text-white border border-white/10 hover:border-blue-500 py-3 rounded-xl flex items-center justify-center gap-2 font-black uppercase tracking-widest text-[10px] transition-all group/btn"
                  >
                    View Details{" "}
                    <ArrowRight
                      size={14}
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
        <Footer/>
    </div>
  );
};

export default Cars;
