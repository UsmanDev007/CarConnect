import {
  LayoutDashboard,
  Car,
  Users,
  PlusCircle,
  Bell,
  Settings,
  LogOut,
  ChevronUp,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    { name: "Inventory", path: "/admin/cars", icon: <Car size={20} /> },
    { name: "Users", path: "/admin/users", icon: <Users size={20} /> },
    { name: "Dealers", path: "/admin/dealers", icon: <Users size={20} /> },
  ];

  return (
    <div className="w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col fixed left-0 top-0 z-50">
      {/* 1. BRANDING */}
      <div className="p-6">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter text-white">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Car size={18} />
          </div>
          CAR<span className="text-blue-500">CONNECT</span>
        </div>
      </div>

      {/* 2. QUICK ACTION BUTTON (Add Data) */}
      <div className="px-4 mb-6">
        <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/10">
          <PlusCircle size={18} />
          <span>Add New Listing</span>
        </button>
      </div>

      {/* 3. MAIN NAVIGATION */}
      <nav className="flex-1 px-4 space-y-1">
        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2 px-2">
          Main Menu
        </p>
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
              location.pathname === item.path
                ? "bg-blue-600/10 text-blue-400 border border-blue-600/20"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </button>
        ))}
      </nav>

      {/* 4. FOOTER: Notifications & Profile */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        {/* Notifications Shortcut */}
        <button className="w-full flex items-center justify-between px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all">
          <div className="flex items-center gap-3">
            <Bell size={20} />
            <span className="font-medium">Notifications</span>
          </div>
          <span className="bg-blue-600 text-[10px] text-white px-1.5 py-0.5 rounded-full">
            4
          </span>
        </button>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center gap-3 p-2 hover:bg-slate-800 rounded-xl transition-all outline-none">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-700 flex items-center justify-center font-bold text-blue-400 shadow-inner">
                AD
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold text-white leading-none">
                  Admin
                </p>
              </div>
              <ChevronUp size={16} className="text-slate-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 mb-2 bg-slate-900 border-slate-800 text-slate-200"
            align="end"
            side="top"
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuItem className="gap-2 focus:bg-slate-800 focus:text-white cursor-pointer">
              <Settings size={16} /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuItem
              className="gap-2 text-red-400 focus:bg-red-400/10 focus:text-red-400 cursor-pointer"
              onClick={() => {
                localStorage.clear();
                navigate("/admin/login");
              }}
            >
              <LogOut size={16} /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
