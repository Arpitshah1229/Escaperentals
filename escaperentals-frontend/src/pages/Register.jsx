import { useState } from "react"
import api from "../services/api"
import { useNavigate } from "react-router-dom"
import "./Auth.css"

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
    role: "guest",
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post("/users/register/", form)
      alert("Account created. Please login.")
      navigate("/login")
    } catch {
      alert("Registration failed")
    }
  }

  return (
    <div className="auth-page">
  <div className="auth-card">
    <div className="auth-logo">EscapeRentals</div>
    <p className="auth-subtitle">Create your account</p>

    <form onSubmit={handleSubmit}>
      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        required
      />

      <input
        name="first_name"
        placeholder="First Name"
        onChange={handleChange}
      />

      <input
        name="last_name"
        placeholder="Last Name"
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email (optional)"
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />

      <div className="role-box">
        <input
          type="radio"
          id="guest"
          name="role"
          value="guest"
          defaultChecked
          onChange={handleChange}
        />
        <label htmlFor="guest">Guest</label>

        <input
          type="radio"
          id="host"
          name="role"
          value="host"
          onChange={handleChange}
        />
        <label htmlFor="host">Host</label>
      </div>

      <button className="auth-btn">Create Account</button>
    </form>

    <div className="auth-footer">
      Already have an account? <a href="/login">Login</a>
    </div>
  </div>
</div>

  )
}
