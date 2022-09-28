import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreatePortfolioForm from "./CreatePortfolioForm";

function CreatePortfolioModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="create-book-container">
        <button className="create-book-button" onClick={() => setShowModal(true)}>
          Create a Portfolio
        </button>
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
