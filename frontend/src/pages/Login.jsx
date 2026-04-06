import { useState } from "react"
import { useContext, useEffect } from "react"
import { TitleContext } from "./Template"

function Login() {
  const { setTitle } = useContext(TitleContext)

  useEffect(() => {
    setTitle("Login to CRM")
    document.title = "Login - CRM"
  }, [setTitle])

  // email & password variables to be set by respective input fields with onChange calling setEmail & setPasswords
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()

    const res = await fetch("/auth/login", {
      method: "POST",
      credentials: "include", //this is necessary to authenticate user in backend
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })

    if (res.status === 200) {
      window.location.href = "/companies"
      return
    }

    window.location.href = "/login"
  }

  return (
    <>
      <div className="form login-box">
        <h2>Login to CRM</h2>

        <form onSubmit={handleSubmit}>
          <div className="data-line filtering">
            <as-form-validation>
              <label htmlFor="email">E-mail:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </as-form-validation>
          </div>

          <div className="data-line filtering">
            <as-form-validation>
              <label htmlFor="password">Password:</label>
              <as-show-hide-password labels="Show,Hide" icons="--as-icon-eye,--as-icon-eye-slash">
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </as-show-hide-password>
            </as-form-validation>
          </div>

          <div className="data-line filtering">
            <button className="btn" type="submit">
              Log In
              <as-icon name="--as-icon-enter"></as-icon>
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login