import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateTradeForm from "./CreateTradeForm";

import './CreateTradeModal.css'

function CreateTradeModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="create-trade-container">
        <button className="create-trade-button" onClick={() => setShowModal(true)}>
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
