import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreatePortfolioForm from "./CreatePortfolioForm";

import './CreatePortfolioModal.css'

function CreatePortfolioModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="create-portfolio-button-container-main-page">
        <div className="create-portfolio-button" onClick={() => setShowModal(true)}>
          Create a Portfolio
        </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <CreatePortfolioForm setShowModal={setShowModal} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default CreatePortfolioModal;
