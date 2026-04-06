import { Link } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"
import { Loading } from "../components/Loading"
import { ShowError } from "../components/ShowError"
import Drawer from "../components/Drawer"

import { useContext, useEffect, useState } from "react"
import { TitleContext } from "./Template"
import { useAuth } from "../components/AuthProvider"
import CompanyAdd from "../components/CompanyAdd"

function Company() {
  const { user } = useAuth()
  const companyUrl = "/api/company/all"
  const { data, loading, error } = useFetch(companyUrl, { credentials: "include" })
  const { setTitle } = useContext(TitleContext)

  const [isOpen, setIsOpen] = useState(false)

  //setting up flags to indicate user permissions to edit & delete company data
  //use below in component return method to conditionally render Add New buttons as well as editing form (including <Drawer/>)
  const canAdd = user && user.permissions.includes("user:write")

  useEffect(() => {
    setTitle("Companies")
    document.title = "Companies - CRM"
  }, [data])

  if (loading) return <Loading loadingText="Loading companies..." />
  if (error) return <ShowError error={error} />

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {
          canAdd && (
            <a className="btn" onClick={() => setIsOpen(!isOpen)}>
              Add New
              <as-icon name="plus-solid" label="Add New Company"></as-icon>
            </a>
          )
        }
      </div>
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
      {
        // this is add new company form rendered conditionally based on user permissions
        // represented by <<canAdd>> flag
        canAdd && (
          <Drawer onClose={() => setIsOpen(false)} isOpen={isOpen}>
            <CompanyAdd />
          </Drawer>
        )
      }
    </>
  )
}

export default Company