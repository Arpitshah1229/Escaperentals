// import { createContext, useContext, useState, useEffect } from "react"

// const AuthContext = createContext()

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const token = localStorage.getItem("access")
//     if (token) {
//       setUser({ token })
//     }
//     setLoading(false)
//   }, [])

//   const login = (access, refresh) => {
//     localStorage.setItem("access", access)
//     localStorage.setItem("refresh", refresh)
//     setUser({ token: access })
//   }

//   const logout = () => {
//     localStorage.removeItem("access")
//     localStorage.removeItem("refresh")
//     setUser(null)
//   }

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => useContext(AuthContext)


import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("access")
    const userData = localStorage.getItem("user")

    if (token && userData) {
      setUser(JSON.parse(userData))
    }

    setLoading(false)
  }, [])

  const login = (access, refresh, user) => {
    localStorage.setItem("access", access)
    localStorage.setItem("refresh", refresh)
    localStorage.setItem("user", JSON.stringify(user))
    setUser(user)
  }

  const logout = () => {
    localStorage.clear()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
