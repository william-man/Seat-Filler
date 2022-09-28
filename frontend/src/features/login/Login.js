import React from "react";
import Layout from "../../components/layout/Layout";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const formChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <Layout>
      <section>
        <div>
          <h3>Log in</h3>
        </div>
        <div>
          <p>
            Need an account? <Link to="/register">Sign up! </Link>
          </p>
        </div>
        <form>
          <label htmlFor="email">Email:</label>
          <input
            type={"text"}
            id="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={formChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type={"text"}
            id="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={formChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </section>
      <section>{formData.email}</section>
      <section>{formData.password}</section>
    </Layout>
  );
};

export default Login;
