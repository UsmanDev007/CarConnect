// src/layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import DealerDashboard from "./DealerDashboard";

export default function DealerLayout() {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <DealerDashboard />
      <main className="flex-1 lg:ml-64 min-h-screen w-full min-w-0 transition-all duration-300">
        <div className="p-4 md:p-8 lg:p-10 pt-20 md:pt-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
