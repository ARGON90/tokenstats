import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditPortfolioForm from "./EditPortfolioForm";

import '../CSS/modalstyling.css'


function EditPortfolioModal({ portfolio }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div>
        <div

          className='delete-portfolio-image'
          onClick={() => setShowModal(true)}>
          <ion-icon name="create"></ion-icon>
        </div>
        {/* <img src='https://www.pngmart.com/files/8/Contract-Transparent-PNG.png'
          className="edit-portfolio-image"
          onClick={() => setShowModal(true)}
          alt='edit'></img> */}
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
