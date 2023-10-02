import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.js";
import axios from "axios";
import { ArrayDetails as LastArraysDetails } from "./components/Galery";
import GaleryModal from "./components/Galerymodal";

//images
import peintre from "./static/peintre-accueil.JPG";
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

      <a className="menu-item" href="./jim-debergue/Galery">
        Galerie
      </a>
      <a className="menu-item" href="./jim-debergue/Artiste">
        L'artiste
      </a>
      <a className="menu-item" href=".jim-debergue/Contact">
        Contact
      </a>
    </div>
  );
}

export function ArtistMain() {
  return (
    <body>
      <div className="artist-main">
        <div className="col1">
          <p className="main-text-title">Le peintre</p>
          <p className="main-text">
            Jim Debergue, de son vrai nom Jean-Marc Debergue, est un artiste
            toulousain.
          </p>
        </div>
        <div className="col2">
          <p className="main-text-title">Son art</p>
          <p className="main-text">
            Il crée ses œuvres à base de couches successives de peintures, de
            pigments, de liants et d’inclusions et développe ainsi la
            transparence et les volumes.
          </p>
        </div>
        <div className="col3">
          <img className="peintre-pic" src={peintre} alt="peintre"></img>
        </div>
      </div>
    </body>
  );
}

export function LastArrays() {
  const [arrays, setArrays] = useState([]);
  const [selectedArray, setSelectedArray] = useState(null);

  // Opening modal for Array-details
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // Use fetchArrays function
  useEffect(() => {
    fetchArrays();
  }, []);

  const handleClick = (array) => {
    setSelectedArray(array);
  };

  // Get Gallery data from database
  const fetchArrays = async () => {
    try {
      const response = await axios.get("http://localhost:3030/api/arrays", {
        mode: "cors",
      });
      const data = response.data;

      // Sort data for order display
      const sortedData = data.sort((a, b) => a.created_at - b.created_at);
      const lastArrays = sortedData.slice(-3);

      // Convert Bytea data to base64
      const arraysWithBase64 = lastArrays.map((array) => ({
        ...array,
        base64Data1: btoa(
          new Uint8Array(array.image.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        ),
        base64Data2: btoa(
          new Uint8Array(array.image2.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        ),
        base64Data3:
          array.image3 && array.image3.data
            ? btoa(
                new Uint8Array(array.image3.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              )
            : null,
        base64Data4:
          array.image4 && array.image4.data
            ? btoa(
                new Uint8Array(array.image4.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              )
            : null,
      }));

      // Set up state with got and converted data
      setArrays(arraysWithBase64);
    } catch (error) {
      console.error("Erreur lors de la récupération des données : ", error);
    }
  };
  return (
    <div className="last-work">
      <p className="main-text-title">Les dernieres oeuvres</p>

      <div className="galery">
        {arrays.map((array) => (
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
                src={`data:image/webp;base64,${array.base64Data2}`}
                alt={array.name}
              ></img>
              <img
                className="galerie-images-haut"
                src={`data:image/webp;base64,${array.base64Data1}`}
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

function App() {
  return (
    <div className="App">
      <Header></Header>
      <ArtistMain></ArtistMain>
      <LastArrays></LastArrays>
    </div>
  );
}

export default App;
