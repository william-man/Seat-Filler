import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, reset } from "../auth/authSlice";
import { is } from "immer/dist/internal";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { name, email, password, confirm_password } = formData;
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  // handle user inputs
  const formChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  // handle user submit
  const formSubmit = (e) => {
    e.peventDefault()

    if(password !== confirm_password){

    } else {
      const userData = {
        name,
        email,
        password
      }
      dispatch(registerUser(userData))
    }
  };

  // Check and watch state changes for register
  useEffect(() => {
    if(isError){

    }
    if(isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  },[user, isError, isSuccess, message, navigate, dispatch])


  return (
    <Layout>
      <section>
        <div>
          <h3>Register</h3>
        </div>
        <div>
          <p>
            Aleady have an account? <Link to="/login">Log in! </Link>
          </p>
        </div>
        <form>
          <label htmlFor="name">Name:</label>
          <input
            type={"text"}
            id="name"
            name="name"
            value={name}
            placeholder="Enter your name"
            onChange={formChange}
          />
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
          <label htmlFor="password">Confirm Password:</label>
          <input
            type={"text"}
            id="confirm_password"
            name="confirm_password"
            value={confirm_password}
            placeholder="Confirm your password"
            onChange={formChange}
          />
          <input type="submit" value="Submit" onSubmit={formSubmit} />
        </form>
      </section>
      <section>{formData.email}</section>
      <section>{formData.password}</section>
    </Layout>
  );
};

export default Register;
