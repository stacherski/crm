import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

function Company() {
  const [company, setCompany] = useState({})
  const [broker, setBroker] = useState({})
  const { id } = useParams()

  useEffect(() => {
    async function fetchCompany() {
      try {
        const res = await fetch(`/api/company/query?_id=${id}`, {
          credentials: "include"
        })
        const data = await res.json()
        setCompany(data[0] ? data[0] : {})

      } catch (err) {
        console.error(err)
      }
    }

    fetchCompany()
  }, [id])

  useEffect(() => {
    async function fetchBroker() {
      if (company.brokerId) {
        try {
          const res = await fetch(`/api/user/query?_id=${company.brokerId}`, {
            credentials: "include"
          })
          const data = await res.json()
          setBroker(data[0] ? data[0] : {})
        } catch (err) {
          console.error(err)
        }
      }
    }

    fetchBroker()
  }, [company.brokerId])

  const isEmpty = (obj) => {
    for (const prop in obj)
      if (Object.hasOwn(obj, prop))
        return false;
    return true;
  }

  return (
    <>
      {!isEmpty(company) ? (
        <>
          <div>
            <Link to="/company" className="btn">
              <as-icon name="--as-icon-arrow-left" rotate="180deg" size="m"></as-icon>
              Back to Companies
            </Link>
          </div>
          <as-panel>
            <div className="panel">
              <div className="panel-heading">{company.name}</div>
              <div className="panel-body columns">
                <div>
                  <p><strong>Address:</strong> {company.address}</p>
                  <p><strong>City:</strong> {company.city}</p>
                  <p><strong>Post Code:</strong> {company.postCode}</p>
                  <p><strong>VAT No:</strong> {company.vat}</p>
                  <p><strong>Broker Name:</strong> <Link to={`/users/${company.brokerId}`}>{broker.name} {broker.surname}</Link></p>
                </div>
                <div>
                  <p><strong>Email:</strong> <Link to={`mailto:${company.email}`}>{company.email}</Link></p>
                  <p><strong>Phone:</strong> <Link to={`tel:${company.phone}`}>{company.phone}</Link></p>
                  <p><strong>Status:</strong> <span class="badge success">{company.status}</span></p>
                  <p><strong>Company Type:</strong> {company.companyType}</p>
                  <p><strong>Contact Methods:</strong> {company.contactMethods.join(", ")}</p>
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

export default Company