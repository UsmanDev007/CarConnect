import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../pages/admin/AdminLayout";
import AdminCars from "../pages/admin/AdminCars";
import Dashobard from "../pages/admin/Dashobard";
import DealerLayout from "../pages/dealer/DealerLayout";
import PendingCars from "../pages/admin/PendingCars";
import DealerCar from "../pages/dealer/DealerCar";
import Login from "../pages/admin/Login";
import RoleSelection from "./RoleSelect";
import DashboardD from "../pages/dealer/Dashboard";
import DealerRegister from "../pages/dealer/DealerRegister";
import UserRegister from "../pages/user/UserRegister";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 0. Role Selection */}
      <Route path="/" element={<RoleSelection />} />

      {/* 1. Universal Login Page */}
      <Route path="/:role/login" element={<Login />} />
       {/* Register Page */}
       <Route path="/dealer/register" element={<DealerRegister />} />
       <Route path="/user/register" element={<UserRegister />} />
      {/* 2. Protected Admin Routes */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["admin"]} redirectTo="/admin/login" />
        }
      >
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashobard />} />
          <Route path="/admin/cars" element={<AdminCars />} />
          <Route path="/admin/pendingCar" element={<PendingCars />} />
        </Route>
      </Route>

      {/* 3. Protected Dealer Routes */}
      <Route
        element={
          <ProtectedRoute
            allowedRoles={["dealer"]}
            redirectTo="/dealer/login"
          />
        }
      >
        <Route element={<DealerLayout />}>
          <Route path="/dealer/dashboard" element={<DashboardD />} />
          <Route path="/dealer/cars" element={<DealerCar />} />
        </Route>
      </Route>

      {/* 4. Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
