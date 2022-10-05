import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserTradesThunk, deleteTradeThunk } from "../../store/trades-store";


import './DeleteTradeModal.css'

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
      <div className="delete-trade-form">
        <div className="delete-trade-form-title">Are you sure you want to delete this trade?</div>
        <div className="delete-trade-modal-body">
          <div className="delete-portfolio-button-container">
            <button
              className="delete-trade-form-submit"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className="delete-trade-form-cancel-here"
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

export default DeleteTradeForm;
