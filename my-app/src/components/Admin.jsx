import { useState, useEffect } from "react";
import React from "react";
import "../App.css";
import "./app.jsx";
import axios from "axios";
import GaleryModal from "./Galerymodal";

export function Admin() {
  return (
    <div className="admin-page">
      <div>
        <AdminForm></AdminForm>
        <div>
          <AdminList></AdminList>
        </div>
      </div>
    </div>
  );
}

export function AdminForm() {
  const [array, setArray] = useState({
    name: "",
    order: "",
    description: "",
    dimension: "",
    image: null,
    image2: null,
    image3: null,
    image4: null,
    type: "",
    type2: "",
    serial: "",
    year: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArray({ ...array, [name]: value });
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    setArray({ ...array, [fieldName]: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in array) {
      formData.append(key, array[key]);
    }

    axios
      .post("http://localhost:3030/api/formdata", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setArray({
          name: "",
          order: "",
          description: "",
          dimension: "",
          image: null,
          image2: null,
          image3: null,
          image4: null,
          type: "",
          type2: "",
          serial: "",
          year: "",
          price: "",
        });
      });
  };

  return (
    <div>
      <p className="admin-title">Interface Administrateur</p>
      <div className="admin-bloc">
        <div className="admin-form">
          <h1>Ajouter un tableau</h1>
          <form
            method="POST"
            encType="multipart/form-data"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <label htmlFor="name">Nom (obligatoire): </label>
            <input
              type="text"
              id="name"
              name="name"
              value={array.name || ""}
              onChange={(e) => {
                handleChange(e);
              }}
              required
            ></input>
            <br></br>
            <br></br>

            <label htmlFor="order">Ordre de rangement (obligatoire): </label>
            <input
              type="text"
              id="order"
              name="order"
              value={array.order || ""}
              onChange={(e) => {
                handleChange(e);
              }}
              required
            ></input>
            <br></br>
            <br></br>

            <label htmlFor="description">Description (obligatoire): </label>
            <textarea
              id="description"
              name="description"
              value={array.description || ""}
              rows="10"
              onChange={(e) => {
                handleChange(e);
              }}
              required
            ></textarea>
            <br></br>
            <br></br>

            <label htmlFor="dimension">Dimension (obligatoire): </label>
            <input
              type="text"
              id="dimension"
              name="dimension"
              value={array.dimension || ""}
              onChange={(e) => {
                handleChange(e);
              }}
              required
            ></input>
            <br></br>
            <br></br>

            <label htmlFor="image">Image (obligatoire): </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={(e) => {
                handleFileChange(e, "image");
              }}
              accept="image/*"
              required
            ></input>
            <br></br>
            <br></br>

            <label htmlFor="image2">Image avec fond (obligatoire): </label>
            <input
              type="file"
              id="image2"
              name="image2"
              onChange={(e) => {
                handleFileChange(e, "image2");
              }}
              accept="image/*"
              required
            ></input>
            <br></br>
            <br></br>

            <label htmlFor="image3">Image 2 : </label>
            <input
              type="file"
              id="image3"
              name="image3"
              onChange={(e) => {
                handleFileChange(e, "image3");
              }}
              accept="image/*"
            ></input>
            <br></br>
            <br></br>

            <label htmlFor="image4">Image 3 : </label>
            <input
              type="file"
              id="image4"
              name="image4"
              onChange={(e) => {
                handleFileChange(e, "image4");
              }}
              accept="image/*"
            ></input>
            <br></br>
            <br></br>

            <label htmlFor="type">type (obligatoire): </label>
            <input
              type="text"
              id="type"
              name="type"
              value={array.type || ""}
              onChange={(e) => {
                handleChange(e);
              }}
              required
            ></input>
            <br></br>
            <br></br>

            <label htmlFor="type2">type 2 : </label>
            <input
              type="text"
              id="type2"
              name="type2"
              value={array.type2 || ""}
              onChange={(e) => {
                handleChange(e);
              }}
            ></input>
            <br></br>
            <br></br>

            <label htmlFor="serial">Série : </label>
            <input
              type="text"
              id="serial"
              name="serial"
              value={array.serial || ""}
              onChange={(e) => {
                handleChange(e);
              }}
            ></input>
            <br></br>
            <br></br>

            <label htmlFor="year">Année de création : </label>
            <input
              type="text"
              id="year"
              name="year"
              value={array.year || ""}
              onChange={(e) => {
                handleChange(e);
              }}
            ></input>
            <br></br>
            <br></br>

            <label htmlFor="price">Prix : </label>
            <input
              type="text"
              id="price"
              name="price"
              step="0.01"
              value={array.price || ""}
              onChange={(e) => {
                handleChange(e);
              }}
            ></input>
            <br></br>
            <br></br>
            <input
              type="submit"
              value="Ajouter le Tableau à la galerie"
            ></input>
          </form>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export function AdminList() {
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
    <div className="admin-list">
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
              <p className="g-array-dimension">ordre : {array.order} ème</p>
              <hr></hr>
            </div>
          </div>
        ))}
      </div>
      <GaleryModal isOpen={isModalOpen} onClose={closeModal}>
        <AdminArray array={selectedArray}></AdminArray>
      </GaleryModal>
    </div>
  );
}

export function AdminArray({ array }) {
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
          className="array-main-pic"
          src={`data:image/webp;base64,${mainPic}`}
          alt={array.name}
        ></img>
        <div className="array-info">
          <div className="array-description">
            <p>Année (visible):</p>
            <p>Description (visible):</p> <br></br> {array.description}
          </div>
          <br></br>
          <br></br>
          <div className="array-dimension">
            <p>Dimensions (visibles) :</p>
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
          <div className="array-description">
            <p>Prix :</p>
            {array.price}
            <p>Type 1 :</p>
            {array.type}
            <p>Type 2 :</p>
            {array.type2}
            <p>Série :</p>
            {array.serial}
          </div>
        </div>
      </div>
    </div>
  );
}
