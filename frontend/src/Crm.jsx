import { BrowserRouter, Routes, Route } from "react-router-dom"
import Nav from './components/Nav'
import MainContent from './components/MainContent'
import NavToggle from './components/NavToggle'
import Companies from "./pages/Company"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute"

function Crm() {
  return (
    <BrowserRouter>
      <Nav />
      <MainContent />
      <NavToggle />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/company" element={<Companies />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Crm