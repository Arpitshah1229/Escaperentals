import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import BookingPage from "./pages/BookingPage";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import BookingSuccess from "./pages/BookingSuccess";
import MyBookings from "./pages/MyBookings";
import BookingDetail from "./pages/BookingDetail";
import HostBookings from "./pages/HostBookings";
import BlogDetail from "./pages/BlogDetail";

import AddProperty from "./pages/AddProperty";
import HostProperties from "./pages/HostProperties";

import AdminProtectedRoute from "./admin/AdminProtectedRoute";

import AdminLayout from "./admin/layout/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import Users from "./admin/pages/Users";
import AdminProperties from "./admin/pages/AdminProperties";
import Bookings from "./admin/pages/Bookings";
import Payments from "./admin/pages/Payments";
import EditProperty from "./pages/EditProperty";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/blogs/:slug" element={<BlogDetail />} />
        <Route path="/booking-success/:bookingId" element={<BookingSuccess />} />
        <Route path="bookings/:id" element={<BookingDetail />} />
        <Route path="/dashboard/bookings" element={<MyBookings />} />
        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/host/add-property" element={<ProtectedRoute role="host"><AddProperty /></ProtectedRoute>} />

        <Route path="/host/dashboard" element={<ProtectedRoute role="host"><HostBookings /></ProtectedRoute>} />
        <Route path="/host/dashboard/properties" element={<HostProperties />} />
        <Route path="/host/dashboard/properties/:id/edit" element={<EditProperty />} />


        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="properties" element={<AdminProperties />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="payments" element={<Payments />} />
          </Route>
        </Route >



        <Route path="*" element={<NotFound />} />
      </Routes>



      <Footer />
    </Router>
  );
}

export default App;

