import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateTradeForm from "./CreateTradeForm";

import './CreateTradeModal.css'

function CreateTradeModal({userPortfolios}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
        <div className="add-txn-button" onClick={() => setShowModal(true)}>
          ADD A TRANSACTION
        </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <CreateTradeForm setShowModal={setShowModal} userPortfolios={userPortfolios} />
          </Modal>
        )}
    </>
  );
}

export default CreateTradeModal;
