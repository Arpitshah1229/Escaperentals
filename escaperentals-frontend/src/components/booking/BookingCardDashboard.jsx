import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/api";
import "./BookingCardDashboard.css";

export default function BookingCardDashboard({ booking }) {
  const navigate = useNavigate();

  const nights =
    Math.round(
      (new Date(booking.check_out) - new Date(booking.check_in)) /
        (1000 * 60 * 60 * 24)
    ) || 0;

  return (
    <div className="dashboard-booking-card">
      <img
        src={
          booking.property?.images?.length
            ? `${BASE_URL}${booking.property.images[0].image}`
            : "https://via.placeholder.com/300x200"
        }
        alt={booking.property?.title}
      />

      <div className="card-body">
        <div className="card-header">
          <h3>{booking.property?.title}</h3>
          <span className={`status ${booking.status}`}>
            {booking.status.toUpperCase()}
          </span>
        </div>

        <p className="location">📍 {booking.property?.location}</p>

        <p>
          {new Date(booking.check_in).toDateString()} →{" "}
          {new Date(booking.check_out).toDateString()}
        </p>

        <p>{nights} nights{nights > 1 ? "s" : ""}</p>

        <div className="card-footer">
          <strong>₹{booking.total_price}</strong>

          <button
            onClick={() => navigate(`/booking-success/${booking.id}`)}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}
