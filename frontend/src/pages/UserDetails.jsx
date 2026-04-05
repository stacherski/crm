import { Link, useParams } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"
import { Loading } from "../components/Loading"
import { isEmpty } from "../components/isEmpty"
import { ShowError } from "../components/ShowError"
import { useContext, useEffect } from "react"
import { TitleContext } from "./Template"

function UserDetails() {
  const { id } = useParams()
  const { setTitle } = useContext(TitleContext)

  const userUrl = `/api/user/${id}`
  const { data: broker, loading: brokerLoading, error: brokerError } = useFetch(userUrl, { credentials: "include" }, [id])

  const companiesUrl = broker ? `/api/user/${id}/company` : null
  const { data: companies, loading: companiesLoading, error: companiesError } = useFetch(companiesUrl, { credentials: "include" }, [companiesUrl])

  useEffect(() => {
    if (broker && broker[0]) {
      setTitle(`Users » ${broker[0].name} ${broker[0].surname}`)
      document.title = `Users » ${broker[0].name} ${broker[0].surname} - CRM`
    }
  }, [broker, setTitle])

  if (companiesError) return <ShowError error={companiesError} />
  if (brokerError) return <ShowError error={brokerError} />

  if (brokerLoading || companiesLoading) return <Loading />

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
            <table className="table equal">
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
                      <td><Link to={`/companies/${c._id}`}>{c.name}</Link></td>
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