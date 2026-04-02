import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Company() {
  const [company, setCompany] = useState([])

  useEffect(() => {
    async function fetchCompany() {
      try {
        const res = await fetch("/api/company/all", {
          credentials: "include"
        })
        const json = await res.json()
        setCompany(json)
      } catch (err) {
        console.error(err)
      }
    }

    fetchCompany()
  }, [])

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
          {company ? company.map(c => (
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