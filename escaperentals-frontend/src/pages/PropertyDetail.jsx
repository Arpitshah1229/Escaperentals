// // // // function PropertyDetail() {
// // // //   return (
// // // //     <div className="container mt-5">
// // // //       <h1>EscapeRentals PropertyDetail</h1>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default PropertyDetail;



// // // import { useEffect, useState } from "react";
// // // import { useParams, useNavigate} from "react-router-dom";
// // // import API from "../services/api";
// // // import "./PropertyDetail.css";

// // // function PropertyDetail() {
// // //   const { id } = useParams();
// // //   const navigate = useNavigate();
// // //   const [property, setProperty] = useState(null);

// // //   useEffect(() => {
// // //     fetchProperty();
// // //   }, []);

// // //   const fetchProperty = async () => {
// // //     const response = await API.get(`properties/${id}/`);
// // //     setProperty(response.data);
// // //   };

// // //   if (!property) return <p className="loading">Loading...</p>;

// // //   return (
// // //     <div className="property-detail-page">

// // //       {/* Image Gallery */}
// // //       <div className="gallery">
// // //         {property.images.length > 0 ? (
// // //           property.images.map((img) => (
// // //             <img
// // //               key={img.id}
// // //               src={`http://127.0.0.1:8000${img.image}`}
// // //               alt={property.title}
// // //             />
// // //           ))
// // //         ) : (
// // //           <img src="https://via.placeholder.com/600" alt="placeholder" />
// // //         )}
// // //       </div>

// // //       {/* Info */}
// // //       <div className="details">
// // //         <h1>{property.title}</h1>
// // //         <p className="location">{property.location}</p>

// // //         <div className="info-row">
// // //           <span>👥 {property.guests} Guests</span>
// // //           <span>₹{property.price_per_night} / night</span>
// // //         </div>

// // //         <button onClick={() => navigate(`/booking/${property.id}`)}>
// // //           Book Now
// // //         </button>
// // //       </div>

// // //     </div>
// // //   );
// // // }

// // // export default PropertyDetail;


// // // import "./PropertyDetail.css";

// // // function PropertyDetail() {
// // //   return (
// // //     <div className="property-detail-page">

// // //       {/* TOP IMAGE GALLERY */}
// // //       <div className="property-gallery">
// // //         <img
// // //           src="https://via.placeholder.com/1600x500"
// // //           alt="Property"
// // //         />
// // //       </div>

// // //       {/* MAIN CONTENT */}
// // //       <div className="property-detail-container">

// // //         {/* LEFT CONTENT */}
// // //         <div className="property-left">

// // //           <div className="breadcrumb">
// // //             Home › Apartment › City Penthouse In Central City
// // //           </div>

// // //           <h1 className="property-title">
// // //             City Penthouse In Central City
// // //             <span className="featured">Featured</span>
// // //           </h1>

// // //           <div className="property-meta">
// // //             ⭐ 4 · 1 Review · 📍 Miami Beach, FL
// // //           </div>

// // //           {/* ICON INFO */}
// // //           <div className="icon-info">
// // //             <div><strong>Type</strong><span>Apartment</span></div>
// // //             <div><strong>Guests</strong><span>4 Guests</span></div>
// // //             <div><strong>Bedrooms</strong><span>2 Beds</span></div>
// // //             <div><strong>Bathrooms</strong><span>2 Full</span></div>
// // //           </div>

// // //           {/* ABOUT */}
// // //           <section>
// // //             <h2>About this listing</h2>
// // //             <p>
// // //               Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
// // //               Vivamus finibus fringilla libero, id consectetur purus.
// // //             </p>
// // //           </section>

// // //           {/* IMAGE GRID */}
// // //           <section>
// // //             <h2>Gallery</h2>
// // //             <div className="image-grid">
// // //               {[...Array(6)].map((_, i) => (
// // //                 <img key={i} src="https://via.placeholder.com/300" />
// // //               ))}
// // //             </div>
// // //           </section>

// // //           {/* MAP PLACEHOLDER */}
// // //           <section>
// // //             <h2>Location</h2>
// // //             <div className="map-placeholder">
// // //               Google Map Here
// // //             </div>
// // //           </section>

// // //           {/* REVIEWS */}
// // //           <section>
// // //             <h2>Reviews</h2>
// // //             <div className="review-card">
// // //               <strong>Ashley Foster</strong>
// // //               <p>Great stay! Loved the place.</p>
// // //             </div>
// // //           </section>

// // //           {/* SIMILAR */}
// // //           <section>
// // //             <h2>Similar Listings</h2>
// // //             <div className="similar-listings">
// // //               <div className="similar-card">Listing 1</div>
// // //               <div className="similar-card">Listing 2</div>
// // //             </div>
// // //           </section>

// // //         </div>

// // //         {/* RIGHT SIDEBAR */}
// // //         <div className="property-right">
// // //           <div className="booking-card">
// // //             <div className="price-header">
// // //               ₹14,000 <span>/ night</span>
// // //             </div>

// // //             <input type="text" placeholder="Arrive" />
// // //             <input type="text" placeholder="Depart" />
// // //             <input type="number" placeholder="Guests" />

// // //             <textarea placeholder="Introduce yourself to the host" />

// // //             <input type="email" placeholder="Your email" />

// // //             <button className="book-btn">Request to Book</button>

// // //             <p className="note">You won’t be charged yet</p>

// // //             <button className="outline-btn">♡ Add to Favorite</button>
// // //             <button className="outline-btn">Contact the host</button>
// // //             <button className="outline-btn">Print this page</button>
// // //           </div>
// // //         </div>

// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default PropertyDetail;


// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import API, { BASE_URL } from "../services/api";
// // import "./PropertyDetail.css";

// // function PropertyDetail() {
// //   const { id } = useParams();
// //   const [property, setProperty] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetchProperty();
// //   }, [id]);

// //   const fetchProperty = async () => {
// //     try {
// //       const response = await API.get(`properties/${id}/`);
// //       setProperty(response.data);
// //     } catch (error) {
// //       console.error("Error fetching property", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (loading) return <p style={{ padding: "40px" }}>Loading...</p>;
// //   if (!property) return <p>Property not found</p>;

// //   return (
// //     <div className="property-detail-page">

// //       {/* TOP IMAGE */}
// //       <div className="property-gallery">
// //         <img
// //           src={
// //             property.images?.length > 0
// //               ? `${BASE_URL}${property.images[0].image}`
// //               : "https://via.placeholder.com/1600x500"
// //           }
// //           alt={property.title}
// //         />
// //       </div>

// //       <div className="property-detail-container">

// //         {/* LEFT */}
// //         <div className="property-left">

// //           <div className="breadcrumb">
// //             Home › {property.category?.name} › {property.title}
// //           </div>

// //           <h1 className="property-title">
// //             {property.title}
// //             {property.is_featured && (
// //               <span className="featured">Featured</span>
// //             )}
// //           </h1>

// //           <div className="property-meta">
// //             📍 {property.location}
// //           </div>

// //           {/* ICON INFO */}
// //           <div className="icon-info">
// //             <div>
// //               <strong>Type</strong>
// //               <span>{property.category?.name}</span>
// //             </div>
// //             <div>
// //               <strong>Guests</strong>
// //               <span>{property.guests} Guests</span>
// //             </div>
// //             <div>
// //               <strong>Bedrooms</strong>
// //               <span>{property.bedrooms} Beds</span>
// //             </div>
// //             <div>
// //               <strong>Bathrooms</strong>
// //               <span>{property.bathrooms} Full</span>
// //             </div>
// //           </div>

// //           {/* ABOUT */}
// //           <section>
// //             <h2>About this listing</h2>
// //             <p>{property.description}</p>
// //           </section>

// //           {/* IMAGE GRID */}
// //           {property.images?.length > 1 && (
// //             <section>
// //               <h2>Gallery</h2>
// //               <div className="image-grid">
// //                 {property.images.map((img, i) => (
// //                   <img
// //                     key={i}
// //                     src={`${BASE_URL}${img.image}`}
// //                     alt="Property"
// //                   />
// //                 ))}
// //               </div>
// //             </section>
// //           )}

// //           {/* MAP */}
// //           <section>
// //             <h2>Location</h2>
// //             <div className="map-placeholder">
// //               Map integration later
// //             </div>
// //           </section>

// //           {/* REVIEWS (future) */}
// //           <section>
// //             <h2>Reviews</h2>
// //             <div className="review-card">
// //               Reviews coming soon
// //             </div>
// //           </section>

// //         </div>

// //         {/* RIGHT – STICKY */}
// //         <div className="property-right">
// //           <div className="booking-card">

// //             {/* PRICE ON TOP */}
// //             <div className="price-header">
// //               ₹{property.price_per_night}
// //               <span> / night</span>
// //             </div>

// //             <input type="date" />
// //             <input type="date" />
// //             <input type="number" placeholder="Guests" />

// //             <textarea placeholder="Introduce yourself to the host" />
// //             <input type="email" placeholder="Your email" />

// //             <button className="book-btn">Request to Book</button>

// //             <p className="note">You won’t be charged yet</p>

// //             <button className="outline-btn">♡ Add to Favorite</button>
// //             <button className="outline-btn">Contact the host</button>
// //             <button className="outline-btn">Print this page</button>

// //           </div>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }

// // export default PropertyDetail;






// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import API, { BASE_URL } from "../services/api";
// import "./PropertyDetail.css";

// function PropertyDetail() {
//   const { id } = useParams();

//   const [property, setProperty] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showGallery, setShowGallery] = useState(false);

//   useEffect(() => {
//     fetchProperty();
//   }, [id]);

//   const fetchProperty = async () => {
//     try {
//       const response = await API.get(`properties/${id}/`);
//       setProperty(response.data);
//     } catch (error) {
//       console.error("Error fetching property", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <p style={{ padding: "40px" }}>Loading...</p>;
//   if (!property) return <p>Property not found</p>;

//   return (
//     <div className="property-detail-page">

//       {/* ================= IMAGE GALLERY ================= */}
//       <div className="property-gallery-grid">
//         {/* MAIN IMAGE */}
//         <div className="gallery-main">
//           <img
//             src={
//               property.images?.length > 0
//                 ? `${BASE_URL}${property.images[0].image}`
//                 : "https://via.placeholder.com/800x500"
//             }
//             alt={property.title}
//             onClick={() => setShowGallery(true)}
//           />
//         </div>

//         {/* SIDE IMAGES */}
//         <div className="gallery-side">
//           {property.images?.slice(1, 5).map((img, index) => (
//             <img
//               key={index}
//               src={`${BASE_URL}${img.image}`}
//               alt="Property"
//               onClick={() => setShowGallery(true)}
//             />
//           ))}

//           {property.images?.length > 5 && (
//             <button
//               className="view-all-btn"
//               onClick={() => setShowGallery(true)}
//             >
//               + View all photos
//             </button>
//           )}
//         </div>
//       </div>

//       {/* ================= MAIN CONTENT ================= */}
//       <div className="property-detail-container">

//         {/* LEFT CONTENT */}
//         <div className="property-left">

//           <div className="breadcrumb">
//             Home › {property.category} › {property.title}
//           </div>

//           <h1 className="property-title">
//             {property.title}
//             {property.is_featured && (
//               <span className="featured">Featured</span>
//             )}
//           </h1>

//           <div className="property-meta">
//             📍 {property.location}
//           </div>

//           {/* ICON INFO */}
//           <div className="icon-info">
//             <div>
//               <strong>Type</strong>
//               <span>{property.property_type}</span>
//             </div>
//             <div>
//               <strong>Guests</strong>
//               <span>{property.guests}</span>
//             </div>
//             <div>
//               <strong>Bedrooms</strong>
//               <span>{property.bedrooms}</span>
//             </div>
//             <div>
//               <strong>Bathrooms</strong>
//               <span>{property.bathrooms}</span>
//             </div>
//           </div>

//           {/* ABOUT */}
//           <section>
//             <h2>About this listing</h2>
//             <p>{property.description}</p>
//           </section>

//           {/* LOCATION / MAP */}
//           <section>
//             <h2>Location</h2>
//             <div className="map-placeholder">
//               Latitude: {property.latitude} <br />
//               Longitude: {property.longitude}
//             </div>
//           </section>

//           {/* REVIEWS */}
//           <section>
//             <h2>Reviews</h2>
//             <div className="review-card">
//               Reviews coming soon
//             </div>
//           </section>

//         </div>

//         {/* RIGHT STICKY BOOKING CARD */}
//         <div className="property-right">
//           <div className="booking-card">

//             {/* PRICE FIXED ON TOP */}
//             <div className="price-header">
//               ₹{property.price_per_night}
//               <span> / night</span>
//             </div>

//             <input type="date" />
//             <input type="date" />
//             <input type="number" placeholder="Guests" />

//             <textarea placeholder="Introduce yourself to the host" />
//             <input type="email" placeholder="Your email" />

//             <button className="book-btn">Request to Book</button>

//             <p className="note">You won’t be charged yet</p>

//             <button className="outline-btn">♡ Add to Favorite</button>
//             <button className="outline-btn">Contact the host</button>
//             <button className="outline-btn">Print this page</button>

//           </div>
//         </div>

//       </div>

//       {/* ================= GALLERY MODAL ================= */}
//       {showGallery && (
//         <div className="gallery-modal">
//           <button
//             className="close-btn"
//             onClick={() => setShowGallery(false)}
//           >
//             ✕
//           </button>

//           <div className="gallery-modal-content">
//             {property.images.map((img, index) => (
//               <img
//                 key={index}
//                 src={`${BASE_URL}${img.image}`}
//                 alt="Property"
//               />
//             ))}
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

// export default PropertyDetail;




import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API, { BASE_URL } from "../services/api";
import "./PropertyDetail.css";
import BookingCard from "../components/booking/BookingCard"




function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showGallery, setShowGallery] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");


  const token = localStorage.getItem("access");

  useEffect(() => {
    fetchProperty();
    fetchReviews();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const response = await API.get(`properties/${id}/`);
      setProperty(response.data);
    } catch (error) {
      console.error("Error fetching property", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await API.get(`reviews/property/${id}/`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews", error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    try {
      await API.post("reviews/add/", {
        property: id,
        rating,
        comment,
      });

      setComment("");
      setRating(5);
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review", error);
      alert(
        error.response?.data?.error ||
        "You may have already reviewed this property."
      );
    }
  };


  if (loading) return <p className="loading">Loading...</p>;
  if (!property) return <p className="loading">Property not found</p>;

  const averageRating =
    reviews.length > 0
      ? (
        reviews.reduce((acc, r) => acc + r.rating, 0) /
        reviews.length
      ).toFixed(1)
      : null;


  return (
    <div className="property-detail-page">

      {/* HERO IMAGE */}
      <div className="property-gallery">
        <img
          src={
            property.images?.length > 0
              // ? `${BASE_URL}${property.images[0].image}`
              ? property.images[0].image
              : "https://via.placeholder.com/1600x500"
          }
          alt={property.title}
          onClick={() => setShowGallery(true)}
          className="clickable"

        />
      </div>

      {/* MAIN GRID */}
      <div className="property-detail-container">

        {/* LEFT CONTENT */}
        <div className="property-left">

          {/* BREADCRUMB */}
          <div className="breadcrumb">
            Home › {property.category} › {property.title}
          </div>

          {/* TITLE */}
          <h1 className="property-title">
            {property.title}
          </h1>

          {averageRating && (
            <div className="property-rating">
              ⭐ {averageRating} · {reviews.length} reviews
            </div>
          )}

          {/* LOCATION */}
          <div className="property-meta">
            📍 {property.location}
          </div>

          {/* ICON INFO */}
          <div className="icon-info">
            <div>
              <strong>Type</strong>
              <span>{property.category}</span>
            </div>
            <div>
              <strong>Guests</strong>
              <span>{property.guests}</span>
            </div>
            <div>
              <strong>Bedrooms</strong>
              <span>{property.bedrooms}</span>
            </div>
            <div>
              <strong>Bathrooms</strong>
              <span>{property.bathrooms}</span>
            </div>
          </div>

          {/* ABOUT */}
          <section className="section-card">
            <h2>About this listing</h2>
            <p>{property.description}</p>
          </section>

          {/* IMAGE GRID */}
          {property.images?.length > 1 && (
            <section className="section-card">
              <h2>Gallery</h2>
              <div className="image-grid">
                {property.images.slice(1).map((img, i) => (
                  <img
                    key={i}
                    // src={`${BASE_URL}${img.image}`}
                    src={img.image}
                    alt="Property"
                    onClick={() => setShowGallery(true)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* MAP */}
          <section className="section-card">
            <h2>Location</h2>
            {property.latitude && property.longitude ? (
              <iframe
                width="100%"
                height="350"
                style={{ borderRadius: "12px", border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
              />
            ) : (
              <div className="map-placeholder">Location not available</div>
            )}
          </section>

          {/* REVIEWS */}
          {/* <section className="section-card">
            <h2>Reviews</h2>
            <div className="review-card">
              Reviews coming soon
            </div>
          </section> */}
          <section className="section-card">
            <h2>Reviews</h2>

            {/* Add Review Form */}
            {token && (
              <form onSubmit={handleSubmitReview} className="review-form">

                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} ⭐
                    </option>
                  ))}
                </select>

                <textarea
                  placeholder="Write your review..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />

                <button type="submit">Submit Review</button>
              </form>
            )}

            {!token && (
              <p>Please login to leave a review.</p>
            )}

            {/* Review List */}
            {reviews.length === 0 ? (
              <div className="review-card">No reviews yet</div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <strong>{review.user}</strong>
                  <div>{"⭐".repeat(review.rating)}</div>
                  <p>{review.comment}</p>
                  <small>
                    {new Date(review.created_at).toLocaleDateString()}
                  </small>
                </div>
              ))
            )}

          </section>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="property-right">
          {/* <div className="booking-card">

            <div className="price-header">
              ₹{property.price_per_night}
              <span> / night</span>
            </div>

            <input type="date" />
            <input type="date" />
            <input type="number" placeholder="Guests" />

            <textarea placeholder="Introduce yourself to the host" />
            <input type="email" placeholder="Your email" />

            <button className="book-btn">Request to Book</button>

            <p className="note">You won’t be charged yet</p>

            <button className="outline-btn">♡ Add to Favorite</button>
            <button className="outline-btn">Contact the host</button>
            <button className="outline-btn">Print this page</button>

          </div> */}
          <BookingCard property={property} />
        </div>


      </div>


      {showGallery && (
        <div className="gallery-modal">
          <div className="gallery-header">
            <button onClick={() => setShowGallery(false)}>✕ Close</button>
          </div>

          <div className="gallery-grid">
            {property.images.map((img, i) => (
              <img
                key={i}
                // src={`${BASE_URL}${img.image}`}
                src={img.image}
                alt="Property"
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default PropertyDetail;
