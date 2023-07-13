import React from "react"
import { Shell } from "./shell/index"
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/index"

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Shell/>
    </Provider>
  </React.StrictMode>
)
