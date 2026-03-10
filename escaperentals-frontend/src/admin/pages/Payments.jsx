import { useEffect, useState } from "react";
import api from "../../services/api";
import StatusBadge from "../components/StatusBadge";
import "./Payments.css";

const Payments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    api
      .get("/payments/admin/payments/")
      .then((res) => setPayments(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="admin-payments">
      <h3>All Payments</h3>

      <div className="admin-payments-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Booking</th>
              <th>User</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.booking_id}</td>
                <td>{p.user}</td>
                <td>₹{p.amount}</td>
                <td>{p.method}</td>
                <td>
                  <StatusBadge status={p.status} />
                </td>
                <td>
                  {new Date(p.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
