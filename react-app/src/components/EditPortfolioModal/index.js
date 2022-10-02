import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditPortfolioForm from "./EditPortfolioForm";


import "./EditPortfolioModal.css";

function EditPortfolioModal({ portfolio }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="edit-book-container">
        <button
          className="edit-button"
          onClick={() => setShowModal(true)}
        >
          Edit
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditPortfolioForm setShowModal={setShowModal} portfolio={portfolio} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default EditPortfolioModal;
