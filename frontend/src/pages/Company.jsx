import { Link } from "react-router-dom"
import { useFetch } from "../components/useFetch"
import { Loading } from "../components/Loading"

function Company() {
  const { data, loading, error } = useFetch("/api/company/all", { credentials: "include" })

  if (loading) return <Loading loadingText="Loading companies..." />
  if (error) return <p>Error: {error}</p>

  return (
    <as-table-sort sort filter>
      <table className="table">
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
              <td><Link to={`/company/${c._id}`}>{c.name}</Link></td>
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