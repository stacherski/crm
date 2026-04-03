import { Link, useParams } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"
import { Loading } from "../components/Loading"
import { isEmpty } from "../components/isEmpty"
import { useContext, useEffect } from "react"
import { TitleContext } from "./Template"


function CompanyDetails() {
  const { id } = useParams()
  const { setTitle } = useContext(TitleContext)

  const { data: company, loading: companyLoading, error: companyError } = useFetch(`/api/company/query?_id=${id}`, { credentials: "include" }, [id])

  const brokerUrl = company ? `/api/user/query?_id=${company[0].brokerId}` : null
  const { data: broker, loading: brokerLoading, error: brokerError } = useFetch(brokerUrl, { credentials: "include" }, [brokerUrl])

  useEffect(() => {
    if (company && company[0]) {
      setTitle(`Companies » ${company[0].name}`)
      document.title = `Companies » ${company[0].name} - CRM`
    }
  }, [company, setTitle])

  if (companyLoading || brokerLoading) return <Loading loadingText="Loading company and broker information..." />
  if (companyError) return <p>Error fetching company: {companyError}</p>
  if (brokerError) return <p>Error fetching broker: {brokerError}</p>

  const c = company[0]
  const b = broker[0]

  return (
    <>
      {!isEmpty(c) ? (
        <>
          <div>
            <Link to="/companies" className="btn">
              <as-icon name="--as-icon-arrow-left" rotate="180deg" size="m"></as-icon>
              Back to Companies
            </Link>
          </div>
          <as-panel>
            <div className="panel">
              <div className="panel-heading">{c.name}</div>
              <div className="panel-body columns">
                <div>
                  <p><strong>Address:</strong> {c.address}</p>
                  <p><strong>City:</strong> {c.city}</p>
                  <p><strong>Post Code:</strong> {c.postCode}</p>
                  <p><strong>VAT No:</strong> {c.vat}</p>
                  <p><strong>Broker Name:</strong> <Link to={`/users/${c.brokerId}`}>{b.name} {b.surname}</Link></p>
                </div>
                <div>
                  <p><strong>Email:</strong> <Link to={`mailto: ${c.email}`}>{c.email}</Link></p>
                  <p><strong>Phone:</strong> <Link to={`tel: ${c.phone}`}>{c.phone}</Link></p>
                  <p><strong>Status:</strong> <span class="badge success">{c.status}</span></p>
                  <p><strong>Company Type:</strong> {c.companyType}</p>
                  <p><strong>Contact Methods:</strong> {c.contactMethods.join(", ")}</p>
                </div>
              </div>
            </div>
          </as-panel>
        </>
      ) : (
        <p>Company not found.</p>
      )
      }
    </>
  )
}

export default CompanyDetails