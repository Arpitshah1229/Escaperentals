import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import { Outlet, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();

  const pageTitles = {
    "/admin": "Dashboard",
    "/admin/users": "Users",
    "/admin/properties": "Properties",
    "/admin/bookings": "Bookings",
    "/admin/payments": "Payments",
  };

  return (
    <div className="admin-layout">
      <Sidebar />

      <div className="admin-main">
        <Header title={pageTitles[location.pathname] || "Admin"} />

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
