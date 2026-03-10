import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./HostBookings.css";
import { Link } from "react-router-dom";

export default function HostBookings() {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    // useEffect(() => {
    //     api.get("/bookings/host/bookings/")
    //         .then(res => setBookings(res.data))
    //         .catch(() => { });
    // }, []);

    // const approveBooking = async (id) => {
    //     try {
    //         await api.put(`/bookings/host/bookings/${id}/approve/`)
    //         fetchBookings() // refresh list
    //     } catch (err) {
    //         alert("Failed to approve booking")
    //     }
    // }

    // const rejectBooking = async (id) => {
    //     try {
    //         await api.put(`/bookings/host/bookings/${id}/reject/`)
    //         fetchBookings()
    //     } catch (err) {
    //         alert("Failed to reject booking")
    //     }
    // }


    const fetchBookings = async () => {
        try {
            const res = await api.get("/bookings/host/bookings/");
            setBookings(res.data);
        } catch (err) {
            console.error("Failed to load host bookings");
        }
    };
    useEffect(() => {
        fetchBookings();
    }, []);



    const approveBooking = async (id) => {
        try {
            await api.put(`/bookings/host/bookings/${id}/approve/`);
            fetchBookings();
        } catch (err) {
            console.error(err.response?.data);
            alert("Failed to approve booking");
        }
    };

    const rejectBooking = async (id) => {
        try {
            await api.put(`/bookings/host/bookings/${id}/reject/`);
            fetchBookings();
        } catch (err) {
            console.error(err.response?.data);
            alert("Failed to reject booking");
        }
    };




    return (
        <div className="container">
            <h1>Host Dashboard — Bookings</h1>

            <Link to="/host/dashboard/properties">
                My Properties
            </Link>

            <button
                className="primary-btn"
                onClick={() => navigate("/host/add-property")}
            >
                + Add New Property
            </button>

            {bookings.length === 0 ? (
                <p>No bookings yet.</p>
            ) : (
                <table className="bookings-table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Guest</th>
                            <th>Dates</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map(b => (
                            <tr key={b.id}>
                                <td>{b.property.title || "—"}</td>
                                <td>{b.user?.username || "—"}</td>
                                <td>
                                    {b.check_in} → {b.check_out}
                                </td>
                                <td>₹{b.total_price}</td>
                                <td>
                                    <span className={`status-badge status-${b.status}`}>
                                        {b.status}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        onClick={() => navigate(`/bookings/${b.id}`)}
                                        className="view-btn"
                                    >
                                        View
                                    </button>
                                    {b.status === "pending" && (
                                        <>
                                            <button onClick={() => approveBooking(b.id, "confirmed")}>
                                                Approve
                                            </button>

                                            <button onClick={() => rejectBooking(b.id, "cancelled")}>
                                                Reject
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
