import { Link, useLocation } from "react-router-dom"
import { useAuth } from "./AuthProvider"

function Nav() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return null

  return (

    <nav>
      <div className="search">
        <as-search-menu
          method="GET"
          action="/search/"
          placeholder="Search site for..."
          keys="Meta+U"
        ></as-search-menu>
      </div>
      <ul>
        <li level="1" className={location.pathname === "/" ? "active" : ""}>
          <div className="l1 wrapper">
            <Link to="/"><span><as-icon name="--as-icon-star" size="m"></as-icon>Home</span></Link>
          </div>
        </li>
        {!user && (
          <>
            <li level="1" className={location.pathname === "/login" ? "active" : ""}>
              <div className="l1 wrapper">
                <Link to="/login"><span><as-icon name="--as-icon-enter" size="m"></as-icon>Login</span></Link>
              </div>
            </li>
          </>
        )}

        {user && (
          <>
            <li level="1" className={location.pathname === "/companies" || location.pathname.startsWith("/companies/") ? "active" : ""}>
              <div className="l1 wrapper">
                <Link to="/companies"><span><as-icon name="--as-icon-badge" size="m"></as-icon>Companies</span></Link>
              </div>
            </li>
            <li level="1" className={location.pathname === "/users" || location.pathname.startsWith("/users/") ? "active" : ""}>
              <div className="l1 wrapper">
                <Link to="/users"><span><as-icon name="--as-icon-users" size="m"></as-icon>Users</span></Link>
              </div>
            </li>
            <li level="1" className={location.pathname === "/search" ? "active" : ""}>
              <div className="l1 wrapper">
                <Link to="/search"><span><as-icon name="--as-icon-search" size="m"></as-icon>Search</span></Link>
              </div>
            </li>
            <li level="1" className={location.pathname === "/logout" ? "active" : ""}>
              <div className="l1 wrapper">
                <Link to="/logout"><span><as-icon name="--as-icon-escape" size="m"></as-icon>Logout</span></Link>
              </div>
            </li>
          </>
        )}
      </ul>
      <div className="clock">
        <div className="grid">
          <p>Welcome {user ? <Link to={`/users/${user._id}`}>{user.name} {user.surname}</Link> : "Guest"}</p>
          <as-dot-matrix-clock size="10px"></as-dot-matrix-clock>
        </div>
      </div>
    </nav>
  );
}

export default Nav;