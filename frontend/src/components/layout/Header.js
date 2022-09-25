import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaTv } from "react-icons/fa";
import { MdLogin } from "react-icons/md";
import { GiArchiveRegister } from "react-icons/gi";

const Header = () => {
  return (
    <>
      <header className="header container">
        <div className="logo">Cinemax</div>
        <ul className="nav">
          <li>
            <Link to="/">
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link to="/films">
              <FaTv /> What's On?
            </Link>
          </li>
          <li>
            <Link to="/login">
              <MdLogin /> Login
            </Link>
          </li>
          <li>
            <Link to="/register">
              <GiArchiveRegister /> Register
            </Link>
          </li>
          <li>
            <Link to="">Check Out</Link>
          </li>
        </ul>
      </header>
    </>
  );
};

export default Header;
