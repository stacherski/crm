import { Link } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"
import { Loading } from "../components/Loading"
import { useContext, useEffect } from "react"
import { TitleContext } from "./Template"

function Company() {
  const companyUrl = "/api/company/all"
  const { data, loading, error } = useFetch(companyUrl, { credentials: "include" })
  const { setTitle } = useContext(TitleContext)

  useEffect(() => {
    setTitle("Companies")
    document.title = "Companies - CRM"
  }, [data])

  if (loading) return <Loading loadingText="Loading companies..." />
  if (error) return <p>Error: {error}</p>

  return (
    <as-table-sort sort filter>
      <table className="table equal">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {data ? data.map(c => (
            <tr key={c._id}>
              <td><Link to={`/companies/${c._id}`}>{c.name}</Link></td>
              <td>{c.address}</td>
              <td>{c.phone}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan="3">No companies found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </as-table-sort>
  )
}

export default Company