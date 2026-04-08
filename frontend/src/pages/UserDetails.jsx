import { Link, useParams, useNavigate } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"
import { useApi } from "../hooks/useApi"
import { Loading } from "../components/Loading"
import { isEmpty } from "../components/isEmpty"
import { ShowError } from "../components/ShowError"
import { useContext, useEffect, useState } from "react"
import { TitleContext } from "./Template"
import UserEdit from "../components/UserEdit"
import Drawer from "../components/Drawer"
import { useAuth } from "../components/AuthProvider"

function UserDetails() {
  const { user } = useAuth()
  const { id } = useParams()
  const { setTitle } = useContext(TitleContext)
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const userUrl = `/api/user/${id}`
  const { data: broker, loading: brokerLoading, error: brokerError } = useFetch(userUrl, { credentials: "include" }, [id])

  const companiesUrl = broker ? `/api/user/${id}/company` : null
  const { data: companies, loading: companiesLoading, error: companiesError } = useFetch(companiesUrl, { credentials: "include" }, [companiesUrl])

  const rolesUrl = broker ? `/api/roles` : null
  const { data: roles, loading: rolesLoading, error: rolesError } = useFetch(companiesUrl, { credentials: "include" }, [id])

  const { del, loading: loadingDelete, error: errorDelete } = useApi()

  useEffect(() => {
    if (broker && broker[0]) {
      setTitle(`Users » ${broker[0].name} ${broker[0].surname}`)
      document.title = `Users » ${broker[0].name} ${broker[0].surname} - CRM`
    }
  }, [broker, setTitle])

  if (companiesError) return <ShowError error={companiesError} />
  if (rolesError) return <ShowError error={rolesError} />
  if (brokerError) return <ShowError error={brokerError} />

  if (brokerLoading || companiesLoading || rolesLoading) return <Loading />

  const b = broker[0]
  const c = companies[0]

  const canPatch = user && user.permissions.includes("user:write")
  const canDelete = user && user.permissions.includes("user:delete")

  async function deleteUser(b) {
    if (window.confirm(`Are you sure to delete user ${b.name} ${b.surname}? ${b._id}`)) {
      const deleted = await del(`/api/user/delete/${b._id}`)
      new Toast(`User ${b.name} ${b.surname} deleted. Undo`, { type: 'info', sticky: true })
      navigate('/users')
    }
  }

  return (
    <>
      <div>
        <a onClick={() => navigate('/users')} className="btn">
          <as-icon name="--as-icon-arrow-left" rotate="180deg" size="m"></as-icon>
          Back to Users
        </a>
      </div>
      {!isEmpty(b) ? (
        <>
          <div className="page-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <h1>{b.name} {b.surname}</h1>
              <div style={{ display: 'grid', gap: 'var(--as-space-m)', alignItems: 'start' }}>
                <div className="edit-bar">
                  {
                    canPatch && b && (
                      <a className="btn" onClick={() => {
                        console.log("clicked!")
                        setIsOpen(!isOpen)
                      }}>
                        Edit user
                        <as-icon name="plus-solid" label="Edit user"></as-icon>
                      </a>
                    )
                  }
                  {canDelete && broker && broker[0] &&
                    (
                      <a onClick={() => deleteUser(b)} className="btn btn-error">
                        Delete
                        <as-icon name="--as-icon-trashcan" size="m"></as-icon>
                      </a>
                    )}
                </div>
              </div>
            </div>
          </div>
          <div className="page-content">
            <as-panel>
              <div className="panel">
                <div className="panel-body columns">
                  <div className="data-list one-line">
                    <div><label>Full name</label><div> {b.name} {b.surname}</div></div>
                    <div><label>Phone</label><div> {b.phone}</div></div>
                    <div><label>Email</label><div> {b.email}</div></div>
                    <div><label>Status</label><div> {b.status}</div></div>
                  </div>
                  <div className="data-list one-line">
                    <div><label>Role</label><div> {b.role}</div></div>
                    <div><label>Company level permissions</label><div className="flex-start">{b.permissions.filter(p => p.includes('company')).map(p => <span className="pill" data-type={p} key={p}>{p}</span>)}</div></div>
                    <div><label>User level permissions</label><div className="flex-start">{b.permissions.filter(p => p.includes('user')).map(p => <span className="pill" data-type={p} key={p}>{p}</span>)}</div></div>
                    <div><label>Pipeline level permissions</label><div className="flex-start">{b.permissions.filter(p => p.includes('pipeline')).map(p => <span className="pill" data-type={p} key={p}>{p}</span>)}</div></div>
                  </div>
                </div>
              </div>
            </as-panel>

          </div>
        </>
      ) : (
        <p>User not found.</p>
      )}
      <as-tab-group>
        <as-tab><as-icon name="badge"></as-icon>Companies</as-tab>
        <as-tab-panel>

          {companies.length > 0 ? (
            <>
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
        </as-tab-panel>
      </as-tab-group>
      {
        // this is editing form rendered conditionally based on user permissions
        // represented by <<canPatch>> flag & presence of the <<broker>> object
        canPatch && b && (
          <Drawer onClose={() => setIsOpen(false)} isOpen={isOpen}>
            <UserEdit broker={b} onClose={() => setIsOpen(false)} />
          </Drawer>
        )
      }
    </>
  )
}

export default UserDetails