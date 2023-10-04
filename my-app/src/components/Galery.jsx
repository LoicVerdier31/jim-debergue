import React from "react";
import "../App.css";
import "./app.jsx";
import axios from "axios";
import { useState, useEffect } from "react";
import GaleryModal from "./Galerymodal";
import MainpicModal from "./MainpicModal";
import { Link } from "react-router-dom";

export function Galery() {
  return (
    <div className="galery-page">
      <div>
        <GaleryHeader></GaleryHeader>
        <GalerieContain></GalerieContain>
      </div>
    </div>
  );
}

export function GaleryHeader() {
  return (
    <header>
      <div className="galery-header">
        <GaleryMenu></GaleryMenu>
      </div>
    </header>
  );
}

export function GaleryMenu() {
  return (
    <div className="galery-menu">
      <hr></hr>
      <Link className="galery-menu-item" to="/jim-debergue">
        Accueil
      </Link>
      <Link className="galery-menu-item" to="/Galery">
        Galerie
      </Link>

      <Link className="galery-menu-item" to="/Artiste">
        L'artiste
      </Link>
      <Link className="galery-menu-item" to="/Contact">
        Contact
      </Link>
    </div>
  );
}

export function GalerieContain() {
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

  const handleClick = (array) => {
    setSelectedArray(array);
  };

  // Get Gallery data from database
  useEffect(() => {
    const fetchArrays = async () => {
      try {
        const response = await axios.get("http://localhost:3030/api/arrays", {
          mode: "cors",
        });
        const data = response.data;
        // Sort data for order display
        const sortedData = data.sort((a, b) => a.order - b.order);
        // Set state with array
        setArrays(sortedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
      }
    };

    fetchArrays();
  }, []);

  return (
    <div>
      <div className="galery-title">
        <p>Galerie</p>
      </div>
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
        <ArrayDetails array={selectedArray}></ArrayDetails>
      </GaleryModal>
    </div>
  );
}

export function ArrayDetails({ array }) {
  // Opening fullscreen array main pic
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  // Set main pic state
  const [mainPic, setMainPic] = useState(array.image);
  const handleMainPic = (e) => {
    const newMainPic = e.target.getAttribute("value");
    setMainPic(newMainPic);
  };
  return (
    <div className="array-page">
      <p className="array-title">{array.name}</p>

      <div className="array-pic">
        <img
          onClick={() => {
            openModal();
          }}
          className="array-main-pic"
          src={`data:image/webp;base64,${mainPic}`}
          alt={array.name}
        ></img>
        <div className="array-info">
          <div className="array-description">
            <p>Année :</p>
            <p>Description :</p> <br></br> {array.description}
          </div>
          <br></br>
          <br></br>
          <div className="array-dimension">
            <p>Dimensions :</p>
            <br></br>
            {array.dimension}
          </div>
          <hr></hr>
          <img
            src={`data:image/webp;base64,${array.image}`}
            value={array.image}
            onClick={(e) => handleMainPic(e)}
            alt={array.name}
          ></img>

          <img
            src={`data:image/webp;base64,${array.image2}`}
            value={array.image2}
            onClick={(e) => handleMainPic(e)}
            alt={array.name}
          ></img>

          <img
            src={`data:image/webp;base64,${array.image3}`}
            value={array.base64Data3}
            onClick={(e) => handleMainPic(e)}
            alt={array.name}
          ></img>

          <img
            src={`data:image/webp;base64,${array.image4}`}
            value={array.base64Data4}
            onClick={(e) => handleMainPic(e)}
            alt={array.name}
          ></img>
        </div>
      </div>
      <MainpicModal
        mainPic={mainPic}
        isOpen={isModalOpen}
        onClose={closeModal}
      ></MainpicModal>
    </div>
  );
}

export default Galery;
