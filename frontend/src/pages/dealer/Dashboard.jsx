import React, { useEffect } from 'react';
import { useDealerCar } from '../../hooks/useDealerCars';
import { Car, CheckCircle, Clock, TrendingUp, AlertCircle, RefreshCcw, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { car, fetchCars, loading, error } = useDealerCar();

  useEffect(() => {
    fetchCars();
  }, []);

  // Calculate stats from the car array
  const totalCars = car?.length || 0;
  const approvedCars = car?.filter(c => c.status === 'approved').length || 0;
  const pendingCars = car?.filter(c => c.status === 'pending').length || 0;
  const totalValue = car?.reduce((acc, curr) => acc + curr.price, 0) || 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] p-6 lg:p-10 text-slate-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight italic uppercase">
            Dealer <span className="text-blue-500">Analytics</span>
          </h1>
          <p className="text-slate-400 text-sm font-medium mt-1">Real-time performance overview</p>
        </div>
        <button 
          onClick={() => fetchCars()}
          className="p-3 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors"
        >
          <RefreshCcw size={20} className="text-slate-400" />
        </button>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400">
          <AlertCircle size={20} />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Cars Card */}
        <div className="relative group overflow-hidden bg-slate-900/40 border border-slate-800 p-6 rounded-[2rem] hover:border-blue-500/50 transition-all duration-500">
          <div className="absolute -right-4 -top-4 text-blue-500/10 group-hover:text-blue-500/20 transition-colors">
            <Car size={120} />
          </div>
          <div className="relative z-10">
            <div className="bg-blue-500/10 border border-blue-500/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-blue-500">
              <Car size={24} />
            </div>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">Total Inventory</p>
            <h2 className="text-4xl font-black mt-1">{totalCars}</h2>
            <p className="text-xs text-slate-500 mt-2 font-medium">Vehicles currently listed</p>
          </div>
        </div>

        {/* Approved Cars Card - Using your "Positive" Color Preference */}
        <div className="relative group overflow-hidden bg-slate-900/40 border border-slate-800 p-6 rounded-[2rem] hover:border-blue-400/50 transition-all duration-500">
          <div className="absolute -right-4 -top-4 text-blue-400/10 group-hover:text-blue-400/20 transition-colors">
            <CheckCircle size={120} />
          </div>
          <div className="relative z-10">
            <div className="bg-blue-400/10 border border-blue-400/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-blue-400">
              <CheckCircle size={24} />
            </div>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">Approved</p>
            <h2 className="text-4xl font-black mt-1 text-blue-400">{approvedCars}</h2>
            <p className="text-xs text-slate-500 mt-2 font-medium">Ready for buyers</p>
          </div>
        </div>

        {/* Pending Review Card */}
        <div className="relative group overflow-hidden bg-slate-900/40 border border-slate-800 p-6 rounded-[2rem] hover:border-amber-500/50 transition-all duration-500">
          <div className="absolute -right-4 -top-4 text-amber-500/10 group-hover:text-amber-500/20 transition-colors">
            <Clock size={120} />
          </div>
          <div className="relative z-10">
            <div className="bg-amber-500/10 border border-amber-500/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-amber-500">
              <Clock size={24} />
            </div>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">Pending</p>
            <h2 className="text-4xl font-black mt-1 text-amber-500">{pendingCars}</h2>
            <p className="text-xs text-slate-500 mt-2 font-medium">Awaiting admin check</p>
          </div>
        </div>

        {/* Inventory Value Card */}
        <div className="relative group overflow-hidden bg-slate-900/40 border border-slate-800 p-6 rounded-[2rem] hover:border-purple-500/50 transition-all duration-500">
          <div className="absolute -right-4 -top-4 text-purple-500/10 group-hover:text-purple-500/20 transition-colors">
            <TrendingUp size={120} />
          </div>
          <div className="relative z-10">
            <div className="bg-purple-500/10 border border-purple-500/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-purple-500">
              <TrendingUp size={24} />
            </div>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">Portfolio Value</p>
            <h2 className="text-3xl font-black mt-1 text-white truncate">
              ${(totalValue / 1000).toFixed(1)}k
            </h2>
            <p className="text-xs text-slate-500 mt-2 font-medium">Estimated market value</p>
          </div>
        </div>

      </div>

      {/* Decorative Chart Placeholder */}
      <div className="mt-10 bg-slate-900/20 border border-slate-800/50 rounded-[2.5rem] p-10 flex flex-col items-center justify-center border-dashed">
         <div className="text-slate-600 text-sm font-bold uppercase tracking-[0.2em] mb-2">Sales Forecast</div>
         <p className="text-slate-500 text-xs italic text-center">Charts and activity graphs will appear here once more data is collected.</p>
      </div>
    </div>
  );
};

export default Dashboard;