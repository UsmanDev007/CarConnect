import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLogin from '../pages/admin/Login'
import ProtectedRoute from './ProtectedRoute'
import AdminLayout from '../pages/admin/AdminLayout'
import AdminCars from '../pages/admin/AdminCars'
import Dashobard from '../pages/admin/Dashobard'
import PendingCars from '../pages/admin/PendingCars'
const AppRoutes = () => {
  return (
    <>
      <Routes>
      {/* 1. Public Admin Entry */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* 2. PROTECTED ADMIN ROUTES */}
      {/* This Wrapper checks if role === 'admin' before showing any page below */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} redirectTo='/admin/login' />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashobard />} />
          <Route path="/admin/cars" element={<AdminCars />} />
          <Route path="/admin/pendingCar" element={<PendingCars />} />
        </Route>
      </Route>

      {/* 3. Automatic Redirect */}
      {/* If someone tries to go to /admin, send them to dashboard (which will then check login) */}
      <Route path="/admin" element={<Navigate to="/admin/admin-dashboard" replace />} />
      
      {/* Catch-all for unknown URLs */}
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
    </>
  )
}

export default AppRoutes
