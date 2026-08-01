import React, { useState } from "react";
import "./confirmAddModal.css";
function ConfirmAddModal() {
  const [showingModal, setShowingModal] = useState(false);
  const toggleModal = () => {
    setShowingModal((prevState) => !prevState);
  };
  return (
    <>
      <button className="btn-modal" onClick={toggleModal}>
        Open
      </button>
    </>
  );
}

export default ConfirmAddModal;
