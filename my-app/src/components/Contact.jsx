import React from "react";
import "../App.css";
import "./app.jsx";
import { GaleryHeader as ContactHeader } from "./Galery.jsx";

export function Contact() {
  return (
    <div className="contact-page">
      <div>
        <ContactHeader></ContactHeader>
      </div>
      <div>
        <Contactcontain></Contactcontain>
      </div>
    </div>
  );
}

export function Contactcontain() {
  return (
    <div className="contact-bloc">
      <p className="contact-title">Contactez Jim Debergue </p>
      <p className="contact-text">
        Vous avez des question sur des oeuvres ou souhaitez me contacter pour
        une collaboration ?<br></br>
        <br></br>
        N'hesitez pas à m'envoyer un message !
      </p>
      <div className="contact-email">
        <a href="mailto:jean.marc.debergue@gmail.com">
          jean.marc.debergue@gmail.com
        </a>
      </div>
      <div className="insta">
        <a
          href="https://www.instagram.com/jim.debergue/"
          target="_blank"
          rel="noreferrer"
        >
          jim.debergue
        </a>
      </div>
      <div className="facebook">
        <a
          href="https://www.facebook.com/JMDart31/"
          target="_blank"
          rel="noreferrer"
        >
          jim.debergue
        </a>
      </div>
    </div>
  );
}
