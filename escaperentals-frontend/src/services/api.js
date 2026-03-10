// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://127.0.0.1:8000/api/",
// });

// export const BASE_URL = "http://127.0.0.1:8000";
// // later we’ll add token here

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("access")
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })
// export default API;






import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8000";

/* Public API (NO AUTH) */
export const PublicAPI = axios.create({
  baseURL: `${BASE_URL}/api/`,
});

/* Auth API */
const API = axios.create({
  baseURL: `${BASE_URL}/api/`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;










// export const checkAvailability = async (
//   propertyId,
//   booking,
//   setBooking
// ) => {
//   try {
//     setBooking((prev) => ({ ...prev, loading: true }))

//     const res = await api.post(
//       `/bookings/check-availability/`,
//       {
//         property: propertyId,
//         check_in: booking.checkIn.toISOString().split("T")[0],
//         check_out: booking.checkOut.toISOString().split("T")[0],
//       }
//     )

//     setBooking((prev) => ({
//       ...prev,
//       isAvailable: res.data.available,
//       totalPrice: res.data.total_price,
//       loading: false,
//     }))
//   } catch (err) {
//     setBooking((prev) => ({
//       ...prev,
//       error: "Not available",
//       loading: false,
//     }))
//   }
// }
