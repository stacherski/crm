import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"

function Search() {
  const [searchParams] = useSearchParams()
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        const res = await fetch(`/api/company/search/${searchParams.get("search")}`, {
          credentials: "include"
        })
        const data = await res.json()
        setSearchResults(data)
        console.log(searchResults)
      } catch (err) {
        console.error(err)
      }
    }

    if (searchParams.get("search")) {
      fetchSearchResults()
    }
  }, [searchParams])

  return (
    <div>
      <h1>Search</h1>
      <p>Welcome to the Search page!</p>
      <p>Search results for <strong>"{searchParams.get("search")}"</strong>:</p>
      {searchResults.length > 0 ? (
        <>
          <ul>
            {searchResults.map(result => (
              <li key={result._id}>
                <Link to={`/company/${result._id}`}>{result.name}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  )
}

export default Search