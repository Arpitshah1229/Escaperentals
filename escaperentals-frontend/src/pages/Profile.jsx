import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import "./Profile.css";
import { createPortal } from "react-dom";


export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  // Fetch bookings
  useEffect(() => {
    api
      .get("/bookings/my-bookings/")
      .then((res) => setBookings(res.data))
      .finally(() => setLoading(false));
  }, []);

  // Open cancel modal
  const openCancelModal = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowCancelModal(true);
  };

  // Confirm cancellation
  const confirmCancelBooking = async () => {
    try {
      await api.put(`/bookings/cancel/${selectedBookingId}/`);

      // Update UI instantly
      setBookings((prev) =>
        prev.map((b) =>
          b.id === selectedBookingId ? { ...b, status: "cancelled" } : b
        )
      );

      setShowCancelModal(false);
      setSelectedBookingId(null);
    } catch {
      alert("Failed to cancel booking");
    }
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="container mt-5">
      <h1>My Profile</h1>

      {/* PROFILE INFO */}
      <div className="profile-card">
        <p><b>Username:</b> {user.username}</p>
        <p><b>Name:</b> {user.first_name} {user.last_name}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Role:</b> {user.role}</p>
      </div>

      <hr />

      {/* BOOKINGS */}
      <h2>My Bookings</h2>

      {loading ? (
        <p>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.property?.title}</td>
                <td>{b.check_in}</td>
                <td>{b.check_out}</td>
                <td>₹{b.total_price}</td>

                <td>
                  <span className={`status-badge status-${b.status}`}>
                    {b.status}
                  </span>
                </td>

                <td>
                  <button
                    className="view-btn"
                    onClick={() => navigate(`/bookings/${b.id}`)}
                  >
                    View
                  </button>

                  {b.status !== "cancelled" && (
                    <button
                      className="cancel-btn"
                      onClick={() => openCancelModal(b.id)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showCancelModal &&
        createPortal(
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 999999,
            }}
            onClick={() => setShowCancelModal(false)}
          >
            <div
              style={{
                background: "#fff",
                padding: "24px",
                borderRadius: "14px",
                width: "380px",
                maxWidth: "90%",
                boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 style={{ marginBottom: "10px" }}>Cancel Booking</h3>
              <p style={{ marginBottom: "20px", color: "#555" }}>
                Are you sure you want to cancel this booking?
              </p>

              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    background: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowCancelModal(false)}
                >
                  Go Back
                </button>

                <button
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: "8px",
                    border: "none",
                    background: "#ef4444",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={confirmCancelBooking}
                >
                  Yes, Cancel Booking
                </button>
              </div>
            </div>
          </div>,
          document.getElementById("modal-root")
        )}
    </div>
  );
}



// import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import api from "../services/api";
// import "./Profile.css";

// export default function Profile() {
//   const { user } = useAuth();
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [showCancelModal, setShowCancelModal] = useState(false);
//   const [selectedBookingId, setSelectedBookingId] = useState(null);


//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = () => {
//     api
//       .get("/bookings/my-bookings/")
//       .then((res) => setBookings(res.data))
//       .finally(() => setLoading(false));
//   };

//   const cancelBooking = async (bookingId) => {
//     // if (!window.confirm("Are you sure you want to cancel this booking?")) {
//     //   return;
//     // }

//     try {
//       await api.put(`/bookings/cancel/${bookingId}/`);

//       // Update UI instantly
//       setBookings((prev) =>
//         prev.map((b) =>
//           b.id === bookingId ? { ...b, status: "cancelled" } : b
//         )
//       );
//     } catch {
//       alert("Failed to cancel booking");
//     }
//   };

//   if (!user) return <p>Loading...</p>;

//   return (
//     <div className="container mt-5">
//       <h1>My Profile</h1>

//       {/* PROFILE INFO */}
//       <div className="profile-card">
//         <p><b>Username:</b> {user.username}</p>
//         <p><b>Name:</b> {user.first_name} {user.last_name}</p>
//         <p><b>Email:</b> {user.email}</p>
//         <p><b>Role:</b> {user.role}</p>
//       </div>

//       <hr />

//       {/* BOOKINGS */}
//       <h2>My Bookings</h2>

//       {loading ? (
//         <p>Loading bookings...</p>
//       ) : bookings.length === 0 ? (
//         <p>No bookings yet</p>
//       ) : (
//         <table className="bookings-table">
//           <thead>
//             <tr>
//               <th>Property</th>
//               <th>Check In</th>
//               <th>Check Out</th>
//               <th>Total</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {bookings.map((b) => (
//               <tr key={b.id}>
//                 <td>{b.property?.title}</td>
//                 <td>{b.check_in}</td>
//                 <td>{b.check_out}</td>
//                 <td>₹{b.total_price}</td>

//                 <td>
//                   <span className={`status-badge status-${b.status}`}>
//                     {b.status}
//                   </span>
//                 </td>

//                 <td>
//                   {b.status !== "cancelled" ? (
//                     <button
//                       className="cancel-btn"
//                       onClick={() => openCancelModal(b.id)}
//                     >
//                       Cancel
//                     </button>
//                   ) : (
//                     <span className="muted">—</span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }
