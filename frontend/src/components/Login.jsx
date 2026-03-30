import { useState } from "react";

function Login() {
  return (
    <>
        <p>Please enter your credentials to log in.</p>
        <form method="POST" action="http://localhost:8080/auth/login">
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" name="email" required />
          <br />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
          <br />
          <button type="submit">Log In</button>
        </form>
    </>
  );
}

export default Login;