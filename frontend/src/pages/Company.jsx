import { useEffect, useState } from "react"

function Company() {
  const [company, setCompany] = useState(null)

  useEffect(() => {
    async function fetchCompany() {
      try {
        const res = await fetch("http://localhost:8080/api/company/all", {
          credentials: "include"
        })
        const json = await res.json()
        setCompany(json)
      } catch (err) {
        console.error(err)
      }
    }

    fetchCompany()
  }, [])

  return (
    <ul>
      {company && <li key={company._id}>{company.name}</li> }
    </ul>
  )
}

export default Company