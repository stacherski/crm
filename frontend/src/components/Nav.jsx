import { Link } from "react-router-dom"


function Nav() {
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
            <Link to="/">Home</Link>
          </div>
        </li>
        <li level="1">
          <div className="l1 wrapper">
            <Link to="/login">Login</Link>
          </div>
        </li>
        <li level="1">
          <div className="l1 wrapper">
            <Link to="/users">Users</Link>
          </div>
        </li>
        <li level="1">
          <div className="l1 wrapper">
            <Link to="/company">Companies</Link>
          </div>
        </li>
        <li level="1">
          <div className="l1 wrapper">
            <Link to="/logout">Logout</Link>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;