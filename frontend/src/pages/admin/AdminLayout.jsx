// src/layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Sidebar is ALWAYS here */}
      <AdminDashboard /> 

      {/* This main area changes based on the URL */}
      <main className="flex-1 ml-64 p-8">
        <Outlet /> 
      </main>
    </div>
  );
}