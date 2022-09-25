import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

//gain access to store state with provider
import { Provider } from "react-redux";
//store
import filmStore from "./features/films/film_store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={filmStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
