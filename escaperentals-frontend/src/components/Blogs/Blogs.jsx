
// import "./Blogs.css";

// const blogs = [
//   {
//     id: 1,
//     title: "How to Find the Perfect Vacation Rental",
//     excerpt:
//       "Discover tips and tricks to choose the best vacation rental for your next trip.",
//     author: "Admin",
//     date: "March 12, 2025",
//     image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
//   },
//   {
//     id: 2,
//     title: "Top 10 Travel Destinations in 2025",
//     excerpt:
//       "Explore the most popular travel destinations you should not miss this year.",
//     author: "EscapeRentals",
//     date: "April 02, 2025",
//     image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
//   },
//   {
//     id: 3,
//     title: "Why Booking Directly Saves You Money",
//     excerpt:
//       "Learn how direct bookings can help you save money and get better deals.",
//     author: "Team EscapeRentals",
//     date: "April 20, 2025",
//     image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1"
//   }
// ];

// function Blogs() {
//   return (
//     <section className="blogs-section">
//       <h2>From Our Blog</h2>
//       <p className="subtitle">
//         Latest news, tips, and travel inspiration
//       </p>

//       <div className="blogs-grid">
//         {blogs.map((blog) => (
//           <div key={blog.id} className="blog-card">
//             <img src={blog.image} alt={blog.title} />

//             <div className="blog-content">
//               <h3>{blog.title}</h3>
//               <p>{blog.excerpt}</p>

//               <div className="blog-meta">
//                 <span>{blog.author}</span>
//                 <span>•</span>
//                 <span>{blog.date}</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default Blogs;



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { PublicAPI } from "../../services/api";
import "./Blogs.css";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    PublicAPI.get("/blogs/")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Blog fetch error", err));
  }, []);

  return (
    <section className="blogs-section">
      <h2>From Our Blog</h2>
      <p className="subtitle">Latest news, tips, and travel inspiration</p>

      <div className="blogs-grid">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="blog-card"
            onClick={() => navigate(`/blogs/${blog.slug}`)}
            style={{ cursor: "pointer" }}
          >
            <img src={blog.image} alt={blog.title} />

            <div className="blog-content">
              <h3>{blog.title}</h3>
              <p>{blog.excerpt}</p>

              <div className="blog-meta">
                <span>{blog.author}</span>
                <span>•</span>
                <span>{blog.published_date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Blogs;
