import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import './Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const bookingId = state?.bookingId;

  if (!bookingId) {
    return (
      <div className="payment-page">
        <p>Invalid payment request.</p>
      </div>
    );
  }

  const handlePayment = () => {
    api.post(`/payments/confirm/${bookingId}/`)
      .then(() => {
        navigate("/payment-success", {
          state: { bookingId }
        });
      })
      .catch(() => alert("Payment failed"));
  };


  return (
    <div className="payment-page">
      <div className="payment-card">
        <h1>Confirm Your Payment</h1>

        <p className="payment-note">
          🔒 This is a demo payment. No real money will be charged.
        </p>

        <div className="payment-summary">
          <div className="row">
            <span>Booking ID</span>
            <strong>#{bookingId}</strong>
          </div>

          <div className="row">
            <span>Payment Method</span>
            <strong>Demo Wallet</strong>
          </div>

          <div className="row">
            <span>Status</span>
            <strong className="pending">Pending</strong>
          </div>
        </div>

        <button className="pay-btn" onClick={handlePayment}>
          Pay & Confirm Booking
        </button>

        <p className="disclaimer">
          By clicking confirm, you agree to our terms and conditions.
        </p>
      </div>
    </div>
  );
};

export default Payment;
