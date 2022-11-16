import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import "./index.css";
const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
  }, []);
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default App;
