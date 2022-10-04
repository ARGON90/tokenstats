import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserPortfoliosThunk, deletePortfolioThunk } from "../../store/portfolio-store";
import { getUserTradesThunk } from "../../store/trades-store";

const DeletePortfolioForm = ({ setShowModal, portfolio, holdVal, setRerender, rerender }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getUserPortfoliosThunk());
  }, [dispatch]);

  const handleDelete = async (e) => {
    e.preventDefault();
    setShowModal(false);
    let mounted = true

    if (mounted) {
      let deletedPortfolio = await dispatch(deletePortfolioThunk(portfolio.id));

      if (deletedPortfolio) {
        console.log('DELETE PORTFOLIO FORM - LINE 24')
        await dispatch(getUserPortfoliosThunk())
        await dispatch(getUserTradesThunk())
        history.push("/home")
        console.log(rerender, 'RERENDER BOOL', 'DEL TRADE FORM')
        holdVal()
        console.log(holdVal())
        setRerender(!rerender)
      }
    }

    return () => mounted = false;
  };

  return (
    <>
      <div className="delete-portfolio-form">
        <div className="delete-portfolio-form-title">Are you sure you want to delete this portfolio?</div>
        <div className="delete-portfolio-modal-body">
          <div className="delete-portfolio-button-container">
            <button
              className="delete-portfolio-form-submit"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="delete-portfolio-form-cancel-here"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeletePortfolioForm;
