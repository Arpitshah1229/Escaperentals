import "./About.css";

export default function About() {
  return (
    <div className="static-page">
      <h1>About EscapeRentals</h1>

      <p className="intro">
        EscapeRentals is a modern vacation rental platform helping travelers
        discover unique stays and unforgettable experiences across India.
      </p>

      <section>
        <h2>Our Mission</h2>
        <p>
          We aim to connect guests with hand-picked properties while empowering
          hosts to showcase their spaces effortlessly.
        </p>
      </section>

      <section>
        <h2>Why Choose Us?</h2>
        <ul>
          <li>✔ Curated properties</li>
          <li>✔ Secure bookings</li>
          <li>✔ Transparent pricing</li>
          <li>✔ Trusted hosts</li>
        </ul>
      </section>

      <section>
        <h2>Built for Hosts & Guests</h2>
        <p>
          Whether you’re planning a getaway or listing your property,
          EscapeRentals provides tools that make the experience seamless.
        </p>
      </section>
    </div>
  );
}
