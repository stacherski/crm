import { useState } from 'react'
import './App.css'

function AddCompany() {
  const [companyName, setCompanyName] = useState('')
  const [companyEmail, setCompanyEmail] = useState('')
  const [companyPhone, setCompanyPhone] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the data to your backend API
    console.log('Company Name:', companyName)
    console.log('Company Email:', companyEmail)
    console.log('Company Phone:', companyPhone)
    // Reset form fields after submission
    setCompanyName('')
    setCompanyEmail('')
    setCompanyPhone('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Company</h2>
      <div>
        <label>Company Name:</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Company Email:</label>
        <input
          type="email"
          value={companyEmail}
          onChange={(e) => setCompanyEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Company Phone:</label>
        <input
          type="tel"
          value={companyPhone}
          onChange={(e) => setCompanyPhone(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Company</button>
    </form>
  )
}

export default AddCompany
