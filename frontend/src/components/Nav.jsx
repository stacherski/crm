import { Link } from "react-router-dom"
import { useAuth, AuthProvider } from "./AuthProvider"

function Nav() {
  const { user, loading } = useAuth()

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
        <li level="1">
          <div className="l1 wrapper">
            <Link to="/"><span><as-icon name="--as-icon-star" size="m"></as-icon>Home</span></Link>
          </div>
        </li>
        {!user && (
          <>
            <li level="1">
              <div className="l1 wrapper">
                <Link to="/login"><span><as-icon name="--as-icon-enter" size="m"></as-icon>Login</span></Link>
              </div>
            </li>
          </>
        )}

        {user && (
          <>
            <li level="1">
              <div className="l1 wrapper">
                <Link to="/company"><span><as-icon name="--as-icon-badge" size="m"></as-icon>Companies</span></Link>
              </div>
            </li>
            <li level="1">
              <div className="l1 wrapper">
                <Link to="/users"><span><as-icon name="--as-icon-users" size="m"></as-icon>Users</span></Link>
              </div>
            </li>
            <li level="1">
              <div className="l1 wrapper">
                <Link to="/logout"><span><as-icon name="--as-icon-escape" size="m"></as-icon>Logout</span></Link>
              </div>
            </li>
          </>
        )}
      </ul>
      <div className="clock">
        <as-dot-matrix-clock size="10px"></as-dot-matrix-clock>
      </div>
    </nav>
  );
}

export default Nav;