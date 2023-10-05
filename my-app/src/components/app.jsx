import React, { useState, useEffect } from "react";
import "../App.css";
import "../index";
import { ArrayDetails as LastArraysDetails } from "./Galery";
import GaleryModal from "./Galerymodal";
import { Link } from "react-router-dom";
import { useCustomState } from "./ImportData";

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

export function Menu() {
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
  const sortedData = arrays.sort((a, b) => a.created_at - b.created_at); 
  const lastCreatedAt = sortedData.slice(-3); 
  setLastArrays(lastCreatedAt) 
   
 }) 

  
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
    </div>
  );
}

export default App;
