import { Link, useNavigate } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"
import { useApi } from "../hooks/useApi"
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
  const canDelete = user && user.permissions.includes("user:delete")

  const { del, loading: loadingDelete, error: errorDelete } = useApi()

  const navigate = useNavigate()

  async function deleteCompany(c) {
    if (window.confirm(`Are you sure to delete ${c.name}?`)) {
      const deleted = await del(`/api/company/delete/${c._id}`)
      new Toast(`Company "${c.name}" deleted. Undo`, { type: 'info', sticky: true })
      navigate('/companies')
    }
  }

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
      <as-table-sort sort filter omit="6">
        <table className="table equal">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>E-mail</th>
              <th>Status</th>
              <th>Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data ? data.map(c => (
              <tr key={c._id}>
                <td><Link to={`/companies/${c._id}`}>{c.name}</Link></td>
                <td>{c.address}</td>
                <td>{c.phone}</td>
                <td><Link to={`mailto:${c.email}`}>{c.email}</Link></td>
                <td>{c.status}</td>
                <td>{c.companyType}</td>
                <td><a onClick={() => deleteCompany(c)} className="btn btn-error btn-outline" size="m">Delete <as-icon size="m" name="trashcan"></as-icon></a></td>
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