import { Link } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"
import { Loading } from "../components/Loading"
import { useContext, useEffect } from "react"
import { TitleContext } from "./Template"
import { ShowError } from "../components/ShowError"

function Users() {

  const usersUrl = "/api/user/all"


  const { data: users, loading, error } = useFetch(usersUrl, { credentials: "include" })
  const { setTitle } = useContext(TitleContext)

  useEffect(() => {
    if (users)
      setTitle("Users")
    document.title = "Users - CRM"
  }, [users, setTitle])

  if (loading) return <Loading loadingText="Loading users..." />
  if (error) return <ShowError error={error} />


  return (
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
              <td><div className="flex-start">{u.permissions.map(p => <span className="pill" data-type={p} key={p}>{p}</span>)}</div></td>
            </tr>
          )) : (
            <tr>
              <td colSpan="3">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </as-table-sort>
  )
}

export default Users