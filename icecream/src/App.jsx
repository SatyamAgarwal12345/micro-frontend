import React from "react";
import ReactDOM from "react-dom/client";


import "./index.scss";
import IceCream from "./components/IceCream";
import { Provider } from "react-redux"
import store from "./redux/store";
import NewIC from "./components/newIC";

const App = () => (

  <NewIC />

);
const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)