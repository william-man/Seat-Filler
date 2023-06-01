import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, reset } from "../auth/authSlice";
import Spinner from "../../components/spinner";
import "../../styles/features/register/register.scss";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState("");
  const [hide, setHide] = useState(true);

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
    setError("");
    if (name === "") {
      setError("Please enter your name.");
    } else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(email)) {
      setError("Please enter a valid email address.");
    } else if (!password || password.length < 6) {
      setError("Please enter a password. Minimum 6 characters.");
    } else if (password !== confirm_password) {
      setError("Your passwords do not match.");
    } else {
      setHide(true);
      const userData = {
        name,
        email,
        password,
      };
      dispatch(registerUser(userData));
    }
    e.preventDefault();
  };

  // show password
  const showPass = () => {
    let hidden = document.getElementById("password");
    let confirm_hidden = document.getElementById("confirm_password");
    if (hidden.type === "password" && confirm_hidden.type === "password") {
      hidden.type = "text";
      confirm_hidden.type = "text";
      setHide(false);
    } else {
      hidden.type = "password";
      confirm_hidden.type = "password";
      setHide(true);
    }
  };

  //reset auth state on load
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);
  // Check and watch state changes for register

  //successful registration redirects to home page
  useEffect(() => {
    if (isError) {
      setError(message);
    }
    if (isSuccess || user) {
      dispatch(reset());
      navigate("/home");
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  //registration loading spinner
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
          <button type="button" onClick={showPass}>
            {hide ? <IoEyeOffOutline /> : <IoEyeOutline />}
          </button>
        </label>

        <input
          type={"password"}
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
          type={"password"}
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
