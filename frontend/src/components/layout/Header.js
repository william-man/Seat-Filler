import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaTv } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { GiArchiveRegister, GiHamburgerMenu } from "react-icons/gi";
import { logoutUser, reset } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { IconContext } from "react-icons/lib";
import Size from "../windowSize";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const width = Size();

  const logOut = () => {
    dispatch(logoutUser());
    dispatch(reset());
    navigate("/home");
  };
  useEffect(() => {
    const toggleDisplay = () => {
      if (width > 640) {
        let navbar = document.getElementsByClassName("nav")[0];
        navbar.style.display = "grid";
      }
    };
    window.addEventListener("resize", toggleDisplay);
    return window.removeEventListener("resize", toggleDisplay);
  }, [width]);

  const toggleNav = () => {
    let links = document.getElementsByClassName("nav")[0];
    if (links.style.display === "none") {
      links.style.display = "block";
    } else {
      links.style.display = "none";
    }
  };
  return (
    <>
      <header className="header-container">
        <div className="logo">
          <h1>Theatre</h1>
        </div>
        <div className="toggle">
          <button className="toggle-button" onClick={toggleNav}>
            <GiHamburgerMenu className="icon" />
          </button>
        </div>

        <div className="nav">
          <IconContext.Provider value={{ size: "1em", className: "icons" }}>
            <div className="nav-link">
              <Link to="/home">
                <FaHome /> Home
              </Link>
            </div>
            <div className="nav-link">
              <Link to="films">
                <FaTv /> What's On?
              </Link>
            </div>
            {localStorage.getItem("user") ? (
              <>
                {/*
                <div className="nav-link">
                  <Link to="profile">{localStorage.getItem("user").name}</Link>
            </div>*/}
                <div className="nav-link">
                  <button className="logout" onClick={logOut}>Logout</button>
                </div>
              </>
            ) : (
              <>
                <div className="nav-link">
                  <Link to="login">
                    <MdLogin /> Login
                  </Link>
                </div>
                <div className="nav-link">
                  <Link to="register">
                    <GiArchiveRegister /> Register
                  </Link>
                </div>
              </>
            )}
          </IconContext.Provider>
        </div>
      </header>
    </>
  );
};

export default Header;
