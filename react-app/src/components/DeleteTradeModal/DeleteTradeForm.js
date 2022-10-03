import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserTradesThunk, deleteTradeThunk } from "../../store/trades-store";

const DeleteTradeForm = ({ setShowModal, trade }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getUserTradesThunk());
  }, [dispatch]);

  const handleDelete = async (e) => {
    e.preventDefault();
    setShowModal(false);
    let mounted = true

    if (mounted) {
      let deletedTrade = await dispatch(deleteTradeThunk(trade.id));

      if (deletedTrade) {
        history.push("/home");
      }
    }

    return () => mounted = false
  };

  return (
    <>
      <div className="delete-book-form">
        <div className="delete-book-form-title">Are you sure you want to delete this trade?</div>
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

export default DeleteTradeForm;
