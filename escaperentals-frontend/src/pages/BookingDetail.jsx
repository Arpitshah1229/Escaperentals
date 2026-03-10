// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../services/api";

// export default function BookingDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [booking, setBooking] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api
//       .get(`/bookings/${id}/`)
//       .then((res) => setBooking(res.data))
//       .finally(() => setLoading(false));
//   }, [id]);

//   if (loading) return <p>Loading booking...</p>;
//   if (!booking) return <p>Booking not found</p>;

//   return (
//     <div className="container mt-5">
//       <button onClick={() => navigate(-1)}>← Back</button>

//       <h1>Booking Details</h1>

//       <div className="profile-card">
//         <p><b>Property:</b> {booking.property?.title}</p>
//         <p><b>Location:</b> {booking.property?.location}</p>
//         <p><b>Check In:</b> {booking.check_in}</p>
//         <p><b>Check Out:</b> {booking.check_out}</p>
//         <p><b>Guests:</b> {booking.guests}</p>
//         <p><b>Total Price:</b> ₹{booking.total_price}</p>
//         <p>
//           <b>Status:</b>{" "}
//           <span className={`status-badge status-${booking.status}`}>
//             {booking.status}
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }





// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api, { BASE_URL } from "../services/api";
// import "./BookingDetail.css";

// export default function BookingDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [booking, setBooking] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     api.get(`/bookings/${id}/`)
//       .then((res) => setBooking(res.data))
//       .finally(() => setLoading(false));
//   }, [id]);

//   if (loading) return <p className="loading">Loading booking...</p>;
//   if (!booking) return <p className="loading">Booking not found</p>;

//   const property = booking.property;
//   const imageUrl =
//     property?.images?.length > 0
//       ? `${BASE_URL}${property.images[0].image}`
//       : "https://via.placeholder.com/900x600";

//   return (
//     <div className="booking-detail-page">
//       <button className="back-btn" onClick={() => navigate(-1)}>
//         ← Back to My Bookings
//       </button>

//       <div className="booking-detail-card">
//         {/* LEFT */}
//         <div className="booking-left">
//           <img src={imageUrl} alt={property?.title} />

//           <h1>{property?.title}</h1>
//           <p className="location">📍 {property?.location}</p>

//           <div className="info-grid">
//             <div>
//               <span>Check-in</span>
//               <strong>{booking.check_in}</strong>
//             </div>
//             <div>
//               <span>Check-out</span>
//               <strong>{booking.check_out}</strong>
//             </div>
//             <div>
//               <span>Guests</span>
//               <strong>{booking.guests}</strong>
//             </div>
//             <div>
//               <span>Status</span>
//               <strong className={`status ${booking.status}`}>
//                 {booking.status}
//               </strong>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="booking-right">
//           <h3>Price Summary</h3>

//           <div className="price-row">
//             <span>Total Amount</span>
//             <strong>₹{booking.total_price}</strong>
//           </div>

//           <p className="note">
//             This booking is currently <b>{booking.status}</b>.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import api, { BASE_URL } from "../services/api";
// import "./BookingDetail.css";

// export default function BookingDetail() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { user } = useAuth();

//     const [booking, setBooking] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (!user) return;

//         setLoading(true);

//         // 🔥 IMPORTANT FIX — choose API based on role
//         const endpoint =
//             user.role === "host"
//                 ? `/bookings/host/bookings/${id}/`
//                 : `/bookings/${id}/`;

//         api
//             .get(endpoint)
//             .then((res) => {
//                 setBooking(res.data);
//             })
//             .catch(() => {
//                 setBooking(null);
//             })
//             .finally(() => {
//                 setLoading(false);
//             });
//     }, [id, user]);

//     if (loading) return <p className="loading">Loading booking...</p>;
//     if (!booking) return <p className="loading">Booking not found</p>;

//     const property = booking.property;

//     const imageUrl =
//         property?.images?.length > 0
//             ? `${BASE_URL}${property.images[0].image}`
//             : "https://via.placeholder.com/900x600";
//     // const hasImage = property?.images && property.images.length > 0;

//     return (
//         <div className="booking-detail-page">
//             <button className="back-btn" onClick={() => navigate(-1)}>
//                 ← Back
//             </button>

//             <div className="booking-detail-card">
//                 {/* LEFT SIDE */}
//                 <div className="booking-left">
//                     <img src={imageUrl} alt={property?.title} />
//                     {/* {hasImage && (
//                         <img
//                             src={`${BASE_URL}${property.images[0].image}`}
//                             alt={property?.title}
//                         />
//                     )} */}


//                     <h1>{property?.title}</h1>
//                     <p className="location">📍 {property?.location}</p>

//                     <div className="info-grid">
//                         <div>
//                             <span>Check-in</span>
//                             <strong>{booking.check_in}</strong>
//                         </div>

//                         <div>
//                             <span>Check-out</span>
//                             <strong>{booking.check_out}</strong>
//                         </div>

//                         <div>
//                             <span>Guests</span>
//                             <strong>{booking.guests}</strong>
//                         </div>

//                         <div>
//                             <span>Status</span>
//                             <strong className={`status ${booking.status}`}>
//                                 {booking.status}
//                             </strong>
//                         </div>
//                     </div>
//                 </div>

//                 {/* RIGHT SIDE */}
//                 <div className="booking-right">
//                     <h3>Price Summary</h3>

//                     <div className="price-row">
//                         <span>Total Amount</span>
//                         <strong>₹{booking.total_price}</strong>
//                     </div>

//                     <p className="note">
//                         This booking is currently <b>{booking.status}</b>.
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api, { BASE_URL } from "../services/api";
import "./BookingDetail.css";

export default function BookingDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        setLoading(true);

        const endpoint =
            user.role === "host"
                ? `/bookings/host/bookings/${id}/`
                : `/bookings/${id}/`;

        api
            .get(endpoint)
            .then((res) => setBooking(res.data))
            .catch(() => setBooking(null))
            .finally(() => setLoading(false));
    }, [id, user]);

    if (loading) return <p className="loading">Loading booking...</p>;
    if (!booking) return <p className="loading">Booking not found</p>;

    /* 🔥 NORMALIZE PROPERTY SAFELY */
    const property =
        typeof booking.property === "object"
            ? booking.property
            : null;

    const title = property?.title || "Property";
    const location = property?.location || "—";

    const hasImage =
        property?.images &&
        Array.isArray(property.images) &&
        property.images.length > 0;

    return (
        <div className="booking-detail-page">
            <button className="back-btn" onClick={() => navigate(-1)}>
                ← Back
            </button>

            <div className="booking-detail-card">
                {/* LEFT */}
                <div className="booking-left">
                    {/* Image */}
                    <div className="booking-image-wrapper">
                        {hasImage ? (
                            <img
                                src={`${BASE_URL}${property.images[0].image}`}
                                alt={title}
                            />
                        ) : (
                            <div className="image-empty">
                                No image available
                            </div>
                        )}
                    </div>

                    {/* Header */}
                    <div className="booking-header">
                        <h1>{title}</h1>
                        <p className="location">📍 {location}</p>
                    </div>

                    {/* Info */}
                    <div className="info-grid">
                        <div>
                            <span>Check-in</span>
                            <strong>{booking.check_in}</strong>
                        </div>

                        <div>
                            <span>Check-out</span>
                            <strong>{booking.check_out}</strong>
                        </div>

                        <div>
                            <span>Guests</span>
                            <strong>{booking.guests}</strong>
                        </div>

                        <div>
                            <span>Status</span>
                            <strong className={`status ${booking.status}`}>
                                {booking.status}
                            </strong>
                        </div>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="booking-right">
                    <h3>Price Summary</h3>

                    <div className="price-row">
                        <span>Total Amount</span>
                        <strong>₹{booking.total_price}</strong>
                    </div>

                    <p className="note">
                        This booking is currently <b>{booking.status}</b>.
                    </p>
                </div>
            </div>
        </div>
    );
}
