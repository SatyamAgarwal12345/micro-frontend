import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import CakeComponent from "cakeMf/Cake"
import IceCreamComponent from "iceCreamMf/IceCream"
import CakeCart from './components/CakeCart'
import IceccreamCart from './components/IcecreamCart'
import "./index.scss"
const App = () => {
  return (
    <>
    <div className="mt-10 text-3xl mx-auto max-w-6xl flex  ">
    <CakeCart/>
    <IceccreamCart/>
    </div>
    
    <div className="mt-10 text-3xl mx-auto max-w-6xl flex items-center justify-center space-x-4">
      <CakeComponent />
      <IceCreamComponent />
    </div>
    </>
  );
}

const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)