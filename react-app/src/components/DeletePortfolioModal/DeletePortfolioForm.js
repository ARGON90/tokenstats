import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserPortfoliosThunk, deletePortfolioThunk } from "../../store/portfolio-store";

const DeleteBookForm = ({ setShowModal, portfolio }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getUserPortfoliosThunk());
  }, [dispatch]);

  const handleDelete = async (e) => {
    e.preventDefault();
    let deletedPortfolio = await dispatch(deletePortfolioThunk(portfolio.id));

    if (deletedPortfolio) {
      setShowModal(false);
      history.push("/home");
      return null
    }
    return null
  };

  return (
    <>
      <div className="delete-book-form">
        <div className="delete-book-form-title">Are you sure you want to delete this portfolio?</div>
        <div className="delete-book-modal-body">
          <button
            className="delete-book-form-delete-button"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="delete-book-form-cancel-button"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteBookForm;
