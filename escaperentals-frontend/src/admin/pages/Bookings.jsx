import { useEffect, useState } from "react";
import api from "../../services/api";
import StatusBadge from "../components/StatusBadge";
import "./Booking.css";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = () => {
    api
      .get("/bookings/admin/bookings/")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = (id, status) => {
    api
      .post(`/bookings/admin/bookings/${id}/status/`, { status })
      .then(() => fetchBookings());
  };

  return (
    <div className="admin-bookings">
      <h3>All Bookings</h3>

      <div className="admin-bookings-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Property</th>
              <th>User</th>
              <th>Dates</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.property}</td>
                <td>{b.user}</td>
                <td>
                  {b.check_in} → {b.check_out}
                </td>
                <td>₹{b.amount}</td>
                <td>
                  <StatusBadge status={b.status} />
                </td>
                <td className="booking-actions">
                  {b.status === "pending" && (
                    <>
                      <button
                        className="btn-confirm"
                        onClick={() =>
                          updateStatus(b.id, "confirmed")
                        }
                      >
                        Confirm
                      </button>

                      <button
                        className="btn-cancel"
                        onClick={() =>
                          updateStatus(b.id, "cancelled")
                        }
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;




// import { useEffect, useState } from "react";
// import api from "../../services/api";
// import StatusBadge from "../components/StatusBadge";
// import "./AdminBookings.css";

// const Bookings = () => {
//  const [bookings, setBookings] = useState([]);

//   const fetchBookings = () => {
//     api
//       .get("/bookings/admin/bookings/")
//       .then((res) => setBookings(res.data))
//       .catch((err) => console.error(err));
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const updateStatus = (id, status) => {
//     api
//       .post(`/bookings/admin/bookings/${id}/status/`, { status })
//       .then(() => fetchBookings());
//   };
//   return (
//     <div className="bg-white rounded-xl shadow-sm p-6">
//       <h2 className="text-lg font-semibold mb-4">Bookings</h2>

//       <table className="w-full text-sm">
//         <thead className="text-gray-500 border-b">
//           <tr>
//             <th className="py-2">Property</th>
//             <th>Guest</th>
//             <th>Amount</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bookings.map(b => (
//             <tr key={b.id} className="border-b">
//               <td className="py-3">{b.property}</td>
//               <td>{b.guest}</td>
//               <td>₹{b.amount}</td>
//               <td><StatusBadge status={b.status} /></td>
//               <td className="space-x-2">
//                 <button className="text-green-600 text-xs">Confirm</button>
//                 <button className="text-red-500 text-xs">Cancel</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Bookings;
