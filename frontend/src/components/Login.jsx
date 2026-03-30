import { useState } from "react";

function Login() {
  return (
    <>
      <div className="form login-box">
        <h2>Login to CRM</h2>
        <form method="POST" action="http://localhost:8080/auth/login">
          <div className="data-line filtering">
            <as-form-validation>
              <label htmlFor="email">E-mail:</label>
              <input type="email" id="email" name="email" required />
            </as-form-validation>
          </div>
          <div className="data-line filtering">
            <as-form-validation>

              <label htmlFor="password">Password:</label>
              <as-show-hide-password labels="Show,Hide" icons="--as-icon-eye,--as-icon-eye-slash">
                <input type="password" id="password" name="password" required />
              </as-show-hide-password>
            </as-form-validation>
          </div>
          <div className="data-line filtering">
            <button className="btn" type="submit">
              Log In
              <as-icon name="--as-icon-user"></as-icon>
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;