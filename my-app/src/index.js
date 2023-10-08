import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// routes
import { App } from "./components/app.jsx";
import { Artiste } from "./components/L'artiste.jsx";
import { Contact } from "./components/Contact.jsx";
import { Galery } from "./components/Galery.jsx";
import { Admin } from "./components/Admin.jsx";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Link to="/admin"></Link>
      <Routes>
        <Route path="/jim-debergue" element={<App />} />
        <Route path="/Artiste" element={<Artiste />} />
        <Route path="/Galery" element={<Galery />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
