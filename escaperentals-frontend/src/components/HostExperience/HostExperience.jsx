
import "./HostExperience.css";

const hosts = [
  {
    id: 1,
    name: "Rahul Mehta",
    role: "Property Host",
    message:
      "EscapeRentals helped me manage my property effortlessly. The bookings are smooth and reliable.",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "Sophia Williams",
    role: "Super Host",
    message:
      "Hosting on EscapeRentals has been an amazing experience. I love the transparency and support.",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 3,
    name: "Amit Verma",
    role: "Verified Host",
    message:
      "Great platform with genuine guests. Payments are fast and customer support is excellent.",
    image: "https://randomuser.me/api/portraits/men/65.jpg"
  }
];

function HostExperience() {
  return (
    <section className="host-section">
      <h2>Hear From Our Hosts</h2>
      <p className="subtitle">
        Trusted by hosts across the globe
      </p>

      <div className="host-grid">
        {hosts.map((host) => (
          <div key={host.id} className="host-card">
            <img src={host.image} alt={host.name} />
            <h3>{host.name}</h3>
            <span>{host.role}</span>
            <p>"{host.message}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HostExperience;
