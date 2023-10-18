import React, { useState, useEffect } from "react";
import "../App.css";
import "../index";
import { ArrayDetails as LastArraysDetails } from "./Galery";
import GaleryModal from "./Galerymodal";
import { Link } from "react-router-dom";
import axios from "axios";
import { allowedIpAdress } from "./AllowedIp";

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
  );
}

export function LastArrays() {
  const [selectedArray, setSelectedArray] = useState([]);
  const [lastArrays, setLastArrays] = useState([]);
  const [mainPic, setMainPic] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://server.jim-debergue.fr/api/arrays",
          {
            params: {
              $sort: {
                created_at: -1,
              },
              $limit: 3,
              $select: [
                "id",
                "name",
                "dimension",
                "imagecompressed",
                "image2compressed",
              ],
            },
            mode: "cors",
          }
        );
        const data = response.data;
        setLastArrays(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
      }
    };

    fetchData();
  }, []);

  // Opening modal for Array-details

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    fetchSelectedArray();
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedArray([]);
    setMainPic("");
    setModalOpen(false);
  };

  // Set selected array for details

  const fetchSelectedArray = async (arrayId) => {
    try {
      const response = await axios.get(
        `https://server.jim-debergue.fr/api/arrays/${arrayId}`,
        {
          params: {
            $select: [
              "id",
              "name",
              "description",
              "dimension",
              "year",
              "image",
              "image2",
              "image3",
              "image4",
            ],
          },
          mode: "cors",
        }
      );
      const arrayData = response.data;
      setSelectedArray(arrayData);
      setMainPic(arrayData.image);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données du tableau sélectionné : ",
        error
      );
    }
  };

  // Select array function
  const handleClick = (array) => {
    fetchSelectedArray(array.id);
  };

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
                src={`data:image/webp;base64,${array.image2compressed}`}
                alt={array.name}
              ></img>
              <img
                className="galerie-images-haut"
                src={`data:image/webp;base64,${array.imagecompressed}`}
                alt={array.name}
              ></img>
            </div>

            <div className="g-array-text" >
              <p className="g-array-title">{array.name}</p>
              <p className="g-array-dimension">{array.dimension}</p>
              <hr></hr>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && selectedArray.id && (
        <GaleryModal isOpen={isModalOpen} onClose={closeModal}>
          <LastArraysDetails
            array={selectedArray}
            mainPic={mainPic}
          ></LastArraysDetails>
        </GaleryModal>
      )}
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
