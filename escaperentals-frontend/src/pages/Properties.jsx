// // function Properties() {
// //   return (
// //     <div className="container mt-5">
// //       <h1>EscapeRentals Properties</h1>
// //     </div>
// //   );
// // }

// // export default Properties;

// import { useSearchParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import API from "../services/api";
// import PropertyCard from "../components/PropertyCard/PropertyCard";
// import "./Properties.css";

// function Properties() {


//   const [searchParams] = useSearchParams();

//   const location = searchParams.get("location");
//   const checkIn = searchParams.get("checkin");
//   const checkOut = searchParams.get("checkout");
//   const guests = searchParams.get("guests");

//   // const [properties, setProperties] = useState([]);

//   const [properties, setProperties] = useState([]);
//   const [filters, setFilters] = useState({
//     location: "",
//     guests: "",
//     category: "",
//   });

//   useEffect(() => {
//     fetchProperties();
//   }, []);

//   const fetchProperties = async () => {
//     const response = await API.get("properties/", {
//       params: filters,
//     });
//     setProperties(response.data);
//   };

//   const handleChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   useEffect(() => {
//     API.get(`/properties/?location=${location}`)
//       .then(res => {
//         setProperties(res.data);
//       });
//   }, [location]);

//   return (
//     <div className="properties-page">
//       <h1>Available Properties</h1>

//       {/* Filters */}
//       <div className="filters">
//         <input
//           type="text"
//           name="location"
//           placeholder="Location"
//           onChange={handleChange}
//         />

//         <input
//           type="number"
//           name="guests"
//           placeholder="Guests"
//           onChange={handleChange}
//         />

//         <button onClick={fetchProperties}>Search</button>
//       </div>

//       {/* Grid */}
//       <div className="properties-grid">
//         {properties.map((property) => (
//           <PropertyCard key={property.id} property={property} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Properties;




import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import PropertyCard from "../components/PropertyCard/PropertyCard";
import "./Properties.css";

function Properties() {
  const [searchParams] = useSearchParams();

  const urlLocation = searchParams.get("location") || "";
  const urlCheckIn = searchParams.get("checkin") || "";
  const urlCheckOut = searchParams.get("checkout") || "";
  const urlCategory = searchParams.get("category") || "";

  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    location: urlLocation,
    checkin: urlCheckIn,
    checkout: urlCheckOut,
    category: urlCategory,
  });

  // 🔹 Fetch properties
  const fetchProperties = async (customFilters = filters) => {
    try {
      const response = await API.get("/properties/", {
        params: {
          location: customFilters.location,
          category: customFilters.category,
        },
      });
      setProperties(response.data);
    } catch (error) {
      console.error("Property fetch error:", error);
    }
  };

  // 🔹 On page load, apply Hero search
  useEffect(() => {
    fetchProperties({
      location: urlLocation,
      checkin: urlCheckIn,
      checkout: urlCheckOut,
      category: urlCategory,
    });
  }, []);

  // 🔹 Handle filter typing
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="properties-page">
      <h1>Available Properties</h1>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleChange}
        />

        <input
          type="date"
          name="checkin"
          value={filters.checkin}
          onChange={handleChange}
        />

        <input
          type="date"
          name="checkout"
          value={filters.checkout}
          onChange={handleChange}
        />

        <button onClick={() => fetchProperties(filters)}>
          Search
        </button>
      </div>

      {/* Grid */}
      <div className="properties-grid">
        {properties.length > 0 ? (
          properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>
    </div>
  );
}

export default Properties;
