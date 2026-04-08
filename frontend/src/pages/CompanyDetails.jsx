import { Link, useParams, useNavigate } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"
import { useApi } from "../hooks/useApi"
import { Loading } from "../components/Loading"
import { isEmpty } from "../components/isEmpty"
import { ShowError } from "../components/ShowError"
import { useContext, useEffect, useState } from "react"
import { TitleContext } from "./Template"
import CompanyEdit from "../components/CompanyEdit"
import Drawer from "../components/Drawer"
import { useAuth } from "../components/AuthProvider"

function CompanyDetails() {
  const { user } = useAuth()
  const { id } = useParams()

  const { setTitle } = useContext(TitleContext)

  const companyUrl = `/api/company/query?_id=${id}`
  const { data: company, loading: companyLoading, error: companyError } = useFetch(companyUrl, { credentials: "include" }, [id])

  const brokerUrl = company ? `/api/user/query?_id=${company[0].brokerId}` : null
  const { data: broker, loading: brokerLoading, error: brokerError } = useFetch(brokerUrl, { credentials: "include" }, [brokerUrl])

  const [isOpen, setIsOpen] = useState(false)

  const { del, loading: loadingDelete, error: errorDelete } = useApi()

  const navigate = useNavigate()

  //Effects (must be on top)
  //Set title via TitleContext from <Template/>
  useEffect(() => {
    if (company && company[0]) {
      setTitle(`Companies » ${company[0].name}`)
      document.title = `Companies » ${company[0].name} - CRM`
    }
  }, [company, setTitle])

  //Error handling for fetching company & broker data
  if (companyError) return <ShowError error={companyError} />
  if (brokerError) return <ShowError error={brokerError} />

  //Loading state for fetching company & broker data
  //Loading is after errors, because only after errors loading state is set to false
  //If Loading state was before Errors, it will be stuck on Loading if there are errors
  if (companyLoading || brokerLoading) return <Loading loadingText="Loading company and broker information..." />

  //simplification of the comapmy & broker return data
  const c = company[0]
  const b = broker[0]

  //setting up flags to indicate user permissions to edit & delete company data
  //use below in component return method to conditionally render Edit & Delete buttons as well as editing form (including <Drawer/>)
  const canPatch = user && user.permissions.includes("user:write")
  const canDelete = user && user.permissions.includes("user:delete")

  async function deleteCompany(c) {
    if (window.confirm(`Are you sure to delete ${c.name}?`)) {
      const deleted = await del(`/api/company/delete/${c._id}`)
      new Toast(`Company ${c.name} deleted. Undo`, { type: 'info', sticky: true })
      navigate('/companies')
    }
  }

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
                    <a className="btn" onClick={() => setIsOpen(!isOpen)}>
                      Edit
                      <as-icon name="--as-icon-pen" size="m"></as-icon>
                    </a>
                  }
                  {canDelete && company && company[0] &&
                    (
                      <a onClick={() => deleteCompany(c)} className="btn btn-error">
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
              <Drawer onClose={() => setIsOpen(false)} isOpen={isOpen}>
                <CompanyEdit company={c} />
              </Drawer>
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