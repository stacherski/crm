import Nav from "../components/Nav"
import NavToggle from "../components/NavToggle"
import { createContext, useState } from "react"

export const TitleContext = createContext('TitleContext')

export function Template({ children }) {
  const [title, setTitle] = useState("Home")

  return (
    <>
      <TitleContext.Provider value={{ setTitle }}>
        <Nav />
        <section data-content>
          <header>
            <h1>CRM » {title}</h1>
          </header>
          <article>
            {children}
          </article>
        </section>
        <NavToggle />
      </TitleContext.Provider>
    </>
  )
}