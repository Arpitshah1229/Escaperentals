import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API, { PublicAPI } from "../services/api";
import "./AddProperty.css";

function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
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
    fetchCategories();
    fetchProperty();
  }, []);

  const fetchCategories = async () => {
    const res = await PublicAPI.get("/categories/");
    setCategories(res.data);
  };

  const fetchProperty = async () => {
    const res = await API.get(`/properties/${id}/`);
    setForm({
      title: res.data.title || "",
      description: res.data.description || "",
      location: res.data.location || "",
      price_per_night: res.data.price_per_night ||"",
      guests: res.data.guests || "",
      category: res.data.category_id || "",
      latitude: res.data.latitude || "",
      longitude: res.data.longitude || "",
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.put(`/properties/update/${id}/`, form);
      alert("Property updated successfully");
      // navigate("/admin/properties");
      navigate("/host/dashboard/properties");
    } catch (err) {
      console.log("UPDATE ERROR:", err.response?.data);
      alert("Failed to update property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-property-page">
      <form onSubmit={handleSubmit} className="add-property-form">
        <h2>Edit Property</h2>

        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />

        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />

        <div style={{ display: "flex", gap: "10px" }}>
          <input name="latitude" placeholder="Latitude" value={form.latitude} onChange={handleChange} />
          <input name="longitude" placeholder="Longitude" value={form.longitude} onChange={handleChange} />
        </div>

        {/* MAP PREVIEW */}
        {form.latitude && form.longitude && (
          <iframe
            width="100%"
            height="250"
            style={{ borderRadius: "12px", border: 0 }}
            src={`https://www.google.com/maps?q=${form.latitude},${form.longitude}&z=15&output=embed`}
          />
        )}

        <input
          name="price_per_night"
          type="number"
          value={form.price_per_night}
          onChange={handleChange}
        />

        <input
          name="guests"
          type="number"
          value={form.guests}
          onChange={handleChange}
        />

        <select name="category" value={form.category} onChange={handleChange}>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <button disabled={loading}>
          {loading ? "Updating..." : "Update Property"}
        </button>
      </form>
    </div>
  );
}

export default EditProperty;
