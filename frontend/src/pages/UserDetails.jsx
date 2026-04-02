import { Link, useParams } from "react-router-dom"
import { useFetch } from "../components/useFetch"
import { Loading } from "../components/Loading"
import { isEmpty } from "../components/isEmpty"

function UserDetails() {
  const { id } = useParams()

  const userUrl = `/api/user/${id}`
  const { data: broker, loading: brokerLoading, error: brokerError } = useFetch(userUrl, { credentials: "include" }, [id])

  const companiesUrl = broker ? `/api/user/${id}/company` : null
  const { data: companies, loading: companiesLoading, error: companiesError } = useFetch(companiesUrl, { credentials: "include" }, [companiesUrl])

  if (brokerLoading || companiesLoading) return <Loading />
  if (brokerError) return <p>Error fetching broker: {brokerError}</p>
  if (companiesError) return <p>Error fetching companies: {companiesError}</p>

  const b = broker[0]
  return (
    <>
      {!isEmpty(b) ? (
        <p>Name: {b.name} {b.surname}</p>
      ) : (
        <p>User not found.</p>
      )}

      {companies.length > 0 ? (
        <>
          <h3>Companies:</h3>
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
                {companies ? companies.map(
                  c => (
                    <tr key={c._id}>
                      <td><Link to={`/company/${c._id}`}>{c.name}</Link></td>
                      <td>{c.address}</td>
                      <td>{c.phone}</td>
                    </tr>
                  )) : (
                  <tr>
                    <td colSpan="3">No companies found for this broker.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </as-table-sort>
        </>
      ) : (
        <p>No companies found for this broker.</p>
      )}
    </>
  )
}

export default UserDetails