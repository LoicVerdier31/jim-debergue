import React from "react";

// This is modal for Array-details
const GaleryModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={`modal-overlay`}>
      <div className="modal">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default GaleryModal;


