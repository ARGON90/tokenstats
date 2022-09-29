import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteTradeForm from "./DeleteTradeForm";
import "./DeleteTradeModal.css";

function DeleteTradeModal({ trade }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="delete-book-container">
        <button className="delete-book-button" onClick={() => setShowModal(true)}>
          Delete
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <DeleteTradeForm setShowModal={setShowModal} trade={trade} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default DeleteTradeModal;
