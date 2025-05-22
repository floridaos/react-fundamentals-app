// Module 2:
// * import BrowserRouter from 'react-router-dom'
// * wrap App components with BrowserRouter
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// Module 3:
// * import Provider from 'react-redux'
// * wrap your App + Browser with Redux Provider in src/index.js
