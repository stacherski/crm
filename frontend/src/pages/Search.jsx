import { useEffect, useContext } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"
import { ShowError } from "../components/ShowError"
import { Loading } from "../components/Loading"
import { TitleContext } from "./Template"

function Search() {
  const [searchParams] = useSearchParams()

  const { setTitle } = useContext(TitleContext)

  useEffect(() => {
    if (searchParams && searchParams.get("search")) {
      setTitle(`Search results for "${searchParams.get("search")}"`)
      document.title = `Search results for "${searchParams.get("search")}" - CRM`
    }
    else {
      document.title = "Search - CRM"
    }
  }, [searchParams, setTitle])

  const {
    data: searchResults,
    loading: companyLoading,
    error: companyError
  } = useFetch(`/api/company/search/${searchParams.get("search")}`, { credentials: "include" }, [searchParams])

  if (companyError) {
    return <ShowError error={companyError} />
  }

  if (companyLoading) {
    return <Loading loadingText="Loading search results..." />
  }


  return (
    <div>
      <h1>Search</h1>
      <p>Welcome to the Search page!</p>
      <p>Search results for <strong>"{searchParams.get("search")}"</strong>:</p>
      {searchResults && searchResults.length > 0 ? (
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