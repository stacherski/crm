import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Template } from "./pages/Template"
import Companies from "./pages/Company"
import Login from "./pages/Login"
import Logout from "./pages/Logout"
import ProtectedRoute from "./components/ProtectedRoute"


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Template><Login /></Template>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/company" element={<Template><Companies /></Template>} />
            <Route path="/logout" element={<Template><Logout /></Template>} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App