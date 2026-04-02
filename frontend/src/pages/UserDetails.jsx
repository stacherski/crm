import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

function CompanyDetails() {
  const [broker, setBroker] = useState({})
  const [companies, setCompanies] = useState([])
  const { id } = useParams()

  useEffect(() => {
    async function fetchBroker() {
      try {
        const res = await fetch(`/api/user/${id}`, {
          credentials: "include"
        })
        const data = await res.json()
        setBroker(data[0] ? data[0] : {})

      } catch (err) {
        console.error(err)
      }
    }

    fetchBroker()
  }, [id])

  useEffect(() => {
    async function fetchBrokersCompanies() {
      try {
        const res = await fetch(`/api/user/${id}/company`, {
          credentials: "include"
        })
        const data = await res.json()
        setCompanies(data[0] ? [data[0]] : [])
      } catch (err) {
        console.error(err)
      }
    }

    fetchBrokersCompanies()
  }, [broker._id])

  const isEmpty = (obj) => {
    for (const prop in obj)
      if (Object.hasOwn(obj, prop))
        return false;
    return true;
  }

  return (
    <>
      {!isEmpty(broker) ? (
        <p>Name: {broker.name} {broker.surname}</p>
      ) : (
        <p>User not found.</p>
      )}

      {companies.length > 0 ? (
        <>
          <h3>Companies:</h3>
          <ul>
            {companies.map((company) => (
              <li key={company._id}>
                <Link to={`/company/${company._id}`}>{company.name}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No companies found for this broker.</p>
      )}
    </>
  )
}

export default CompanyDetails