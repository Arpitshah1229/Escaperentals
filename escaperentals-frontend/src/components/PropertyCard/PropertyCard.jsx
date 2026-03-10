// import "./PropertyCard.css";
// import { useNavigate } from "react-router-dom";

// function PropertyCard({ property }) {
//   const navigate = useNavigate();

//   return (
//     <div className="property-card" onClick={() => navigate(`/properties/${property.id}`)}>
//       <img
//         src={property.images?.[0]?.image || "https://via.placeholder.com/300"}
//         alt={property.title}
//       />

//       <div className="card-body">
//         <h3>{property.title}</h3>
//         <p className="location">{property.location}</p>

//         <div className="meta">
//           <span>👥 {property.guests} Guests</span>
//           <span>₹{property.price_per_night} / night</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PropertyCard;




// import "./PropertyCard.css";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../../services/api";

// function PropertyCard({ property }) {
//   const navigate = useNavigate();

//   return (
//     <div
//       className="property-card"
//       onClick={() => navigate(`/properties/${property.id}`)}
//     >
//       <img
//         src={
//           property.images && property.images.length > 0
//             ? `${BASE_URL}${property.images[0].image}`
//             : "https://via.placeholder.com/300"
//         }
//         alt={property.title}
//       />

//       <div className="card-body">
//         <h3>{property.title}</h3>
//         <p className="location">{property.location}</p>

//         <div className="meta">
//           <span>👥 {property.guests} Guests</span>
//           <span>₹{property.price_per_night} / night</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PropertyCard;




import "./PropertyCard.css";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../services/api";

function PropertyCard({ property }) {
  const navigate = useNavigate();

  const imageUrl =
    property.images && property.images.length > 0
      ? property.images[0].image
      : "/placeholder.jpg";

  return (
    <div
      className="property-card"
      onClick={() => navigate(`/properties/${property.id}`)}
    >
      {/* Image */}
      <img src={imageUrl} alt={property.title} />



      {/* Card body */}
      <div className="card-body">
        <h3>{property.title}</h3>
        <p className="location">{property.location}</p>
        <div className="meta-row">
          <div className="meta">
            👥 {property.guests} Guests
          </div>

          {/* Price overlay (matches CSS) */}
          <div className="price">
            ₹{property.price_per_night}
            <span>/night</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PropertyCard;
