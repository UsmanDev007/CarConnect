import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Car, Menu, X, User, LogOut, ChevronDown, Mail, Phone, ShieldCheck, Save, EyeClosed, Outdent, PhoneCall } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/user/home" },
    { name: "Cars", path: "/user/cars" },
    { name: "Used Cars", path: "/user/used-cars" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* LOGO */}
        <div onClick={() => navigate("/user/home")} className="flex items-center gap-2 cursor-pointer">
          <Car className="text-blue-500" size={20} />
          <span className="text-white font-semibold tracking-tight">CarConnect</span>
        </div>

        {/* LINKS */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm transition ${
                  active ? "text-white border-b-2 border-blue-500 pb-1" : "text-slate-400 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* USER SECTION WITH DIALOG INTEGRATION */}
        <div className="hidden md:flex items-center gap-4">
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 text-slate-300 hover:text-white outline-none">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <span className="text-sm font-medium">{user?.name || "User"}</span>
                  <ChevronDown size={14} />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48 bg-slate-900 border border-slate-800 text-slate-200">
                {/* 🚩 TRIGGER INSIDE DROPDOWN */}
                <DialogTrigger asChild>
                  <DropdownMenuItem 
                    className="cursor-pointer focus:bg-slate-800 focus:text-white"
                    onSelect={(e) => e.preventDefault()} // Prevents dropdown from closing prematurely
                  >
                    <User className="mr-2 h-4 w-4 text-blue-500" />
                    Profile
                  </DropdownMenuItem>
                </DialogTrigger>

                <DropdownMenuSeparator className="bg-slate-800" />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-400 focus:text-red-400 focus:bg-red-400/10 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* PROFILE DIALOG CONTENT */}
            <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-800 text-slate-200">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold italic uppercase tracking-tighter text-white">
                  Account <span className="text-blue-500">Details</span>
                </DialogTitle>
                <DialogDescription className="text-slate-500">
                  Manage your personal information and verified status.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div className="flex justify-center">
                   <div className="w-20 h-20 rounded-full bg-blue-600/20 border-2 border-blue-500 flex items-center justify-center text-3xl font-black text-blue-500">
                      {user?.name?.[0]?.toUpperCase() || "U"}
                   </div>
                </div>

                <div className="grid gap-4">
                  <div className="space-y-1">
                    <Label className="text-[10px] uppercase font-bold text-slate-500 ml-1">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                      <Input defaultValue={user?.name} className="pl-10 bg-slate-950 border-slate-800 focus:border-blue-500" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-[10px] uppercase font-bold text-slate-500 ml-1">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                      <Input defaultValue={user?.email} className="pl-10 bg-slate-950 border-slate-800 focus:border-blue-500" />
                    </div>
                  </div>
                  {/* number */}
                  <div className="space-y-1">
                    <Label className="text-[10px] uppercase font-bold text-slate-500 ml-1">Phone</Label>
                    <div className="relative">
                      <PhoneCall className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                      <Input defaultValue={user?.phone} className="pl-10 bg-slate-950 border-slate-800 focus:border-blue-500" />
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/10 flex items-center gap-3">
                   <ShieldCheck className="text-blue-500" size={20} />
                   <div>
                      <p className="text-xs font-bold text-white uppercase">Verified Account</p>
                      <p className="text-[10px] text-slate-500">You are a trusted member of CarConnect.</p>
                   </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button className="md:hidden text-slate-300" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU CONTENT */}
      {isOpen && (
        <div className="md:hidden bg-slate-950 border-t border-slate-800 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-slate-300 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-800 space-y-4">
            <button className="flex items-center gap-2 w-full text-slate-300"><User size={18} /> Profile</button>
            <button onClick={handleLogout} className="flex items-center gap-2 w-full text-red-400"><LogOut size={18} /> Logout</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;