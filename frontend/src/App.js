import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//features
import Films from "./features/films/Films";
import Home from "./features/home/Home";
import Login from "./features/login/Login";
import Register from "./features/register/Register";

//@styles layout
import "../src/styles/components/header.scss";
import "../src/styles/components/footer.scss";
import "../src/styles/components/layout.scss";
//@styles features
import "../src/styles/features/home/home.scss";
import "../src/styles/features/films/films.scss";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/films" element={<Films />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
