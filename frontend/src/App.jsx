import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Template } from "./pages/Template"
import Companies from "./pages/Company"
import CompanyDetails from "./pages/CompanyDetails"
import UserDetails from "./pages/UserDetails"
import Login from "./pages/Login"
import Logout from "./pages/Logout"
import Home from "./pages/Home"
import Users from "./pages/Users"
import Search from "./pages/Search"
import ProtectedRoute from "./components/ProtectedRoute"
import { AuthProvider } from "./components/AuthProvider"
import CompanyEdit from "./components/CompanyEdit"


function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Template><Home /></Template>} />
            <Route path="/login" element={<Template><Login /></Template>} />
            <Route element={<ProtectedRoute />}>
              <Route path="/companies" element={<Template><Companies /></Template>} />
              <Route path="/companies/:id" element={<Template><CompanyDetails /></Template>} />
              <Route path="/users" element={<Template><Users /></Template>} />
              <Route path="/users/:id" element={<Template><UserDetails /></Template>} />
              <Route path="/logout" element={<Template><Logout /></Template>} />
              <Route path="/search" element={<Template><Search /></Template>} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App