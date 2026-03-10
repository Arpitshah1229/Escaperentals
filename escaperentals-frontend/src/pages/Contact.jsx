import "./Contact.css";

export default function Contact() {
  return (
    <div className="static-page">
      <h1>Contact Us</h1>

      <p className="intro">
        Have questions or need help? We’d love to hear from you.
      </p>

      <div className="contact-grid">
        {/* INFO */}
        <div className="contact-info">
          <p><b>Email:</b> support@escaperentals.com</p>
          <p><b>Phone:</b> +91 90000 00000</p>
          <p><b>Location:</b> India</p>
        </div>

        {/* FORM */}
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}
