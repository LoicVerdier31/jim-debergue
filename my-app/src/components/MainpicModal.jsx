import React from "react";

const MainpicModal = ({ isOpen, onClose, mainPic }) => {
  if (!isOpen) {
    return null;
  }
  const modalStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  };

  const imageStyle = {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  };

  return (
    <div style={modalStyle} onClick={onClose} className="mainpicmodal">
      <div className="modal-main-pic">
        <img
          onClick={onClose}
          className="zoom-pic"
          src={`data:image/webp;base64,${mainPic}`}
          alt=" en plein écran"
          style={imageStyle}
        ></img>
      </div>
    </div>
  );
};

export default MainpicModal;
