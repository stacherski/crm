import { useContext, useEffect } from "react"
import { TitleContext } from "./Template"

function Logout() {
  const { setTitle } = useContext(TitleContext)
  const logoutTimeout = 1500
  const maxDots = 5

  useEffect(() => {
    setTitle("Logout")
    let dotCount = 1

    const interval = setInterval(() => {
      document.title = `Logging you out${".".repeat(dotCount)} - CRM`
      dotCount++
    }, logoutTimeout / maxDots)

    return () => clearInterval(interval)
  }, [setTitle])

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
        }, logoutTimeout)
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