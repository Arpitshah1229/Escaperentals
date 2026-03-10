import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import { PublicAPI } from "../services/api";
import "./BlogDetail.css";

function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    PublicAPI.get(`/blogs/${slug}/`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error(err));
  }, [slug]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="blog-detail">
      <img src={blog.image} alt={blog.title} className="blog-hero" />
      <h1>{blog.title}</h1>

      <div className="blog-meta">
        {blog.author} • {blog.published_date}
      </div>

      <p className="blog-content">{blog.content}</p>
    </div>
  );
}

export default BlogDetail;
