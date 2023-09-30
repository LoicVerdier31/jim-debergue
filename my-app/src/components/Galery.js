import React from "react";
import "../App.css";
import "../App.js";
import axios from "axios";
import { useState, useEffect } from "react";
import GaleryModal from "./Galerymodal";
import MainpicModal from "./MainpicModal";

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
      <a className="menu-item" href="./">
        Accueil
      </a>
      <a className="galery-menu-item" href="./Galery">
        Galerie
      </a>

      <a className="galery-menu-item" href="./Artiste">
        L'artiste
      </a>
      <a className="galery-menu-item" href="./Contact">
        Contact
      </a>
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
      const sortedData = data.sort((a, b) => a.order - b.order);

      // Convert Bytea data to base64
      const arraysWithBase64 = sortedData.map((array) => ({
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
  const [mainPic, setMainPic] = useState(array.base64Data1);
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
            src={`data:image/webp;base64,${array.base64Data1}`}
            value={array.base64Data1}
            onClick={(e) => handleMainPic(e)}
            alt={array.name}
          ></img>

          <img
            src={`data:image/webp;base64,${array.base64Data2}`}
            value={array.base64Data2}
            onClick={(e) => handleMainPic(e)}
            alt={array.name}
          ></img>

          <img
            src={`data:image/webp;base64,${array.base64Data3}`}
            value={array.base64Data3}
            onClick={(e) => handleMainPic(e)}
            alt={array.name}
          ></img>

          <img
            src={`data:image/webp;base64,${array.base64Data4}`}
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
