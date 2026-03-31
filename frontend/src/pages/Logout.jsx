function Logout() {

  async function handleLogout() {
    const res = await fetch("http://localhost:8080/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (res.status === 200) {
      setTimeout(() => {window.location.href = "http://localhost:5173/login"},3000)
      return
    }
  }

  handleLogout()

  return (
    <div className="logout">
      <h2>You have been logged out</h2>
      <p>Redirecting to login page...</p>
    </div>
  )
}

export default Logout