import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../pages/admin/AdminLayout";
import AdminCars from "../pages/admin/AdminCars";
import Dashobard from "../pages/admin/Dashobard"; // Consider renaming file to Dashboard
import DealerLayout from "../pages/dealer/DealerLayout";
import PendingCars from "../pages/admin/PendingCars";
import DealerCar from "../pages/dealer/DealerCar";
import Login from "../pages/admin/Login";
import RoleSelection from "./RoleSelect";
import DashboardD from "../pages/dealer/Dashboard";
import DealerRegister from "../pages/dealer/DealerRegister";
import UserRegister from "../pages/user/UserRegister";
import Home from "../pages/user/Home";
import Cars from "../pages/user/Cars";
import UsedCar from "../pages/user/UsedCar";
import CarDetails from "../pages/user/CarDetails";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 0. Public Routes */}
      <Route path="/" element={<RoleSelection />} />
      <Route path="/:role/login" element={<Login />} />
      <Route path="/dealer/register" element={<DealerRegister />} />
      <Route path="/user/register" element={<UserRegister />} />

      {/* 1. Protected Admin Routes */}
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

      {/* 2. Protected Dealer Routes */}
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

      {/* 3. Protected User (Buyer) Routes */}
      <Route
        element={
          <ProtectedRoute
            allowedRoles={["user"]}
            redirectTo="/user/login"
          />
        }
      >
        {/* If you have a UserLayout, wrap it here. Otherwise, use Home directly */}
        <Route path="/user/home" element={<Home />} />
        <Route path="/user/cars" element={<Cars />} />
        <Route path="/user/used-cars" element={<UsedCar />} />
        <Route path="/cars/:id" element={<CarDetails />} />
      </Route>

      {/* 4. Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;