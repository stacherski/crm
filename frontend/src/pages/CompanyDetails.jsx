import { Link, useParams } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"
import { Loading } from "../components/Loading"
import { isEmpty } from "../components/isEmpty"
import { ShowError } from "../components/ShowError"
import { useContext, useEffect, useState, useRef } from "react"
import { TitleContext } from "./Template"
import CompanyEdit from "../components/CompanyEdit"
import { useAuth } from "../components/AuthProvider"

function CompanyDetails() {

  const { user } = useAuth()

  const { id } = useParams()

  const { setTitle } = useContext(TitleContext)

  const [refreshKey, setRefreshKey] = useState(0)

  const { data: company, loading: companyLoading, error: companyError } = useFetch(`/api/company/query?_id=${id}`, { credentials: "include" }, [id, refreshKey])

  const brokerUrl = company ? `/api/user/query?_id=${company[0].brokerId}` : null
  const { data: broker, loading: brokerLoading, error: brokerError } = useFetch(brokerUrl, { credentials: "include" }, [brokerUrl])

  const [editDrawerState, setEditDrawerState] = useState(false)

  useEffect(() => {
    if (company && company[0]) {
      setTitle(`Companies » ${company[0].name}`)
      document.title = `Companies » ${company[0].name} - CRM`
    }
  }, [company, setTitle])

  useEffect(() => {
    setEditDrawerState(true)
  }, [editDrawerState])

  if (companyError) return <ShowError error={companyError} />
  if (brokerError) return <ShowError error={brokerError} />

  if (companyLoading || brokerLoading) return <Loading loadingText="Loading company and broker information..." />

  const c = company[0]
  const b = broker[0]

  const canPatch = user && user.permissions.includes("user:write")
  const canDelete = user && user.permissions.includes("user:delete")


  document.addEventListener('as-drawer:created', () => {
    setEditDrawerState(true)
  })

  return (
    <>
      {!isEmpty(c) ? (
        <>
          <div>
            <a href="/companies" className="btn">
              <as-icon name="--as-icon-arrow-left" rotate="180deg" size="m"></as-icon>
              Back to Companies
            </a>
          </div>
          <div className="page-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <h1>{c.name}</h1>
              <div style={{ display: 'grid', gap: 'var(--as-space-m)', alignItems: 'start' }}>
                <div className="edit-bar">
                  {canPatch && company && company[0] &&
                    <as-class-toggle button-class="btn" button-text="Edit" target-element=".slide-in" target-class="slide-in-show" icon-name="pen" icon-rotate="1turn"></as-class-toggle>
                  }
                  {canDelete && company && company[0] &&
                    (
                      <a href={``} className="btn btn-error">
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
                    <div><label>Address</label><div> {c.address}</div></div>
                    <div><label>City</label><div> {c.city}</div></div>
                    <div><label>Post Code</label><div> {c.postCode}</div></div>
                    <div><label>VAT No</label><div> {c.vat}</div></div>
                    <div><label>Broker Name</label><div> <Link to={`/users/${c.brokerId}`}>{b.name} {b.surname}</Link></div></div>
                  </div>
                  <div className="data-list one-line">
                    <div><label>Email</label><div> <Link to={`mailto: ${c.email}`}>{c.email}</Link></div></div>
                    <div><label>Phone</label><div> <Link to={`tel: ${c.phone}`}>{c.phone}</Link></div></div>
                    <div><label>Status</label><div> <span class="badge success">{c.status}</span></div></div>
                    <div><label>Company Type</label><div> {c.companyType}</div></div>
                    <div><label>Contact Methods</label><div> {c.contactMethods.join(", ")}</div></div>
                  </div>
                </div>
              </div>
            </as-panel>

          </div>

          {
            // this is editing form rendered conditionally based on user permissions
            // represented by <<canPatch>> flag & presence of the <<company>> object
            canPatch && company[0] && (
              <div className="slide-in" id="editForm" position="left">
                <CompanyEdit company={c} />
              </div>
            )
          }

        </>
      ) : (
        <p>Company not found.</p>
      )
      }

    </>
  )
}

export default CompanyDetails