import { useEffect } from "react"

function Logout() {
  useEffect(() => {
    async function handleLogout() {
      const res = await fetch("/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (res.status === 200) {
        setTimeout(() => {
          window.location.href = "/login"
        }, 1500)
      }
    }

    handleLogout()
  }, [])

  return (
    <div className="logout">
      <h2>You have been logged out</h2>
      <p>Redirecting to login page...</p>
    </div>
  )
}

export default Logout