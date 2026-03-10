import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api, { BASE_URL } from "../services/api";
import "./BookingPage.css";

export default function BookingPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("access");

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // ⬅️ Data passed from property page
  const { checkIn, checkOut, nights, totalPrice } = location.state || {};

  // 🔐 Enforce login
  useEffect(() => {
    if (!token) {
      navigate("/login", {
        state: { from: `/booking/${id}` },
      });
    }
  }, [token, navigate, id]);

  // 🚨 Prevent direct access
  useEffect(() => {
    if (!checkIn || !checkOut) {
      navigate(`/properties/${id}`);
    }
  }, [checkIn, checkOut, navigate, id]);

  // 🏠 Fetch property
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/properties/${id}/`);
        setProperty(res.data);
      } catch (err) {
        console.error("Error loading property", err);
        setError("Failed to load property");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  // ✅ Create booking
  const handleConfirmBooking = async () => {
    try {
      setSubmitting(true);

      const res = await api.post("/bookings/create/", {
        property: id,
        check_in: new Date(checkIn).toISOString().split("T")[0],
        check_out: new Date(checkOut).toISOString().split("T")[0],
        guests: 1,
      });

      // if (res.status === 201) {
      //   navigate(`/booking-success/${res.data.id}`);
      // }
      if (res.status === 201) {
        navigate("/payment", {
          state: { bookingId: res.data.id }
        });
      }
    } catch (err) {
      console.error(err);
      setError("Booking failed. Please try again.");
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading booking...</p>;
  if (!property) return <p>Property not found</p>;

  return (
    <div className="booking-page">
      <h1>Confirm your booking</h1>

      <div className="booking-layout">
        {/* LEFT */}
        <div className="booking-left">
          <img
            src={
              property.images?.length
                ? property.images[0].image
                : "https://via.placeholder.com/400x250"
            }
            alt={property.title}
          />

          <h2>{property.title}</h2>
          <p>📍 {property.location}</p>

          <p>
            <strong>Check-in:</strong>{" "}
            {new Date(checkIn).toDateString()}
          </p>
          <p>
            <strong>Check-out:</strong>{" "}
            {new Date(checkOut).toDateString()}
          </p>
          <p>
            <strong>Nights:</strong> {nights}
          </p>
        </div>

        {/* RIGHT */}
        <div className="booking-right">
          <h3>Price Summary</h3>

          <p>
            ₹{property.price_per_night} × {nights} nights
          </p>
          <h2>Total: ₹{totalPrice}</h2>

          <button
            onClick={handleConfirmBooking}
            disabled={submitting}
          >
            {submitting ? "Booking..." : "Confirm Booking"}
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </div>
    </div>
  );
}
