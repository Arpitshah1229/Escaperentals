import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentSuccess.css";

const PaymentSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const bookingId = state?.bookingId;

  return (
    <div className="success-page">
      <div className="success-card">
        {/* Check Icon */}
        <div className="check">✓</div>

        {/* Heading */}
        <h1>Booking Confirmed!</h1>
        <p className="subtitle">
          Your payment was successful. Your booking is now confirmed.
        </p>

        {/* Actions */}
        <div className="actions">
          <button onClick={() => navigate(`/bookings/${bookingId}`)}>
            View Booking
          </button>

          <button
            className="secondary"
            onClick={() => navigate("/dashboard/bookings")}
          >
            My Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;




// import { useLocation, Link } from "react-router-dom";
// import "./PaymentSuccess.css";

// const PaymentSuccess = () => {
//   const { state } = useLocation();

//   return (
//     <div className="payment-success">
//       <h2>🎉 Booking Confirmed!</h2>
//       <p>Your payment was successful.</p>

//       <Link to={`/bookings/${state?.bookingId}`}>
//         View Booking
//       </Link>
//     </div>
//   );
// };

// export default PaymentSuccess;
