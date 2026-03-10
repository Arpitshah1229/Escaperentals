



import { useEffect, useState } from "react";
import API, { PublicAPI } from "../services/api";
import "./AddProperty.css";

function AddProperty() {
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    price_per_night: "",
    guests: "",
    category: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    PublicAPI.get("/categories/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Category fetch error", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const MAX_IMAGES = 10;

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > MAX_IMAGES) {
      alert("You can upload maximum 10 images");
      return;
    }
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.latitude || !form.longitude) {
      alert("Please enter latitude and longitude");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Create property
      const res = await API.post("/properties/create/", form);
      const propertyId = res.data.id;

      // 2️⃣ Upload images
      for (let img of images) {
        const formData = new FormData();
        formData.append("property", propertyId);
        formData.append("image", img);

        await API.post("/properties/upload-image/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      alert("Property added successfully");

      setForm({
        title: "",
        description: "",
        location: "",
        price_per_night: "",
        guests: "",
        category: "",
        latitude: "",
        longitude: "",
      });

      setImages([]);
    } catch (err) {
      alert("Failed to add property");
    } finally {
      setLoading(false);
    }
  };

  const showMapPreview =
    form.latitude &&
    form.longitude &&
    !isNaN(form.latitude) &&
    !isNaN(form.longitude);

  return (
    <div className="add-property-page">
      <form onSubmit={handleSubmit} className="add-property-form">
        <h2>Add New Property</h2>

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location (e.g. Andheri West, Mumbai)"
          value={form.location}
          onChange={handleChange}
          required
        />

        {/* LAT / LNG INPUTS */}
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            name="latitude"
            type="number"
            step="any"
            placeholder="Latitude (e.g. 19.1367)"
            value={form.latitude}
            onChange={handleChange}
            required
          />

          <input
            name="longitude"
            type="number"
            step="any"
            placeholder="Longitude (e.g. 72.8296)"
            value={form.longitude}
            onChange={handleChange}
            required
          />
        </div>

        {/* MAP PREVIEW */}
        {showMapPreview && (
          <div style={{ margin: "12px 0" }}>
            <iframe
              title="Map Preview"
              width="100%"
              height="250"
              style={{ borderRadius: "12px", border: 0 }}
              loading="lazy"
              src={`https://www.google.com/maps?q=${form.latitude},${form.longitude}&z=15&output=embed`}
            />
            <p style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>
              Map preview (no API key required)
            </p>
          </div>
        )}

        <input
          name="price_per_night"
          type="number"
          placeholder="Price per night"
          value={form.price_per_night}
          onChange={handleChange}
          required
        />

        <input
          name="guests"
          type="number"
          placeholder="Guests"
          value={form.guests}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* IMAGE UPLOAD */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />

        <p style={{ fontSize: "14px", color: "#64748b" }}>
          {images.length} / 10 images selected
        </p>

        <button disabled={loading}>
          {loading ? "Uploading..." : "Add Property"}
        </button>
      </form>
    </div>
  );
}

export default AddProperty;















// import { useEffect, useState } from "react";
// import API, { PublicAPI } from "../services/api";
// import {
//   GoogleMap,
//   Marker,
//   Autocomplete,
//   useJsApiLoader,
// } from "@react-google-maps/api";
// import "./AddProperty.css";

// const libraries = ["places"];

// function AddProperty() {
//   const [categories, setCategories] = useState([]);
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     location: "",
//     price_per_night: "",
//     guests: "",
//     category: "",
//     latitude: null,
//     longitude: null,
//   });

//   const [mapCenter, setMapCenter] = useState({
//     lat: 19.0760, // default Mumbai
//     lng: 72.8777,
//   });

//   const [autocomplete, setAutocomplete] = useState(null);

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
//     libraries,
//   });

//   useEffect(() => {
//     PublicAPI.get("/categories/")
//       .then((res) => setCategories(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const MAX_IMAGES = 10;

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length > MAX_IMAGES) {
//       alert("Maximum 10 images allowed");
//       return;
//     }
//     setImages(files);
//   };

//   const onPlaceChanged = () => {
//     if (!autocomplete) return;

//     const place = autocomplete.getPlace();
//     if (!place.geometry) return;

//     const lat = place.geometry.location.lat();
//     const lng = place.geometry.location.lng();

//     setForm({
//       ...form,
//       location: place.formatted_address,
//       latitude: lat,
//       longitude: lng,
//     });

//     setMapCenter({ lat, lng });
//   };

//   const onMapClick = (e) => {
//     const lat = e.latLng.lat();
//     const lng = e.latLng.lng();

//     setForm({
//       ...form,
//       latitude: lat,
//       longitude: lng,
//     });

//     setMapCenter({ lat, lng });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.latitude || !form.longitude) {
//       alert("Please select property location on map");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await API.post("/properties/create/", form);
//       const propertyId = res.data.id;

//       for (let img of images) {
//         const formData = new FormData();
//         formData.append("property", propertyId);
//         formData.append("image", img);

//         await API.post("/properties/upload-image/", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }

//       alert("Property added successfully");

//       setForm({
//         title: "",
//         description: "",
//         location: "",
//         price_per_night: "",
//         guests: "",
//         category: "",
//         latitude: null,
//         longitude: null,
//       });

//       setImages([]);
//     } catch (err) {
//       alert("Failed to add property");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!isLoaded) return <p>Loading Map...</p>;

//   return (
//     <div className="add-property-page">
//       <form onSubmit={handleSubmit} className="add-property-form">
//         <h2>Add New Property</h2>

//         <input
//           name="title"
//           placeholder="Title"
//           value={form.title}
//           onChange={handleChange}
//           required
//         />

//         <textarea
//           name="description"
//           placeholder="Description"
//           value={form.description}
//           onChange={handleChange}
//         />

//         <input
//           name="location"
//           placeholder="Location"
//           value={form.location}
//           onChange={handleChange}
//           required
//         />

//         {/* MAP SEARCH */}
//         <Autocomplete onLoad={setAutocomplete} onPlaceChanged={onPlaceChanged}>
//           <input
//             type="text"
//             placeholder="Search location on map"
//             style={{ marginBottom: "10px" }}
//           />
//         </Autocomplete>

//         {/* MAP */}
//         <GoogleMap
//           center={mapCenter}
//           zoom={14}
//           mapContainerStyle={{
//             width: "100%",
//             height: "300px",
//             borderRadius: "12px",
//             marginBottom: "15px",
//           }}
//           onClick={onMapClick}
//         >
//           {form.latitude && (
//             <Marker
//               position={{
//                 lat: form.latitude,
//                 lng: form.longitude,
//               }}
//             />
//           )}
//         </GoogleMap>

//         <input
//           name="price_per_night"
//           type="number"
//           placeholder="Price per night"
//           value={form.price_per_night}
//           onChange={handleChange}
//           required
//         />

//         <input
//           name="guests"
//           type="number"
//           placeholder="Guests"
//           value={form.guests}
//           onChange={handleChange}
//           required
//         />

//         <select
//           name="category"
//           value={form.category}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Category</option>
//           {categories.map((cat) => (
//             <option key={cat.id} value={cat.id}>
//               {cat.name}
//             </option>
//           ))}
//         </select>

//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           onChange={handleImageChange}
//         />

//         <p style={{ fontSize: "14px", color: "#64748b" }}>
//           {images.length} / 10 images selected
//         </p>

//         <button disabled={loading}>
//           {loading ? "Uploading..." : "Add Property"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddProperty;

























// // import { useEffect, useState } from "react";
// // import API, { PublicAPI } from "../services/api";
// // import "./AddProperty.css";
// // import { GoogleMap, Marker, Autocomplete } from "@react-google-maps/api";

// // const libraries = ["places"];
// // function AddProperty() {
// //     const [categories, setCategories] = useState([]);
// //     const [images, setImages] = useState([]);
// //     const [loading, setLoading] = useState(false);



// //     const [form, setForm] = useState({
// //         title: "",
// //         description: "",
// //         location: "",
// //         price_per_night: "",
// //         guests: "",
// //         category: "",
// //         latitude: null,
// //         longitude: null,
// //     });
// //     const [mapCenter, setMapCenter] = useState({
// //         lat: 19.0760, // default Mumbai
// //         lng: 72.8777,
// //     });
// //     const [autocomplete, setAutocomplete] = useState(null);

// //     const { isLoaded } = useJsApiLoader({
// //         googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
// //         libraries,
// //     });

// //     useEffect(() => {
// //         PublicAPI.get("/categories/")
// //             .then((res) => setCategories(res.data))
// //             .catch((err) => {
// //                 console.error("Category fetch error:", err);
// //             });

// //     }, []);

// //     const handleChange = (e) => {
// //         setForm({ ...form, [e.target.name]: e.target.value });
// //     };
// //     const MAX_IMAGES = 10;
// //     const handleImageChange = (e) => {
// //         const files = Array.from(e.target.files);

// //         if (files.length > MAX_IMAGES) {
// //             alert("You can upload maximum 10 images");
// //             return;
// //         }
// //         setImages(files);
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         setLoading(true);

// //         try {
// //             // 1️⃣ Create property
// //             const res = await API.post("/properties/create/", form);
// //             const propertyId = res.data.id;

// //             // 2️⃣ Upload images
// //             for (let img of images) {
// //                 const formData = new FormData();
// //                 formData.append("property", propertyId);
// //                 formData.append("image", img);

// //                 await API.post("/properties/upload-image/", formData, {
// //                     headers: { "Content-Type": "multipart/form-data" },
// //                 });
// //             }

// //             alert("Property & images uploaded successfully");
// //             setForm({
// //                 title: "",
// //                 description: "",
// //                 location: "",
// //                 price_per_night: "",
// //                 guests: "",
// //                 category: "",

// //             });
// //             setImages([]);

// //         } catch (err) {
// //             alert("Failed to add property");
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     return (
// //         <div className="add-property-page">


// //             <form onSubmit={handleSubmit} className="add-property-form">
// //                 <h2>Add New Property</h2>
// //                 <input
// //                     name="title"
// //                     placeholder="Title"
// //                     onChange={handleChange}
// //                     required
// //                 />

// //                 <textarea
// //                     name="description"
// //                     placeholder="Description"
// //                     onChange={handleChange}
// //                 />

// //                 <input
// //                     name="location"
// //                     placeholder="Location"
// //                     onChange={handleChange}
// //                     required
// //                 />

// //                 <input
// //                     name="price_per_night"
// //                     type="number"
// //                     placeholder="Price per night"
// //                     onChange={handleChange}
// //                     required
// //                 />

// //                 <input
// //                     name="guests"
// //                     type="number"
// //                     placeholder="Guests"
// //                     onChange={handleChange}
// //                     required
// //                 />

// //                 <select name="category" onChange={handleChange} required>
// //                     <option value="">Select Category</option>
// //                     {categories.map((cat) => (
// //                         <option key={cat.id} value={cat.id}>
// //                             {cat.name}
// //                         </option>
// //                     ))}
// //                 </select>

// //                 {/* MULTIPLE IMAGE UPLOAD */}
// //                 <input
// //                     type="file"
// //                     multiple
// //                     accept="image/*"
// //                     onChange={handleImageChange}
// //                 />
// //                 <p style={{ fontSize: "14px", color: "#64748b" }}>{images.length} image(s)/ 10 images selected</p>

// //                 <button disabled={loading}>
// //                     {loading ? "Uploading..." : "Add Property"}
// //                 </button>
// //             </form>
// //         </div>
// //     );
// // }

// // export default AddProperty;



















// // // import { useEffect, useState } from "react";
// // // import API from "../services/api";

// // // function AddProperty() {
// // //   const [form, setForm] = useState({
// // //     title: "",
// // //     description: "",
// // //     location: "",
// // //     price_per_night: "",
// // //     guests: "",
// // //     category: "",
// // //   });

// // //   const [categories, setCategories] = useState([]);
// // //   const [loading, setLoading] = useState(false);

// // //   useEffect(() => {
// // //     API.get("/categories/")
// // //       .then((res) => setCategories(res.data))
// // //       .catch(() => {});
// // //   }, []);

// // //   const handleChange = (e) => {
// // //     setForm({ ...form, [e.target.name]: e.target.value });
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);

// // //     try {
// // //       await API.post("/properties/create/", form);
// // //       alert("Property added successfully");
// // //     } catch (err) {
// // //       alert("Failed to add property");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="add-property-page">
// // //       <h2>Add New Property</h2>

// // //       <form onSubmit={handleSubmit}>
// // //         <input name="title" placeholder="Title" onChange={handleChange} required />
// // //         <textarea name="description" placeholder="Description" onChange={handleChange} />
// // //         <input name="location" placeholder="Location" onChange={handleChange} required />
// // //         <input name="price_per_night" type="number" placeholder="Price per night" onChange={handleChange} required />
// // //         <input name="guests" type="number" placeholder="Guests" onChange={handleChange} required />

// // //         <select name="category" onChange={handleChange} required>
// // //           <option value="">Select Category</option>
// // //           {categories.map((cat) => (
// // //             <option key={cat.id} value={cat.id}>{cat.name}</option>
// // //           ))}
// // //         </select>

// // //         <button disabled={loading}>
// // //           {loading ? "Adding..." : "Add Property"}
// // //         </button>
// // //       </form>
// // //     </div>
// // //   );
// // // }

// // // export default AddProperty;
