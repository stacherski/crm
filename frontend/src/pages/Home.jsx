import { useContext, useEffect } from "react"
import { TitleContext } from "./Template"

function Home() {
  const { setTitle } = useContext(TitleContext)

  useEffect(() => {
    setTitle("Home")
    document.title = "Home - CRM"
  }, [setTitle])

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the Home page!</p>
    </div>
  )
}

export default Home