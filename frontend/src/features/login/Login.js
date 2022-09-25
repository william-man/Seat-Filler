import React from "react";
import Layout from "../../components/layout/Layout";

const Login = () => {
  return (
    <Layout>
      <div>
        <div>
          <h3>Log in</h3>
        </div>
        <div>
          <div>
            <h4>Email</h4>
          </div>
          <div>
            <p>
              Need an account? <a href="/register">Sign up!</a>
            </p>
          </div>
        </div>
        <div>
          <input type={"text"}></input>
        </div>
        <div>
          <h4>Password</h4>
        </div>
        <div>
          <input type={"text"}></input>
        </div>
        <div>
          <button type="submit">Log in</button>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
