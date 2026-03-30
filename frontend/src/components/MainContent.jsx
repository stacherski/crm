import { useState } from "react";
import Login from "./Login";

function MainContent() {
  return (
    <section data-content>
      <header>
        <h1>CRM</h1>
      </header>
      <article>
        <Login />
      </article>
    </section>
  );
}

export default MainContent;