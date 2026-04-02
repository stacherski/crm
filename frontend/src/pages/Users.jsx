import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Users() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/user/all", {
          credentials: "include"
        })
        const json = await res.json()
        setUsers(json)
      } catch (err) {
        console.error(err)
      }
    }

    fetchUsers()
  }, [])

  return (
    // <as-table-sort sort filter>
    <table className="table">
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
            <td>{u.permissions}</td>
          </tr>
        )) : (
          <tr>
            <td colSpan="3">No users found.</td>
          </tr>
        )}
      </tbody>
    </table>
    // </as-table-sort>
  )
}

export default Users