import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, reset } from "../auth/authSlice";
import Spinner from "../../components/spinner";
import "../../styles/features/register/register.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");

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
    dispatch(reset());
    if (password !== confirm_password) {
      setError("Your passwords do not match.");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(registerUser(userData));
    }
    e.preventDefault();
  };

  //reset auth state on load
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);
  // Check and watch state changes for register

  useEffect(() => {
    if (isError) {
      setError(message);
    }
    if (isSuccess || user) {
      dispatch(reset());
      navigate("/");
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="register-container">
      <div className="register-header">
        <h3>Register</h3>
      </div>
      <div className="register-error">{error}</div>
      <div className="register-login">
        <p>
          Aleady have an account? <Link to="/login">Log in! </Link>
        </p>
      </div>
      <form className="register-form">
        <label className="register-form-name" htmlFor="name">
          Name:
        </label>
        <input
          type={"text"}
          id="name"
          name="name"
          value={name}
          placeholder="Enter your name"
          onChange={formChange}
        />
        <label className="register-form-email" htmlFor="email">
          Email:
        </label>
        <input
          type={"text"}
          id="email"
          name="email"
          value={email}
          placeholder="Enter your email"
          onChange={formChange}
        />
        <label className="register-form-password" htmlFor="password">
          Password:
        </label>
        <input
          type={"text"}
          id="password"
          name="password"
          value={password}
          placeholder="Enter your password"
          onChange={formChange}
        />
        <label className="register-form-confirm" htmlFor="confirm_password">
          Confirm Password:
        </label>
        <input
          type={"text"}
          id="confirm_password"
          name="confirm_password"
          value={confirm_password}
          placeholder="Confirm your password"
          onChange={formChange}
        />
        <button type="submit" value="Submit" onClick={formSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
