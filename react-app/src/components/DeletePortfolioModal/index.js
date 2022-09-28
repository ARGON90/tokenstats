import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeletePortfolioForm from "./DeletePortfolioForm";
import "./DeletePortfolioModal.css";

function DeletePortfolioModal({ portfolio }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="delete-book-container">
        <button className="delete-book-button" onClick={() => setShowModal(true)}>
          Delete
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <DeletePortfolioForm setShowModal={setShowModal} portfolio={portfolio} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default DeletePortfolioModal;
