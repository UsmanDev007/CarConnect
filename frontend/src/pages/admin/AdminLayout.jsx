// src/layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* The AdminDashboard now contains the Hamburger (Sheet) for mobile 
         and the Fixed Sidebar for desktop.
      */}
      <AdminDashboard />

      {/* Change: ml-0 by default (mobile), lg:ml-64 for desktop.
         Added: min-w-0 to prevent table layout breaking.
      */}
      <main className="flex-1 lg:ml-64 min-h-screen w-full min-w-0 transition-all duration-300">
        {/* Added pt-20 for mobile so content doesn't sit under your floating hamburger button */}
        <div className="p-4 md:p-8 lg:p-10 pt-20 md:pt-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
