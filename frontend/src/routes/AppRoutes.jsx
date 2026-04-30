import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import Home from '../pages/user/Home';
import Booking from '../pages/user/Booking';
import Dashboard from '../pages/user/Dashboard';
import Appointments from '../pages/user/Appointments';
import Profile from '../pages/user/Profile';
import Voucher from '../pages/user/Voucher';
import AdminHome from '../pages/admin/Home';
import UserManagement from '../pages/admin/UserManagement';
import BranchManagement from '../pages/admin/BranchManagement';
import DepartmentManagement from '../pages/admin/DepartmentManagement';
import EmployeeManagement from '../pages/admin/EmployeeManagement';
import CustomerManagement from '../pages/admin/CustomerManagement';
import DoctorHome from '../pages/doctor/Home';
import ReceptionistDashboard from '../pages/receptionist/ReceptionistDashboard';
import AppointmentManagement from '../pages/receptionist/AppointmentManagement';
import CheckInManagement from '../pages/receptionist/CheckInManagement';
import NotificationManagement from '../pages/receptionist/NotificationManagement';
import Stats from '../pages/admin/Stats';
import Services from '../pages/admin/Services';
import Reports from '../pages/admin/Reports';
import Settings from '../pages/admin/Settings';
import Logout from '../pages/admin/Logout';
import LoyaltyPage from '../pages/user/LoyaltyPage';
import CustomerMg from '../pages/receptionist/CustomerMg';
import Vouchers from '../pages/admin/VoucherManagement';
import Category  from '../pages/admin/Category';
import ProductManagement from '../pages/admin/ProductManagement'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/loyalty" element={<LoyaltyPage />} />
      <Route path="/voucher" element={<Voucher />} />
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/admin/users" element={<UserManagement />} />
      <Route path="/admin/branches" element={<BranchManagement />} />
      <Route path="/admin/departments" element={<DepartmentManagement />} />
      <Route path="/admin/employees" element={<EmployeeManagement />} />
      <Route path="/admin/customers" element={<CustomerManagement />} />
      <Route path="/admin/stats" element={<Stats />} />
      <Route path="/admin/services" element={<Services />} />
      <Route path="/admin/vouchers" element={<Vouchers />} />
      <Route path="/admin/category" element={<Category />} />
      <Route path="/admin/reports" element={<Reports />} />
      <Route path="/admin/settings" element={<Settings />} />
      <Route path="/admin/logout" element={<Logout />} />
      <Route path="/admin/products" element={<ProductManagement />} />
      <Route path="/doctor" element={<DoctorHome />} />
      <Route path="/receptionist" element={<ReceptionistDashboard />} />
      <Route path="/receptionist/appointments" element={<AppointmentManagement />} />
      <Route path="/receptionist/checkin" element={<CheckInManagement />} />
      <Route path="/receptionist/notifications" element={<NotificationManagement />} />
      <Route path="/receptionist/customers" element={<CustomerMg />} />
    </Routes>
  );
}

export default AppRoutes;