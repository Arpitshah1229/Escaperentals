import { useState } from "react"
import api from "../services/api"
import { useAuth } from "../context/AuthContext"
import { useNavigate ,useLocation } from "react-router-dom"
import "./Auth.css"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation();

  const redirectTo = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post("/users/login/", { username, password })
      login(res.data.access, res.data.refresh, res.data.user)
      navigate(redirectTo, { replace: true })
    } catch {
      alert("Invalid credentials")
    }
  }

  return (
   <div className="auth-page">
    <div className="auth-card">
      <div className="auth-logo">EscapeRentals</div>
      <p className="auth-subtitle">Login to continue</p>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="auth-btn">Login</button>
      </form>

      <div className="auth-footer">
        New here? <a href="/register">Create an account</a>
      </div>
    </div>
  </div>

  )
}





// import { useState } from "react"
// import api from "../services/api"
// import { useAuth } from "../context/AuthContext"
// import { useNavigate } from "react-router-dom"

// export default function Login() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const { login } = useAuth()
//   const navigate = useNavigate()

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       const res = await api.post("/users/login/", {
//         email,
//         password,
//       })

//       login(res.data.access, res.data.refresh)
//       navigate("/")
//     } catch (err) {
//       alert("Invalid credentials")
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>

//       <input
//         type="email"
//         placeholder="Email"
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button>Login</button>
//     </form>
//   )
// }


