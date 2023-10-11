import React, { useState, useEffect } from "react";
import "../App.css";
import "../index";
import { ArrayDetails as LastArraysDetails } from "./Galery";
import GaleryModal from "./Galerymodal";
import { Link } from "react-router-dom";
import { useCustomState } from "./ImportData";
import axios from "axios";
import { allowedIpAdress } from "../AllowedIp";

//images
import peintre from "../static/peintre-accueil.JPG";
// App

export function Header() {
  return (
    <header className="app-header">
      <div>
        <Menu></Menu>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <div className="app-footer">
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

export function Menu() {
  const [ipAddress, setIpAddress] = useState("");

  useEffect(() => {
    axios
      .get("https://api.ipify.org?format=json")
      .then((response) => {
        const ip = response.data.ip;
        setIpAddress(ip);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération de l'adresse IP :",
          error
        );
      });
  }, [ipAddress]);
  if (ipAddress === allowedIpAdress) {
    return (
      <div className="menu">
        <hr></hr>
        <Link to="/admin" className="menu-item">
          Admin
        </Link>

        <Link to="/Galery" className="menu-item">
          Galerie
        </Link>
        <Link to="/Artiste" className="menu-item">
          L'artiste
        </Link>
        <Link to="/Contact" className="menu-item">
          Contact
        </Link>
      </div>
    );
  } else {
    return (
      <div className="menu">
        <hr></hr>
        <Link to="/Galery" className="menu-item">
          Galerie
        </Link>
        <Link to="/Artiste" className="menu-item">
          L'artiste
        </Link>
        <Link to="/Contact" className="menu-item">
          Contact
        </Link>
      </div>
    );
  }
}

export function ArtistMain() {
  return (
    <body>
      <div className="artist-main">
        <div className="main-text">
          <div>
            <p className="main-text-title">Le peintre</p>
            <p>
              Jim Debergue, de son vrai nom Jean-Marc Debergue, est un artiste
              toulousain.
            </p>
          </div>
          <div>
            <p className="main-text-title">Son art</p>
            <p>
              Il crée ses œuvres à base de couches successives de peintures, de
              pigments, de liants et d’inclusions et développe ainsi la
              transparence et les volumes.
            </p>
          </div>
        </div>
        <img className="peintre-pic" src={peintre} alt="peintre"></img>
      </div>
    </body>
  );
}

export function LastArrays() {
  const { arrays } = useCustomState();
  const [selectedArray, setSelectedArray] = useState(null);
  const [lastArrays, setLastArrays] = useState(arrays);

  // Opening modal for Array-details

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Set selected array for details

  const handleClick = (array) => {
    setSelectedArray(array);
  };
  // Set last arrays
  useEffect(() => {
    const sortedData = [...arrays].sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateA - dateB;
    });
    const lastCreatedAt = sortedData.slice(-3);
    setLastArrays(lastCreatedAt);
  }, [arrays]);

  return (
    <div className="last-work">
      <p className="main-text-title">Les dernieres oeuvres</p>

      <div className="galery">
        {lastArrays.map((array) => (
          <div className="array" key={array.id}>
            <div
              className="fondu"
              value={array}
              onClick={() => {
                handleClick(array);
                openModal();
              }}
            >
              <img
                className="galerie-images-bas"
                src={`data:image/webp;base64,${array.image2}`}
                alt={array.name}
              ></img>
              <img
                className="galerie-images-haut"
                src={`data:image/webp;base64,${array.image}`}
                alt={array.name}
              ></img>
            </div>

            <div>
              <p className="g-array-title">{array.name}</p>
              <p className="g-array-dimension">{array.dimension}</p>
              <hr></hr>
            </div>
          </div>
        ))}
      </div>
      <GaleryModal isOpen={isModalOpen} onClose={closeModal}>
        <LastArraysDetails array={selectedArray}></LastArraysDetails>
      </GaleryModal>
    </div>
  );
}

export function App() {
  return (
    <div className="App">
      <Header></Header>

      <ArtistMain></ArtistMain>
      <LastArrays></LastArrays>
      <Footer></Footer>
    </div>
  );
}

export default App;
