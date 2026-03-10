import { useNavigate } from "react-router-dom";
import "./Destinations.css";

const destinations = [
  {
    id: 1,
    name: "Mumbai",
    count: "120 Properties",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f",
  },
  {
    id: 2,
    name: "Goa",
    count: "98 Properties",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
  },
  {
    id: 3,
    name: "Lonavala",
    count: "86 Properties",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
  },
  {
    id: 4,
    name: "Alibag",
    count: "110 Properties",
    image: "https://images.unsplash.com/photo-1602526432604-029a709e131c",
  },
];

function Destinations() {
  const navigate = useNavigate();

  const handleClick = (cityName) => {
    navigate(`/properties?location=${encodeURIComponent(cityName)}`);
  };

  return (
    <section className="destinations-section">
      <h2>Trending Destinations</h2>
      <p>Explore the most popular destinations around the world</p>

      <div className="destinations-grid">
        {destinations.map((city) => (
          <div
            key={city.id}
            className="destination-card"
            onClick={() => handleClick(city.name)}
            style={{ cursor: "pointer" }}
          >
            <img src={city.image} alt={city.name} />
            <div className="overlay">
              <h3>{city.name}</h3>
              <span>{city.count}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Destinations;




// import "./Destinations.css";

// const destinations = [
//   {
//     id: 1,
//     name: "New York",
//     count: "120 Properties",
//     image: "https://images.unsplash.com/photo-1549924231-f129b911e442"
//   },
//   {
//     id: 2,
//     name: "Paris",
//     count: "98 Properties",
//     image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34"
//   },
//   {
//     id: 3,
//     name: "London",
//     count: "86 Properties",
//     image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e"
//   },
//   {
//     id: 4,
//     name: "Dubai",
//     count: "110 Properties",
//     image: "https://images.unsplash.com/photo-1498496294664-d9372eb521f3"
//   }
// ];

// function Destinations() {
//   return (
//     <section className="destinations-section">
//       <h2>Trending Destinations</h2>
//       <p>Explore the most popular destinations around the world</p>

//       <div className="destinations-grid">
//         {destinations.map((city) => (
//           <div key={city.id} className="destination-card">
//             <img src={city.image} alt={city.name} />
//             <div className="overlay">
//               <h3>{city.name}</h3>
//               <span>{city.count}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// export default Destinations;
