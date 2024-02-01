import { useState, useEffect } from "react";
import React from "react";
import "../App.css";
import "./app.jsx";
import axios from "axios";
import GaleryModal from "./Galerymodal";
import { Link } from "react-router-dom";

export function Admin() {
  return (
    <div className="admin-page">
      <div>
        <AdminMenu></AdminMenu>
        <AdminForm></AdminForm>
        <AdminList></AdminList>
      </div>
    </div>
  );
}

export function AdminMenu() {
  return (
    <div className="admin-menu">
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
      .post("https://back.jim-debergue.fr/api/formdata", formData, {
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
              className="array-submit"
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
  const [selectedArray, setSelectedArray] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [mainPic, setMainPic] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://back.jim-debergue.fr/api/arrays",
        {
          params: {
            $sort: {
              order: -1,
            },

            $select: [
              "id",
              "name",
              "order",
              "imagecompressed",
              "image2compressed",
            ],
          },
          mode: "cors",
        }
      );
      const data = response.data;
      setArrays(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données : ", error);
    }
  };

  const openModal = (arrayId) => {
    fetchSelectedArray(arrayId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedArray([]);
    setMainPic("");
    fetchData();
    setModalOpen(false);
  };

  const fetchSelectedArray = async (arrayId) => {
    try {
      const response = await axios.get(
        `https://back.jim-debergue.fr/api/arrays/${arrayId}`,
        {
          params: {
            $select: [
              "id",
              "name",
              "order",
              "description",
              "dimension",
              "year",
              "image",
              "image2",
              "image3",
              "image4",
              "type",
              "type2",
              "price",
              "serial",
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
  const handleClick = (array) => {
    fetchSelectedArray(array.id);
    openModal();
  };

  return (
    <div className="admin-list">
      <div className="galery">
        {arrays.map((array) => (
          <div className="array" key={array.id}>
            <div
              className="fondu"
              value={array}
              onClick={() => handleClick(array)}
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

            <div>
              <p className="g-array-title">{array.name}</p>
              <p className="g-array-dimension">ordre : {array.order} ème</p>
              <hr></hr>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && selectedArray.id && (
        <GaleryModal isOpen={isModalOpen} onClose={closeModal}>
          <AdminArray
            array={selectedArray}
            closeModal={closeModal}
            fetchData={fetchData}
            mainPic={mainPic}
          ></AdminArray>
        </GaleryModal>
      )}
    </div>
  );
}

export function AdminArray({ array, closeModal, fetchData }) {
  // Set main pic state
  const [mainPic, setMainPic] = useState(array.image);
  const handleMainPic = (e) => {
    const newMainPic = e.target.getAttribute("value");
    setMainPic(newMainPic);
  };

  // State to create a modified array object
  const [modifiedArray, setModifiedArray] = useState(array);

  // States for edition mode
  const [editDescription, setEditDescription] = useState(false);
  const [editOrder, setEditOrder] = useState(false);
  const [editYear, setEditYear] = useState(false);
  const [editDimension, setEditDimension] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editType, setEditType] = useState(false);
  const [editType2, setEditType2] = useState(false);
  const [editPrice, setEditPrice] = useState(false);
  const [editSerial, setEditSerial] = useState(false);

  // handler to make fields on modif or not
  const toggleEditName = () => {
    setEditName(!editName);
  };
  const toggleEditOrder = () => {
    setEditOrder(!editOrder);
  };
  const toggleEditDescription = () => {
    setEditDescription(!editDescription);
  };
  const toggleEditYear = () => {
    setEditYear(!editYear);
  };
  const toggleEditDimension = () => {
    setEditDimension(!editDimension);
  };
  const toggleEditType = () => {
    setEditType(!editType);
  };
  const toggleEditType2 = () => {
    setEditType2(!editType2);
  };
  const toggleEditPrice = () => {
    setEditPrice(!editPrice);
  };
  const toggleEditSerial = () => {
    setEditSerial(!editSerial);
  };

  // Function to set up modifications
  const handleSave = (e) => {
    e.preventDefault();
    const updatedArray = {
      id: modifiedArray.id,
      name: modifiedArray.name,
      order: modifiedArray.order,
      year: modifiedArray.year,
      description: modifiedArray.description,
      dimension: modifiedArray.dimension,
      type: modifiedArray.type,
      type2: modifiedArray.type2,
      price: modifiedArray.price,
      serial: modifiedArray.serial,
    };

    axios.post("https://back.jim-debergue.fr/api/modif", updatedArray, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  // Function to delete arrays
  const handleDelete = (e) => {
    const deletedArray = {
      id: array.id,
    };
    axios.post("https://back.jim-debergue.fr/api/delete", deletedArray, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    closeModal();
  };
  return (
    <div className="array-page">
      {/* modification du nom */}
      <form
        method="POST"
        encType="multipart/form-data"
        onSubmit={(e) => {
          handleSave(e);
        }}
      >
        <div>
          {editName ? (
            <input
              type="text"
              id="name"
              name="name"
              value={modifiedArray.name}
              onChange={(e) =>
                setModifiedArray({
                  ...modifiedArray,
                  name: e.target.value,
                })
              }
            ></input>
          ) : (
            <span className="array-title">{modifiedArray.name}</span>
          )}
          <button onClick={toggleEditName}>
            {editName ? (
              <button className="save-icon"></button>
            ) : (
              <button className="modifier"></button>
            )}
          </button>
        </div>
        <div className="array-pic">
          <img
            className="array-main-pic"
            src={`data:image/webp;base64,${mainPic}`}
            alt={array.name}
          ></img>
          <div className="array-info">
            {/* modification de l'ordre */}

            <div>
              <p>Ordre :</p>
              {editOrder ? (
                <input
                  type="text"
                  id="order"
                  name="order"
                  value={modifiedArray.order}
                  onChange={(e) =>
                    setModifiedArray({
                      ...modifiedArray,
                      order: e.target.value,
                    })
                  }
                ></input>
              ) : (
                <span>{modifiedArray.order}</span>
              )}
              <button onClick={toggleEditOrder}>
                {editOrder ? (
                  <button className="save-icon"></button>
                ) : (
                  <button className="modifier"></button>
                )}
              </button>
            </div>
            {/* modification de l'année */}
            <div>
              <p>Année (visible):</p>
              {editYear ? (
                <input
                  type="text"
                  id="year"
                  name="year"
                  value={modifiedArray.year}
                  onChange={(e) =>
                    setModifiedArray({
                      ...modifiedArray,
                      year: e.target.value,
                    })
                  }
                ></input>
              ) : (
                <span>{modifiedArray.year}</span>
              )}
              <button onClick={toggleEditYear}>
                {editYear ? (
                  <button className="save-icon"></button>
                ) : (
                  <button className="modifier"></button>
                )}
              </button>
            </div>

            {/* modification de la description */}

            <div>
              <p>Description (visible):</p>
              {editDescription ? (
                <textarea
                  value={modifiedArray.description}
                  onChange={(e) =>
                    setModifiedArray({
                      ...modifiedArray,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              ) : (
                <span>{modifiedArray.description}</span>
              )}
              <button onClick={toggleEditDescription}>
                {editDescription ? (
                  <button className="save-icon"></button>
                ) : (
                  <button className="modifier"></button>
                )}
              </button>
            </div>
            <br></br>
            <br></br>
            {/* modification de la dimension */}

            <div>
              <p>Dimensions (visible):</p>
              {editDimension ? (
                <input
                  type="text"
                  id="dimension"
                  name="dimension"
                  value={modifiedArray.dimension}
                  onChange={(e) =>
                    setModifiedArray({
                      ...modifiedArray,
                      dimension: e.target.value,
                    })
                  }
                ></input>
              ) : (
                <span>{modifiedArray.dimension}</span>
              )}
              <button onClick={toggleEditDimension}>
                {editDimension ? (
                  <button className="save-icon"></button>
                ) : (
                  <button className="modifier"></button>
                )}
              </button>
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
              value={array.image3}
              onClick={(e) => handleMainPic(e)}
              alt={array.name}
            ></img>

            <img
              src={`data:image/webp;base64,${array.image4}`}
              value={array.image4}
              onClick={(e) => handleMainPic(e)}
              alt={array.name}
            ></img>
            <div className="array-description">
              {/* modification du type  */}

              <div>
                <p>Type 1 :</p>
                {editType ? (
                  <input
                    type="text"
                    id="type"
                    name="type"
                    value={modifiedArray.type}
                    onChange={(e) =>
                      setModifiedArray({
                        ...modifiedArray,
                        type: e.target.value,
                      })
                    }
                  ></input>
                ) : (
                  <span>{modifiedArray.type}</span>
                )}
                <button onClick={toggleEditType}>
                  {editType ? (
                    <button className="save-icon"></button>
                  ) : (
                    <button className="modifier"></button>
                  )}
                </button>
              </div>
              {/* modification du Type 2 */}

              <div>
                <p>Type 2:</p>
                {editType2 ? (
                  <input
                    type="text"
                    id="type2"
                    name="type2"
                    value={modifiedArray.type2}
                    onChange={(e) =>
                      setModifiedArray({
                        ...modifiedArray,
                        type2: e.target.value,
                      })
                    }
                  ></input>
                ) : (
                  <span>{modifiedArray.type2}</span>
                )}
                <button onClick={toggleEditType2}>
                  {editType2 ? (
                    <button className="save-icon"></button>
                  ) : (
                    <button className="modifier"></button>
                  )}
                </button>
              </div>
              {/* modification du prix */}

              <div>
                <p>Prix :</p>
                {editPrice ? (
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={modifiedArray.price}
                    onChange={(e) =>
                      setModifiedArray({
                        ...modifiedArray,
                        price: e.target.value,
                      })
                    }
                  ></input>
                ) : (
                  <span>{modifiedArray.price}</span>
                )}
                <button onClick={toggleEditPrice}>
                  {editPrice ? (
                    <button className="save-icon"></button>
                  ) : (
                    <button className="modifier"></button>
                  )}
                </button>
              </div>
              {/* modification de la Série */}

              <div>
                <p>Serie :</p>
                {editSerial ? (
                  <input
                    type="text"
                    id="serial"
                    name="serial"
                    value={modifiedArray.serial}
                    onChange={(e) =>
                      setModifiedArray({
                        ...modifiedArray,
                        serial: e.target.value,
                      })
                    }
                  ></input>
                ) : (
                  <span>{modifiedArray.serial}</span>
                )}
                <button onClick={toggleEditSerial}>
                  {editSerial ? (
                    <button className="save-icon"></button>
                  ) : (
                    <button className="modifier"></button>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          className="delete"
          onClick={(e) => {
            handleDelete();
          }}
        >
          Supprimer le tableau
        </button>
      </form>
    </div>
  );
}

export default Admin;
