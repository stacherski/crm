import { Link } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"
import { Loading } from "../components/Loading"
import { useContext, useEffect, useState } from "react"
import { useAuth } from "../components/AuthProvider"
import { TitleContext } from "./Template"
import { ShowError } from "../components/ShowError"
import Drawer from "../components/Drawer"
import UserAdd from "../components/UserAdd"

function Users() {
  const { user } = useAuth()

  const usersUrl = "/api/user/all"
  const { data: users, loading, error } = useFetch(usersUrl, { credentials: "include" })

  const { setTitle } = useContext(TitleContext)

  const [isOpen, setIsOpen] = useState(false)

  // Set title
  useEffect(() => {
    if (users)
      setTitle("Users")
    document.title = "Users - CRM"
  }, [users, setTitle])

  // Users loading & Error handling
  if (loading) return <Loading loadingText="Loading users..." />
  if (error) return <ShowError error={error} />

  //setting up flags to indicate user permissions to edit & delete company data
  //use below in component return method to conditionally render Add New button as well as Adding form (including <Drawer/>)
  const canAdd = user && user.permissions.includes("user:write")

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
        {
          canAdd && (
            <a className="btn" style={{ marginInlineStart: "auto" }} onClick={() => setIsOpen(!isOpen)}>
              Add New
              <as-icon name="plus-solid" label="Add New User"></as-icon>
            </a>
          )
        }
      </div>
      <as-table-sort sort>
        <table className="table equal">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Permissions</th>
            </tr>
          </thead>
          <tbody>
            {users ? users.map(u => (
              <tr key={u._id}>
                <td><Link to={`/users/${u._id}`}>{u.name} {u.surname}</Link></td>
                <td><Link to={`mailto:${u.email}`}>{u.email}</Link></td>
                <td>{u.role}</td>
                <td>
                  <div style={{ display: 'grid', gap: 'var(--as-space-xs)' }}>
                    <div className="flex-start">{u.permissions.filter(p => p.includes('company')).map(p => <span className="pill" data-type={p} key={p}>{p}</span>)}</div>
                    <div className="flex-start">{u.permissions.filter(p => p.includes('user')).map(p => <span className="pill" data-type={p} key={p}>{p}</span>)}</div>
                    <div className="flex-start">{u.permissions.filter(p => p.includes('pipeline')).map(p => <span className="pill" data-type={p} key={p}>{p}</span>)}</div>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </as-table-sort>
      <h3>Legend: ADMIN &gt; MANAGER &gt; USER</h3>
      {
        // this is add new company form rendered conditionally based on user permissions
        // represented by <<canAdd>> flag
        canAdd && (
          <Drawer onClose={() => setIsOpen(false)} isOpen={isOpen}>
            <UserAdd />
          </Drawer>
        )
      }
    </>
  )
}

export default Users