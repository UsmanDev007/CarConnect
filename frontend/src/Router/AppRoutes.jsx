import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLogin from '../pages/admin/Login'
import AdminDashboard from '../pages/admin/Dashboard'
import ProtectedRoute from './ProtectedRoute'
const AppRoutes = () => {
  return (
    <>
      <Routes>
      {/* 1. Public Admin Entry */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* 2. PROTECTED ADMIN ROUTES */}
      {/* This Wrapper checks if role === 'admin' before showing any page below */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} redirectTo='/admin/login' />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/cars" element={<ManageCars />} /> */}
      </Route>

      {/* 3. Automatic Redirect */}
      {/* If someone tries to go to /admin, send them to dashboard (which will then check login) */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      
      {/* Catch-all for unknown URLs */}
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
    </>
  )
}

export default AppRoutes
