// import DateRangePicker from "./DateRangePicker"
// import PriceSummary from "./PriceSummary"
// import { useState } from "react"
// import api from "@/services/api"

// export default function BookingCard({ property }) {
//   const [booking, setBooking] = useState({
//     checkIn: null,
//     checkOut: null,
//     nights: 0,
//     isAvailable: null,
//     totalPrice: 0,
//     loading: false,
//     error: null,
//   })

//   const handleDateChange = ({ startDate, endDate }) => {
//     const nights =
//       (endDate - startDate) / (1000 * 60 * 60 * 24)

//     setBooking((prev) => ({
//       ...prev,
//       checkIn: startDate,
//       checkOut: endDate,
//       nights,
//     }))
//   }

//   return (
//     <div className="booking-card">
//       <h3>₹{property.price_per_night} / night</h3>

//       <DateRangePicker onChange={handleDateChange} />

//       {booking.nights > 0 && (
//         <PriceSummary
//           nights={booking.nights}
//           price={property.price_per_night}
//           total={booking.totalPrice}
//           available={booking.isAvailable}
//         />
//       )}

//       <button
//         disabled={!booking.isAvailable}
//         onClick={() => checkAvailability(property.id, booking, setBooking)}
//       >
//         Check Availability
//       </button>
//     </div>
//   )
// }






// import { useState, useEffect } from "react"
// import DateRangePicker from "./DateRangePicker"
// import PriceSummary from "./PriceSummary"
// import api from "../../services/api"
// import "./BookingCard.css"

// export default function BookingCard({ property }) {
//     const [booking, setBooking] = useState({
//         checkIn: null,
//         checkOut: null,
//         nights: 0,
//         isAvailable: null,
//         totalPrice: 0,
//         loading: false,
//         error: null,
//     })

//     const [blockedDates, setBlockedDates] = useState([])
//     useEffect(() => {
//         const loadBlockedDates = async () => {
//             const res = await api.get(
//                 `/properties/${property.id}/booked-dates/`
//             )
//             console.log("BLOCKED DATES FROM API:", res.data)
//             setBlockedDates(res.data)
//         }

//         loadBlockedDates()
//     }, [property.id])

//     // 1️⃣ When user selects dates
//     const handleDateChange = ({ startDate, endDate }) => {
//         const nights =
//             (endDate - startDate) / (1000 * 60 * 60 * 24)

//         setBooking((prev) => ({
//             ...prev,
//             checkIn: startDate,
//             checkOut: endDate,
//             nights,
//             isAvailable: null,
//             totalPrice: 0,
//             error: null,
//         }))
//     }

//     // 2️⃣ Check availability API
//     const checkAvailability = async () => {
//         if (!booking.checkIn || !booking.checkOut) {
//             alert("Please select dates")
//             return
//         }

//         try {
//             setBooking((prev) => ({ ...prev, loading: true }))

//             const res = await api.post("/bookings/check-availability/", {
//                 property: property.id,
//                 check_in: booking.checkIn.toISOString().split("T")[0],
//                 check_out: booking.checkOut.toISOString().split("T")[0],
//             })

//             setBooking((prev) => ({
//                 ...prev,
//                 isAvailable: res.data.available,
//                 totalPrice: res.data.total_price,
//                 loading: false,
//             }))
//         } catch (err) {
//             setBooking((prev) => ({
//                 ...prev,
//                 error: "Not available for selected dates",
//                 loading: false,
//             }))
//         }
//     }

//     // 3️⃣ Create booking API (STEP 6)
//     const createBooking = async () => {
//         try {
//             setBooking((prev) => ({ ...prev, loading: true }))

//             await api.post("/bookings/create/", {
//                 property: property.id,
//                 check_in: booking.checkIn.toISOString().split("T")[0],
//                 check_out: booking.checkOut.toISOString().split("T")[0],
//                 guests: 1
//             })

//             alert("Booking created successfully")
//         } catch (err) {
//             setBooking((prev) => ({
//                 ...prev,
//                 error: "Please login or booking failed",
//                 loading: false,
//             }))
//         }
//     }
    

//     return (
//         <div className="booking-card">
//             <h3>₹{property.price_per_night} / night</h3>

//             <DateRangePicker onChange={handleDateChange} blockedDates={blockedDates} />

//             {booking.nights > 0 && (
//                 <PriceSummary
//                     nights={booking.nights}
//                     price={property.price_per_night}
//                     total={booking.totalPrice}
//                     available={booking.isAvailable}
//                 />
//             )}

//             {/* Availability message */}
//             {booking.isAvailable === false && (
//                 <p style={{ color: "red" }}>
//                     Not available for selected dates
//                 </p>
//             )}

//             {/* Check availability button */}
//             <button
//                 onClick={checkAvailability}
//                 disabled={booking.loading || booking.nights === 0}
//             >
//                 {booking.loading ? "Checking..." : "Check Availability"}
//             </button>

//             {/* Reserve button (only when available) */}
//             {booking.isAvailable && (
//                 <button
//                     onClick={createBooking}
//                     disabled={booking.loading}
//                     style={{ marginTop: "10px" }}
//                 >
//                     {booking.loading ? "Booking..." : "Reserve"}
//                 </button>
//             )}

//             {booking.error && (
//                 <p style={{ color: "red" }}>{booking.error}</p>
//             )}
//         </div>
//     )
// }






import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DateRangePicker from "./DateRangePicker";
import PriceSummary from "./PriceSummary";
import api from "../../services/api";
import "./BookingCard.css";

export default function BookingCard({ property }) {
  const navigate = useNavigate();

  const [booking, setBooking] = useState({
    checkIn: null,
    checkOut: null,
    nights: 0,
    isAvailable: null,
    totalPrice: 0,
    loading: false,
    error: null,
  });

  const [blockedDates, setBlockedDates] = useState([]);

  // 🔹 Load blocked dates
  useEffect(() => {
    const loadBlockedDates = async () => {
      try {
        const res = await api.get(
          `/properties/${property.id}/booked-dates/`
        );
        console.log("BLOCKED DATES FROM API:", res.data);
        setBlockedDates(res.data);
      } catch (err) {
        console.error("Error loading blocked dates", err);
      }
    };

    loadBlockedDates();
  }, [property.id]);

  // 🔹 When user selects dates
  const handleDateChange = ({ startDate, endDate }) => {
    if (!startDate || !endDate) return;

    const nights =
      (endDate - startDate) / (1000 * 60 * 60 * 24);

    setBooking((prev) => ({
      ...prev,
      checkIn: startDate,
      checkOut: endDate,
      nights,
      isAvailable: null,
      totalPrice: 0,
      error: null,
    }));
  };

  // 🔹 Check availability
  const checkAvailability = async () => {
    if (!booking.checkIn || !booking.checkOut) {
      alert("Please select dates");
      return;
    }

    try {
      setBooking((prev) => ({ ...prev, loading: true }));

      const res = await api.post("/bookings/check-availability/", {
        property: property.id,
        check_in: booking.checkIn.toISOString().split("T")[0],
        check_out: booking.checkOut.toISOString().split("T")[0],
      });

      setBooking((prev) => ({
        ...prev,
        isAvailable: res.data.available,
        totalPrice: res.data.total_price,
        loading: false,
      }));
    } catch (err) {
      setBooking((prev) => ({
        ...prev,
        error: "Not available for selected dates",
        isAvailable: false,
        loading: false,
      }));
    }
  };

  // 🔹 Reserve → Navigate to Booking Page
  const handleReserve = () => {
    if (!booking.checkIn || !booking.checkOut) {
      alert("Please select dates");
      return;
    }

    navigate(`/booking/${property.id}`, {
      state: {
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        nights: booking.nights,
        totalPrice: booking.totalPrice,
      },
    });
  };

  return (
    <div className="booking-card">
      <h3>₹{property.price_per_night} / night</h3>

      <DateRangePicker
        onChange={handleDateChange}
        blockedDates={blockedDates}
      />

      {booking.nights > 0 && (
        <PriceSummary
          nights={booking.nights}
          price={property.price_per_night}
          total={booking.totalPrice}
          available={booking.isAvailable}
        />
      )}

      {booking.isAvailable === false && (
        <p style={{ color: "red" }}>
          Not available for selected dates
        </p>
      )}

      <button
        onClick={checkAvailability}
        disabled={booking.loading || booking.nights === 0}
      >
        {booking.loading ? "Checking..." : "Check Availability"}
      </button>

      {booking.isAvailable && (
        <button
          onClick={handleReserve}
          style={{ marginTop: "10px" }}
        >
          Reserve
        </button>
      )}

      {booking.error && (
        <p style={{ color: "red" }}>{booking.error}</p>
      )}
    </div>
  );
}
