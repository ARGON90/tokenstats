import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditTradeForm from "./EditTradeForm";


import "./EditTradeModal.css";

function EditTradeModal({ trade }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="edit-book-container">
        <button
          className="edit-book-button"
          onClick={() => setShowModal(true)}
        >
          Edit
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditTradeForm setShowModal={setShowModal} trade={trade} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default EditTradeModal;
