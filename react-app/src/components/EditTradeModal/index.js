import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditTradeForm from "./EditTradeForm";


import '../CSS/modalstyling.css';

function EditTradeModal({ trade }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>

    <img
    src='https://www.pngmart.com/files/8/Contract-Transparent-PNG.png'
    alt='edit'
    onClick={() => setShowModal(true)}
    className="delete-portfolio-image"
    >
    </img>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditTradeForm setShowModal={setShowModal} trade={trade} />
          </Modal>
        )}
    </>
  );
}

export default EditTradeModal;
