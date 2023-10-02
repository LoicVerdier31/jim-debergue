import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// routes
import { Artiste } from "./components/L'artiste";
import { Contact } from "./components/Contact";
import { Galery } from "./components/Galery";
import { Admin } from "./components/Admin";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/jim-debergue" element={<App />} />
        <Route path="/jim-debergue/Artiste" element={<Artiste />} />
        <Route path="/jim-debergue/Galery" element={<Galery />} />
        <Route path="/jim-debergue/Contact" element={<Contact />} />
        <Route path="/jim-debergue/Admin" element={<Admin />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
