import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Car,
  Users,
  Bell,
  Settings,
  LogOut,
  ChevronUp,
  Menu,
  AlertCircle, // Added Menu icon
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCars } from "../../hooks/useCars";
// import { AddCarDialog } from "./AddCarDialog";
import { useAuth } from "../../hooks/useAuth";

export default function DealerDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { addCar, notification, fetchAdminNotification } = useCars();
  const { user } = useAuth();
  useEffect(() => {
    fetchAdminNotification();
  }, []);
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dealer/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    { name: "Inventory", path: "/dealer/cars", icon: <Car size={20} /> },
  ];

  // Reusable Sidebar Content Logic
  const DealerSidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-900 relative overflow-hidden">
      {/* 1. BRANDING */}
      <div className="p-6">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter text-white">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Car size={18} />
          </div>
          CAR<span className="text-blue-500">CONNECT</span>
        </div>
      </div>

      {/* 2. QUICK ACTION */}
      <div className="px-4 mb-6">
        {/* <AddCarDialog onAdd={addCar} /> */}
      </div>

      {/* 3. NAVIGATION */}
      <nav className="flex-1 px-4 space-y-1">
        <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2 px-2">
          Main Menu
        </p>
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => {
              navigate(item.path);
              setIsOpen(false);
            }}
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

      {/* 4. FOOTER */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        {/* NOTIFICATION BUTTON */}
        <button
          onClick={() => setNotifOpen((prev) => !prev)}
          className="w-full flex items-center justify-between px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
        >
          <div className="flex items-center gap-3">
            <Bell size={20} />
            <span className="font-medium">Notifications</span>
          </div>

          {notification?.length > 0 && (
            <span className="bg-blue-600 text-[10px] text-white px-1.5 py-0.5 rounded-full min-w-[20px] text-center font-bold">
              {notification.length}
            </span>
          )}
        </button>

        {/* ACCOUNT MENU */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center gap-3 p-2 hover:bg-slate-800 rounded-xl outline-none">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-700 flex items-center justify-center font-bold text-blue-400">
                {user?.name[0]}
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold text-white leading-none">
                  {user?.name}
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
            <DropdownMenuItem className="gap-2 focus:bg-slate-800 cursor-pointer">
              <Settings size={16} /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuItem
              className="gap-2 text-red-400 focus:bg-red-400/10 cursor-pointer"
              onClick={() => {
                localStorage.clear();
                navigate("/dealer/login");
              }}
            >
              <LogOut size={16} /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 🔔 BOTTOM NOTIFICATION SHEET */}
      <div
        className={`
        absolute bottom-0 left-0 w-full
        bg-slate-900 border-t border-slate-800
        transition-transform duration-300 ease-out
        ${notifOpen ? "translate-y-0" : "translate-y-full"}
      `}
        style={{ height: "60vh" }}
      >
        {/* HEADER */}
        <div className="p-4 border-b border-slate-800 bg-slate-800/40 flex justify-between items-center">
          <h3 className="text-sm font-semibold text-white">Notifications</h3>
          <button
            onClick={() => setNotifOpen(false)}
            className="text-xs text-slate-400 hover:text-white"
          >
            Close
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="overflow-y-auto h-[calc(60vh-56px)]">
          {notification?.length > 0 ? (
            notification.map((notif) => (
              <div
                key={notif._id}
                className="p-4 border-b border-slate-800/50 flex gap-3 hover:bg-slate-800/50 transition-colors"
              >
                <AlertCircle size={14} className="text-blue-500 mt-1" />
                <div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {notif.message}
                  </p>
                  <span className="text-[10px] text-slate-500">
                    {new Date(notif.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-slate-500 text-sm">
              No notifications
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* MOBILE HAMBURGER (Visible only on small screens) */}
      <div className="lg:hidden fixed top-4 left-4 z-[60]">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-white shadow-xl">
              <Menu size={24} />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 border-r-slate-800">
            <DealerSidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* DESKTOP SIDEBAR (Visible only on large screens) */}
      <aside className="hidden lg:flex w-64 h-screen border-r border-slate-800 flex-col fixed left-0 top-0 z-50">
        <DealerSidebarContent />
      </aside>
    </>
  );
}
