import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { BASE_URL } from "../services/api";
import "./HostProperties.css";

function HostProperties() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/properties/my-properties/")
      .then((res) => setProperties(res.data))
      .catch((err) => console.error("Host properties error:", err));
  }, []);

  return (
    <div className="host-properties-page">
      <div className="page-header">
        <h1>My Properties</h1>

        <button
          className="primary-btn"
          onClick={() => navigate("/host/add-property")}
        >
          + Add Property
        </button>
      </div>

      {properties.length === 0 ? (
        <p className="empty-text">No properties added yet.</p>
      ) : (
        <div className="properties-grid" >
          {properties.map((property) => (
            <div key={property.id} className="property-card">
              {/* onClick={() => navigate(`/properties/${property.id}`)} */}
              <img
                src={property.images?.[0]?.image}
                alt={property.title}
                onError={(e) => e.target.src = "/placeholder.jpg"}
                onClick={() => navigate(`/properties/${property.id}`)}
              />

              <div className="card-body">
                <h3 onClick={() => navigate(`/properties/${property.id}`)} style={{ cursor: "pointer" }}>
                  {property.title}</h3>
                <p>{property.location}</p>

                <div className="card-meta">
                  <span>₹{property.price_per_night}/night</span>
                  <span className={`status ${property.is_approved ? "approved" : "pending"}`}>
                    {property.is_approved ? "Approved" : "Pending"}
                  </span>
                </div>

                <div className="host-actions">
                  <button
                    className="edit-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/host/dashboard/properties/${property.id}/edit`);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={async (e) => {
                      e.stopPropagation();

                      if (!window.confirm("Are you sure you want to delete this property?")) return;

                      await API.delete(`/properties/${property.id}/delete/`);
                      setProperties(properties.filter(p => p.id !== property.id));
                    }}
                  >
                    Delete
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HostProperties;
