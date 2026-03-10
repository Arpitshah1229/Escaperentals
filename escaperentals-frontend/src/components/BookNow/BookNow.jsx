
import "./BookNow.css";
import { useNavigate } from "react-router-dom";

function BookNow() {
  const navigate = useNavigate();

  return (
    <section className="booknow-section">
      <div className="booknow-content">
        <h2>Modern Apartment</h2>
        <h3>₹2000 <span>at night</span></h3>

        <p>
          Experience comfort and style in our modern apartments.
          Perfect for short stays, vacations, and business trips.
        </p>

        <button onClick={() => navigate("/properties")}>
          Book Now
        </button>
      </div>
    </section>
  );
}

export default BookNow;
