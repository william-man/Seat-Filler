import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//features
import App from "./App";
import Films from "./features/films/Films";
import Film from "./features/films/Film";
import Home from "./features/home/Home";
import Login from "./features/login/Login";
import Register from "./features/register/Register";
import Redirect from "./features/redirect/Redirect";
import Checkout from "./features/checkout/Checkout";

//@styles layout
import "../src/styles/components/header.scss";
import "../src/styles/components/footer.scss";
import "../src/styles/components/layout.scss";
//@styles toast
import "react-toastify/dist/ReactToastify.css";
//@styles features
import "../src/styles/features/home/home.scss";
import "../src/styles/features/films/films.scss";

//gain access to store state with provider
import { Provider } from "react-redux";
//store
import store from "./features/store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="home" element={<Home />} />
            <Route path="films">
              <Route index element={<Films />}></Route>
              <Route path=":film_name">
                <Route index element={<Film />}></Route>
                <Route path="checkout">
                  <Route index element={<Checkout />}></Route>
                </Route>
              </Route>
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<Redirect />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </>
);
