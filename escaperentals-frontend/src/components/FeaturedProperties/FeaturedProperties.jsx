import "./FeaturedProperties.css";
import { useEffect, useState } from "react";
import API from "../../services/api";
import { PublicAPI } from "../../services/api";

import { useNavigate } from "react-router-dom";



function FeaturedProperties() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   API.get("/properties/", {
  //     params: { featured: "true" },
  //   })
  //     .then((res) => setProperties(res.data))
  //     .catch((err) => console.error("Featured fetch error:", err));
  // }, []);

  useEffect(() => {
    PublicAPI.get("properties/", { params: { featured: "true" } })
      .then((res) => setProperties(res.data))
      .catch((err) => console.error("Featured fetch error:", err));
  }, []);
  return (
    <section className="featured-section">
      <h2>Featured Homes</h2>
      <p className="subtitle">Hand-picked selection of quality places</p>

      <div className="properties-grid" >
        {properties.map((property) => (
          <div key={property.id} className="property-card" onClick={() => navigate(`/properties/${property.id}`)}>
            <div className="image-wrapper">
              <img src={property.images?.[0]?.image || "/placeholder.jpg"} alt={property.title} />
              <span className="badge">FEATURED</span>
              <span className="price">₹{property.price_per_night}/night</span>
            </div>

            <div className="property-info">
              <h3>{property.title}</h3>
              <p className="location">{property.location}</p>

              <div className="meta">
                <span>🛏 {property.beds || 1} Beds</span>
                <span>👥 {property.guests} Guests</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProperties;