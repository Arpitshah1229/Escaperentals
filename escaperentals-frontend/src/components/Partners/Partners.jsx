
import "./Partners.css";

const partners = [
  {
    id: 1,
    name: "Airbnb",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg"
  },
  {
    id: 2,
    name: "TripAdvisor",
    logo: "src/components/Partners/logos/tripadvisor-logo-vector_logoshape.com.png",
  },
  {
    id: 3,
    name: "Expedia",
    logo: "./src/components/Partners/logos/goibibo-logo-vector_logoshape.com.png"
  },
  {
    id: 4,
    name: "makemytrip",
    logo: "src/components/Partners/logos/makemytrip-vector-logo_logoshape.com.png"
  },
  {
    id: 5,
    name: "Agoda",
    logo: "src/components/Partners/logos/agoda-logo-vector_logoshape.com.png"
  }
];

function Partners() {
  return (
    <section className="partners-section">
      <h2>Trusted by Global Brands</h2>

      <div className="partners-grid">
        {partners.map((partner) => (
          <div key={partner.id} className="partner-logo">
            <img src={partner.logo} alt={partner.name} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Partners;
