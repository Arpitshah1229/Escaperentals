import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import "./Header.css"

function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="main-header">
      <div className="header-container">

        {/* Logo */}
        <Link to="/" className="logo">
          EscapeRentals
        </Link>

        {/* Navigation */}
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/properties">Listings</Link>
          <Link to="/about">About</Link>
          {/* <Link to="/contact">Contact</Link> */}

          {/* Host only */}
          {user?.role === "host" && (
            <Link to="/host/dashboard">Host Dashboard</Link>
          )}

          {/* Admin only */}
          {user?.role === "admin" && (
            <Link to="/admin">Admin Dashboard</Link>
          )}
        </nav>

        {/* Actions */}
        <div className="header-actions">
          {!user ? (
            <>
              <Link to="/login" className="login-btn">
                Login
              </Link>

              <Link to="/register" className="register-btn">
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="welcome-text">
                Hi, {user.first_name || user.username}
              </span>

              <Link to="/profile" className="register-btn">
                Profile
              </Link>

              <button
                className="logout-btn"
                onClick={() => {
                  logout()
                  navigate("/")
                }}
              >
                Logout
              </button>
            </>
          )}

          <Link to="/contact" className="contact-btn">
            Contact Now
          </Link>
        </div>

      </div>
    </header>
  )
}

export default Header




// import { Link } from "react-router-dom";
// import "./Header.css";
// function Header() {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
//       <div className="container">
//         <Link className="navbar-brand fw-bold" to="/">
//           EscapeRentals
//         </Link>

//         <ul className="navbar-nav ms-auto align-items-center">
//           <li className="nav-item">
//             <Link className="nav-link" to="/">Home</Link>
//           </li>

//           <li className="nav-item">
//             <Link className="nav-link" to="/properties">Listings</Link>
//           </li>

//           <li className="nav-item">
//             <Link className="nav-link" to="/about">About</Link>
//           </li>

//           <li className="nav-item">
//             <Link className="nav-link" to="/contact">Contact</Link>
//           </li>

//           <li className="nav-item ms-3">
//             <Link className="btn btn-outline-primary" to="/login">
//               Login
//             </Link>
//           </li>

//           <li className="nav-item ms-2">
//             <Link className="btn btn-primary" to="/register">
//               Register
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }

// export default Header;



// import { Link } from "react-router-dom";
// import "./Header.css";

// function Header() {
//   return (
//     <header className="main-header">
//       <div className="header-container">

//         {/* Logo */}
//         <Link to="/" className="logo">
//           EscapeRentals
//         </Link>

//         {/* Navigation */}
//         <nav className="nav-links">
//           <Link to="/">Home</Link>
//           <Link to="/properties">Listings</Link>
//           <Link to="/about">About</Link>
//           <Link to="/contact">Contact</Link>
//         </nav>

//         {/* Actions */}
//         <div className="header-actions">
//           <Link to="/login" className="login-btn">
//             Login
//           </Link>

//           <Link to="/register" className="register-btn">
//             Register
//           </Link>

//           <a href="/contact" className="contact-btn">
//             Contact Now
//           </a>
//         </div>

//       </div>
//     </header>
//   );
// }

// export default Header;
