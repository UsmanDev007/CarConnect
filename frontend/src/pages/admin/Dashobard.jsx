import React from "react";
import {
  Users,
  Store,
  CarFront,
  ShieldCheck,
  Activity,
  Zap,
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

import { useCars } from "../../hooks/useCars";
import { useDealerCar } from "../../hooks/useDealerCars";
import { useAdminStat } from "../../hooks/useAdminStat";

const Dashboard = () => {
  const { cars } = useCars();
  const { car } = useDealerCar();
  const { stat } = useAdminStat();

  // 2. Prepare Dynamic Chart Data
  const chartData = [
    { name: 'Total Users', value: stat?.users || 0 },
    { name: 'Total Dealers', value: stat?.dealers || 0 },
    { name: 'Admin Stock', value: cars.length },
    { name: 'Dealer Stock', value: car.length },
  ];

  const stats = [
    {
      id: 1,
      title: "Total Users",
      value: stat?.users || 0,
      icon: <Users className="text-blue-500" size={22} />,
      label: "Live Accounts",
      color: "from-blue-600/20 to-transparent",
    },
    {
      id: 2,
      title: "Total Dealers",
      value: stat?.dealers || 0,
      icon: <Store className="text-emerald-500" size={22} />,
      label: "Verified Partners",
      color: "from-emerald-600/20 to-transparent",
    },
    {
      id: 3,
      title: "Admin Inventory",
      value: cars.length,
      icon: <ShieldCheck className="text-purple-500" size={22} />,
      label: "Direct Stock",
      color: "from-purple-600/20 to-transparent",
    },
    {
      id: 4,
      title: "Dealer Inventory",
      value: car.length,
      icon: <CarFront className="text-orange-500" size={22} />,
      label: "Marketplace Stock",
      color: "from-orange-600/20 to-transparent",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30 p-4 md:p-8">
      <main className="max-w-7xl mx-auto">
        {/* --- HEADER SECTION --- */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Activity className="text-blue-500" size={18} />
              <span className="text-blue-500 font-black uppercase tracking-[0.4em] text-[10px]">
                Real-Time Analytics
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
              Admin <span className="text-blue-500">Terminal</span>
            </h1>
          </div>

          <div className="px-5 py-3 bg-slate-900/50 border border-white/5 rounded-2xl flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Online</span>
          </div>
        </div>

        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.id} className="relative overflow-hidden bg-slate-900/40 border border-white/5 p-7 rounded-[2.5rem] hover:border-blue-500/30 transition-all duration-500 group">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-white/5 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                    {stat.icon}
                  </div>
                  <Zap size={14} className="text-slate-800 group-hover:text-yellow-500 transition-colors" />
                </div>
                <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{stat.title}</h3>
                <div className="text-4xl font-black italic tracking-tighter mb-1 group-hover:text-blue-400 transition-colors">{stat.value}</div>
                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-tight">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* --- DYNAMIC CHART AREA --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900/20 border border-white/5 rounded-[3rem] p-8 min-h-[450px]">
            <div className="flex items-center justify-between mb-8 px-4">
               <h4 className="text-slate-400 font-black uppercase italic tracking-[0.2em] text-sm">Platform Distribution</h4>
               <div className="flex gap-4 text-[10px] font-bold uppercase text-slate-500">
                 <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"/> Value</span>
               </div>
            </div>

            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#475569" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '12px' }}
                    itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-slate-900/20 border border-white/5 rounded-[3rem] p-10 flex flex-col items-center justify-center min-h-[450px] group border-dashed hover:border-solid hover:border-white/10 transition-all">
            <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center mb-4 group-hover:rotate-90 transition-transform duration-500">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
            </div>
            <p className="text-slate-600 font-black uppercase tracking-[0.3em] text-[10px]">Command Center</p>
            <div className="mt-8 space-y-3 w-full">
              <button className="w-full py-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all">Add New Listing</button>
              <button className="w-full py-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Export Report</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;