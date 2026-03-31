import Nav from "../components/Nav"
import NavToggle from "../components/NavToggle"

export function Template({ children }) {
  return (
    <>
      <Nav />
      <section data-content>
        <header>
          <h1>CRM</h1>
        </header>
        <article>
          {children}
        </article>
      </section>
      <NavToggle />
    </>
  )
}