import { Navigate, Outlet } from "react-router-dom"
import { useEffect, useState } from "react"

function ProtectedRoute() {
  const [auth, setAuth] = useState(null)

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/auth/me", {
          credentials: "include"
        })
        setAuth(res.status === 200)
      } catch {
        setAuth(false)
      }
    }
    checkAuth()
  }, [])

  if (auth === null) return <div>Loading...</div>

  return auth ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute