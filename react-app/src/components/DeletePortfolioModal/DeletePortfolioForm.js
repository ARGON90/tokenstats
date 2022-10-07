import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserPortfoliosThunk, deletePortfolioThunk } from "../../store/portfolio-store";
import { deleteTradeThunk } from "../../store/trades-store";
import { useSelector } from "react-redux";

const DeletePortfolioForm = ({ setShowModal, portfolios, setPortfolios, portfolio, holdVal, setRerender, rerender, setCurrentPortfolio }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const allTrades = useSelector((state) => Object.values(state?.trades))
  let portfolioTrades = allTrades.filter(trade => trade?.portfolio_id === Number(portfolio.id))

  useEffect(() => {
    dispatch(getUserPortfoliosThunk());
  }, [dispatch]);

  const handleDelete = async (e) => {
    e.preventDefault();
    setShowModal(false);
    let mounted = true

    if (mounted) {
      for (let i = 0; i < portfolioTrades.length; i++) {
        await dispatch((deleteTradeThunk(portfolioTrades[i].id)))
        console.log('deleted TRADE', portfolioTrades[i].id)
      }
      let deletedPortfolio = await dispatch(deletePortfolioThunk(portfolio.id));
      // console.log('BEFORE PORTFOLIOS DELETION ', portfolios)
      // delete portfolios.id
      // setPortfolios({...portfolios})
      // console.log('AFTER PORTFOLIOS DELETION ', portfolios)

      // await dispatch(getUserPortfoliosThunk())
      // await dispatch(getUserTradesThunk())
      setCurrentPortfolio('all')
      console.log('DELETE PORTFOLIO FORM - LINE 25')

      if (deletedPortfolio) {
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
