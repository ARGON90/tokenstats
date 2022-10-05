import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import DeletePortfolioForm from "./DeletePortfolioForm";
import "./DeletePortfolioModal.css";

function DeletePortfolioModal({ portfolio, portfolios, setRerender, rerender, holdVal, setPortfolios, setCurrentPortfolio }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div>
        <img
        src='https://images.vexels.com/media/users/3/223479/isolated/preview/8ecc75c9d0cf6d942cce96e196d4953f-trash-bin-icon-flat-by-vexels.png'
        className="delete-portfolio-image"
        onClick={() => setShowModal(true)}
        ></img>

        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <DeletePortfolioForm setShowModal={setShowModal} portfolios={portfolios} setPortfolios={setPortfolios} portfolio={portfolio} holdVal={holdVal} setCurrentPortfolio={setCurrentPortfolio} setRerender={setRerender} rerender={rerender} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default DeletePortfolioModal;
