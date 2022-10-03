import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditPortfolioForm from "./EditPortfolioForm";

import '../CSS/modalstyling.css'


function EditPortfolioModal({ portfolio }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="edit-book-container">
      <img src='https://www.pngmart.com/files/8/Contract-Transparent-PNG.png'
      className="edit-portfolio-image"
      onClick={() => setShowModal(true)}
      alt='edit'></img>
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
