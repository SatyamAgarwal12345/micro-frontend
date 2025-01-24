import React from "react";
import ReactDOM from "react-dom/client";

import "./index.scss";
import Cake from "./components/Cake";
import { Provider } from "react-redux"
import store from "./redux/store";

const App = () => (
  <Provider store={store} >
    <Cake />
  </Provider>
);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)