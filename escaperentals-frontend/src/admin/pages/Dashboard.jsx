import { useEffect, useState } from "react";
import api from "../../services/api";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import {
  FiUsers,
  FiHome,
} from "react-icons/fi";
import {FiCalendar,} from "react-icons/fi"

import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    api
      .get("/bookings/admin/dashboard/")
      .then((res) => {
        setStats(res.data.stats);
        setBookings(res.data.recent_bookings);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (!stats) return <p>Unable to load dashboard</p>;

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <StatCard
          title="Total Users"
          value={stats.users}
          icon={<FiUsers />}
        />

        <StatCard
          title="Properties"
          value={stats.properties}
          icon={<FiHome />}
        />

        <StatCard
          title="Bookings"
          value={stats.bookings}
          icon={<FiCalendar />}
        />

        <StatCard
          title="Revenue"
          value={formatCurrency(stats.revenue)}
          icon={<span style={{ fontWeight: 700 }}>₹</span>}
        />
      </div>

      {/* Recent Bookings */}
      <div className="dashboard-table">
        <h3>Recent Bookings</h3>

        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Guest</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.property}</td>
                <td>{b.guest}</td>
                <td>{formatCurrency(b.amount)}</td>
                <td>
                  <StatusBadge status={b.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;







// import StatCard from "../components/StatCard";
// import api from "../../services/api";
// import { FiUsers, FiHome, FiCalendar, FiDollarSign } from "react-icons/fi";
// import StatusBadge from "../components/StatusBadge";
// import { useEffect, useState } from "react";

// const Dashboard = () => {
//     const [stats, setStats] = useState(null);
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const formatCurrency = (amount) => {
//         return new Intl.NumberFormat("en-IN", {
//             style: "currency",
//             currency: "INR",
//             maximumFractionDigits: 0,
//         }).format(amount);
//     };

//     useEffect(() => {
//         api.get("/bookings/admin/dashboard/")
//             .then(res => {
//                 setStats(res.data.stats);
//                 setBookings(res.data.recent_bookings);
//             })
//             .catch(err => console.error(err))
//             .finally(() => setLoading(false));
//     }, []);

//     if (loading) return <p>Loading dashboard...</p>;
//     if (!stats) return <p>Unable to load dashboard</p>;

//     return (
//         <>
//             {/* Stats */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//                 <StatCard title="Total Users" value={stats.users} icon={<FiUsers />} />
//                 <StatCard title="Properties" value={stats.properties} icon={<FiHome />} />
//                 <StatCard title="Bookings" value={stats.bookings} icon={<FiCalendar />} />
//                 <StatCard title="Revenue" value={`₹${stats.revenue}`} /><p>{formatCurrency(stats.revenue)}</p>
//             </div>

//             {/* Recent Bookings */}
//             <div className="bg-white rounded-xl shadow-sm p-6">
//                 <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>

//                 <table className="w-full text-sm">
//                     <thead className="text-left text-gray-500 border-b">
//                         <tr>
//                             <th className="py-2">Property</th>
//                             <th>Guest</th>
//                             <th>Amount</th>
//                             <th>Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {bookings.map(b => (
//                             <tr key={b.id} className="border-b last:border-0">
//                                 <td className="py-3">{b.property}</td>
//                                 <td>{b.guest}</td>
//                                 <td>₹{b.amount}</td>
//                                 <td><StatusBadge status={b.status} /></td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </>
//     );
// };

// export default Dashboard;
