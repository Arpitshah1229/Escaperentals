import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiCreditCard,
} from "react-icons/fi";
import { MdOutlineVilla } from "react-icons/md";
import "./Sidebar.css";

const Sidebar = () => {
  return (

    <div className="admin-nav">
      <NavLink to="/admin" end>
        <FiHome /> Dashboard
      </NavLink>

      <NavLink to="/admin/users">
        <FiUsers /> Users
      </NavLink>

      <NavLink to="/admin/properties">
        <MdOutlineVilla /> Properties
      </NavLink>

      <NavLink to="/admin/bookings">
        <FiCalendar /> Bookings
      </NavLink>

      <NavLink to="/admin/payments">
        <FiCreditCard /> Payments
      </NavLink>
    </div>
    // <aside className="admin-sidebar">
    //   <nav className="sidebar-nav">
    //     <NavLink to="/admin" end>
    //       <FiHome /> Dashboard
    //     </NavLink>

    //     <NavLink to="/admin/users">
    //       <FiUsers /> Users
    //     </NavLink>

    //     <NavLink to="/admin/properties">
    //       <MdOutlineVilla /> Properties
    //     </NavLink>

    //     <NavLink to="/admin/bookings">
    //       <FiCalendar /> Bookings
    //     </NavLink>

    //     <NavLink to="/admin/payments">
    //       <FiCreditCard /> Payments
    //     </NavLink>
    //   </nav>
    // </aside>
  );
};

export default Sidebar;






// import { NavLink } from "react-router-dom";
// import {
//   FiHome,
//   FiUsers,
//   FiCalendar,
//   FiCreditCard,
//   FiLogOut,
// } from "react-icons/fi";
// import { MdOutlineVilla } from "react-icons/md";
// import "./Sidebar.css";

// const Sidebar = () => {
//   return (
//     <aside className="admin-sidebar">
//       {/* Brand */}
//       <div className="sidebar-brand">
//         Escape<span>Rentals</span>
//       </div>

//       {/* Navigation */}
//       <nav className="sidebar-nav">
//         <NavLink to="/admin" end>
//           <FiHome /> Dashboard
//         </NavLink>

//         <NavLink to="/admin/users">
//           <FiUsers /> Users
//         </NavLink>

//         <NavLink to="/admin/properties">
//           <MdOutlineVilla /> Properties
//         </NavLink>

//         <NavLink to="/admin/bookings">
//           <FiCalendar /> Bookings
//         </NavLink>

//         <NavLink to="/admin/payments">
//           <FiCreditCard /> Payments
//         </NavLink>
//       </nav>

//       {/* Logout */}
//       <div className="sidebar-footer">
//         <button className="logout-btn">
//           <FiLogOut /> Logout
//         </button>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;














// import { NavLink } from "react-router-dom";
// import {
//   FiHome,
//   FiUsers,
//   FiCalendar,
//   FiCreditCard,
//   FiLogOut,
// } from "react-icons/fi";
// import { MdOutlineVilla } from "react-icons/md";

// const Sidebar = () => {
//   const linkClass =
//     "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-slate-800 transition";

//   const activeClass = "bg-slate-800 text-white";

//   return (
//     <aside className="w-64 bg-slate-900 min-h-screen fixed left-0 top-0">
//       <div className="p-6 text-white text-2xl font-bold">
//         Escape<span className="text-blue-500">Rentals</span>
//       </div>

//       <nav className="px-3 space-y-2">
//         <NavLink to="/admin" end className={({ isActive }) => `${linkClass} ${isActive && activeClass}`}>
//           <FiHome /> Dashboard
//         </NavLink>

//         <NavLink to="/admin/users" className={({ isActive }) => `${linkClass} ${isActive && activeClass}`}>
//           <FiUsers /> Users
//         </NavLink>

//         <NavLink to="/admin/properties" className={({ isActive }) => `${linkClass} ${isActive && activeClass}`}>
//           <MdOutlineVilla /> Properties
//         </NavLink>

//         <NavLink to="/admin/bookings" className={({ isActive }) => `${linkClass} ${isActive && activeClass}`}>
//           <FiCalendar /> Bookings
//         </NavLink>

//         <NavLink to="/admin/payments" className={({ isActive }) => `${linkClass} ${isActive && activeClass}`}>
//           <FiCreditCard /> Payments
//         </NavLink>
//       </nav>

//       <div className="absolute bottom-6 w-full px-3">
//         <button className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-slate-800 rounded-lg">
//           <FiLogOut /> Logout
//         </button>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;
