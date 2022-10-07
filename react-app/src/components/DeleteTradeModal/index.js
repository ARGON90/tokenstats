import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeleteTradeForm from "./DeleteTradeForm";

import "../CSS/modalstyling.css";


function DeleteTradeModal({ trade }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div

        className='delete-portfolio-image'
        onClick={() => setShowModal(true)}>
        <ion-icon name="trash"></ion-icon>
      </div>
      {/* <img
        src='https://images.vexels.com/media/users/3/223479/isolated/preview/8ecc75c9d0cf6d942cce96e196d4953f-trash-bin-icon-flat-by-vexels.png'
        alt='delete'
        onClick={() => setShowModal(true)}
        className='delete-portfolio-image'>
      </img> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteTradeForm setShowModal={setShowModal} trade={trade} />
        </Modal>
      )}
    </>
  );
}

export default DeleteTradeModal;
