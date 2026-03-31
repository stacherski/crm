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
            <Link to="/dashboard">Dashboard</Link>
        </li>
        <li level="1">
            <Link to="/users">Users</Link>
        </li>
        <li level="1">
            <Link to="/company">Companies</Link>
        </li>
        <li level="1">
            <Link to="/pipelines">Pipelines</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;