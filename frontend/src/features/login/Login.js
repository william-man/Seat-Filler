import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, reset } from "../auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Spinner from "../../components/spinner";
import "../../styles/features/login/login.scss";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const [hide, setHide] = useState(true);

  const formChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const formSubmit = (e) => {
    dispatch(reset());
    setError("");
    setHide(true)
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    dispatch(loginUser(userData));
  };

  const showPass = () => {
    let hidden = document.getElementById("password");
    if (hidden.type === "password") {
      hidden.type = "text";
      setHide(false);
    } else {
      hidden.type = "password";
      setHide(true);
    }
  };

  //reset auth state on load
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  //show error or navigate to home on success
  useEffect(() => {
    if (isError) {
      setError(message);
    }
    if (isSuccess || user) {
      dispatch(reset());
      navigate("/home");
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="login-container">
      <div className="login-header">
        <h3>Log in</h3>
      </div>
      {isError && <div className="login-error">{error}</div>}
      <div className="login-signup">
        <p>
          Need an account? <Link to="/register">Sign up! </Link>
        </p>
      </div>
      <form className="login-form">
        <label className="login-form-email" htmlFor="email">
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
        <label className="login-form-password" htmlFor="password">
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
        <button type="submit" value="Submit" onClick={formSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
