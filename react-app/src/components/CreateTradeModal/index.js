import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateTradeForm from "./CreateTradeForm";

function CreateTradeModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="create-book-container">
        <button className="create-book-button" onClick={() => setShowModal(true)}>
          Add a Transaction
        </button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <CreateTradeForm setShowModal={setShowModal} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default CreateTradeModal;
