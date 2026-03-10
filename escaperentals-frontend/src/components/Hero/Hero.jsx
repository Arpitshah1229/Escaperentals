// import "./Hero.css";
// import { useEffect, useState } from "react"
// import api, { BASE_URL } from "../../services/api"



// function Hero() {


//   const [hero, setHero] = useState(null)

//   useEffect(() => {
//     api.get("/home/hero/").then(res => {
//       setHero(res.data)
//     })
//   }, [])

//   if (!hero) return null
//   return (
//     // <section className="hero">
//     //   <div className="hero-overlay">
//     //     <div className="hero-card">
//     //       <h1>Book & Experience Amazing Places</h1>
//     //       <p>Find the perfect stay for your next trip</p>

//     //       <div className="hero-form">
//     //         <input type="text" placeholder="Location" />
//     //         <div className="hero-row">
//     //           <input type="date" />
//     //           <input type="date" />
//     //         </div>
//     //         <input type="number" placeholder="Guests" />
//     //         <button>Search</button>
//     //       </div>
//     //     </div>
//     //   </div>
//     // </section>

//     <section
//       className="hero"
//       style={{
//         backgroundImage: `url(
//         ${hero.image})`
//       }}
//     >
//       <div className="hero-overlay">
//         <div className="hero-card">
//           <h1>{hero.title}</h1>
//           <p>{hero.subtitle}</p>

//           <div className="hero-form">
//             <input placeholder="Location" />
//             <div className="hero-row">
//               <input type="date" />
//               <input type="date" />
//             </div>
//             <input type="number" placeholder="Guests" />
//             <button>Search</button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Hero;


import { useNavigate } from "react-router-dom";

import "./Hero.css";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { PublicAPI } from "../../services/api";

function Hero() {
  const [hero, setHero] = useState(null);

  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  // useEffect(() => {
  //   api.get("/home/hero/")
  //     .then(res => {
  //       console.log("Hero data:", res.data);
  //       setHero(res.data);
  //     })
  //     .catch(err => {
  //       console.error("Hero API error:", err);
  //     });
  // }, []);

  // if (!hero) return null;
  useEffect(() => {
    PublicAPI.get("home/hero/")
      .then((res) => setHero(res.data))
      .catch((err) => console.error("Hero API error:", err));
  }, []);

  if (!hero) return null;




  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${hero.image})`
      }}
    >
      <div className="hero-overlay">
        <div className="hero-card">
          <h1>{hero.title}</h1>
          <p>{hero.subtitle}</p>

          <div className="hero-form">
            <input placeholder="where are you going?" value={location} onChange={(e) => setLocation(e.target.value)} />
            <div className="hero-row">
              <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
              <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
            </div>
            <input type="number" placeholder="Guests" min="1" value={guests} onChange={(e) => setGuests(e.target.value)} />
            <button onClick={() =>
              navigate(
                `/properties?location=${location}&checkin=${checkIn}&checkout=${checkOut}&guests=${guests}`
              )
            }>Search</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
