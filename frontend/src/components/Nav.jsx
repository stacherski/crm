import { useState } from "react";

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
          <a href="/">Home</a>
        </li>
        <li level="1">
          <a href="/components">Components</a>
        </li>
        <li level="1">
          <a href="/tokens">Design Tokens</a>
        </li>
        <li level="1">
          <a href="/patterns">Patterns</a>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;