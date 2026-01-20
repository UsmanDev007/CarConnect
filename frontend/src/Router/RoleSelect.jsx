import { useNavigate } from "react-router-dom";
import { User, ShieldCheck, Warehouse, ArrowRight } from "lucide-react";

const RoleSelection = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: "admin",
      title: "Administrator",
      desc: "Full system control, user management, and analytics.",
      icon: <ShieldCheck size={32} className="text-blue-400" />,
      glow: "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]",
      border: "group-hover:border-blue-500/50",
    },
    {
      id: "dealer",
      title: "Dealer Portal",
      desc: "Post inventory, track leads, and manage your showroom.",
      icon: <Warehouse size={32} className="text-emerald-400" />,
      glow: "group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]",
      border: "group-hover:border-emerald-500/50",
    },
    {
      id: "user",
      title: "Customer",
      desc: "Search for cars, save favorites, and chat with dealers.",
      icon: <User size={32} className="text-purple-400" />,
      glow: "group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]",
      border: "group-hover:border-purple-500/50",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col justify-center items-center py-12 px-6">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-blue-500/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
          Select <span className="text-blue-500">Access</span> Point
        </h1>
        <p className="text-slate-400 text-lg max-w-md mx-auto">
          Welcome back. Please choose the portal you wish to access today.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => navigate(`/${role.id}/login`)}
            className={`group relative text-left p-8 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-xl transition-all duration-300 ${role.glow} ${role.border}`}
          >
            <div className="flex flex-col h-full">
              <div className="p-3 bg-slate-800 w-fit rounded-lg mb-6 group-hover:scale-110 transition-transform">
                {role.icon}
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                {role.title}
              </h2>
              
              <p className="text-slate-400 leading-relaxed mb-8 flex-grow">
                {role.desc}
              </p>

              <div className="flex items-center gap-2 text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                Enter Portal <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="relative z-10 mt-16 text-slate-500 text-sm">
        Authorized Personnel Only • CarConnect Cloud v2.0
      </div>
    </div>
  );
};

export default RoleSelection;