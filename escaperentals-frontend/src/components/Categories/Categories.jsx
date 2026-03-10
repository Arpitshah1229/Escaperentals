
import "./Categories.css";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    id: 1,
    title: "Apartment",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
  },
  {
    id: 2,
    title: "Bed & Breakfast",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
  },
  {
    id: 3,
    title: "Villa",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
  },
  {
    id: 4,
    title: "House",
    image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c"
  },
  {
    id: 5,
    title: "Loft",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511"
  },
  {
    id: 6,
    title: "Studio",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36"
  }
];

function Categories() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    navigate(`/properties?category=${encodeURIComponent(categoryName)}`);
  };
  return (
    <section className="categories-section">
      <h2>Find a Place That Fits Your Comfort</h2>

      <div className="categories-grid">
        {categories.map((cat) => (
          <div key={cat.id} className="category-card" onClick={() => handleCategoryClick(cat.title)} style={{ cursor: "pointer" }}>
            <img src={cat.image} alt={cat.title} />
            <div className="overlay">
              <span>{cat.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
