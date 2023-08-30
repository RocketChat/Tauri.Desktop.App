import React from "react"
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/index"
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)