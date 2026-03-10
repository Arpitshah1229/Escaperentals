import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api, { BASE_URL } from "../services/api";
import "./BookingSuccess.css";

export default function BookingSuccess() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await api.get(`/bookings/${bookingId}/`);
        setBooking(res.data);
      } catch (err) {
        setError("Unable to load booking details");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (loading) return <p style={{ padding: 24 }}>Loading confirmation…</p>;
  if (error) return <p style={{ padding: 24, color: "red" }}>{error}</p>;
  if (!booking) return null;

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="check">✓</div>

        <h1>Booking Confirmed!</h1>
        <p className="subtitle">
          Your reservation has been successfully created.
        </p>

        <div className="summary">
          <img
            src={
              booking.property?.images?.length
                ? `${BASE_URL}${booking.property.images[0].image}`
                : "https://via.placeholder.com/400x250"
            }
            alt={booking.property?.title}
          />

          <div className="details">
            <h2>{booking.property?.title}</h2>
            <p>📍 {booking.property?.location}</p>

            <p>
              <strong>Check-in:</strong>{" "}
              {new Date(booking.check_in).toDateString()}
            </p>
            <p>
              <strong>Check-out:</strong>{" "}
              {new Date(booking.check_out).toDateString()}
            </p>

            <p>
              <strong>Nights:</strong>{" "}
              {booking.nights ??
                Math.round(
                  (new Date(booking.check_out) -
                    new Date(booking.check_in)) /
                    (1000 * 60 * 60 * 24)
                )}
            </p>

            <p className="total">
              Total Paid: ₹{booking.total_price}
            </p>
          </div>
        </div>

        <div className="actions">
          <button onClick={() => navigate("/dashboard/bookings")}>
            View My Bookings
          </button>

          <button
            className="secondary"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
