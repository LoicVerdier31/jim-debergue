import React from "react";
import { Header } from "./app.jsx";
import "../App.css";
import "./app.jsx";

export function Contact() {
  return (
    <div className="App">
      <div>
        <Header></Header>
      </div>
      <div>
        <Contactcontain></Contactcontain>
      </div>
    </div>
  );
}

export function Contactcontain() {
  return (
    <div className="Contact-page">
      <div className="Contact-title">
        <p>Contact :</p>
      </div>
      <div className="Contact-email">
        <p>@ : jean.marc.debergue@gmail.com</p>
      </div>
    </div>
  );
}
