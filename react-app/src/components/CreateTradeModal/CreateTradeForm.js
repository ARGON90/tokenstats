import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createPortfolioThunk } from "../../store/portfolio-store";

import "./CreateTradeModal.css"


const CreatePortfolioForm = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [errors, setErrors] = useState({
        name: "",
    });
    const [tokenId, setTokenId] = useState("");
    const [buySell, setBuySell] = useState("Buy");
    const [tradeAmount, setTradeAmount] = useState("");

    const updateTokenId = (e) => setTokenId(e.target.value);
    const updateBuySell = (e) => setBuySell(e.target.value);
    const updateTradeAmount = (e) => setTradeAmount(e.target.value);


    useEffect(() => {
        const newErrors = {};

        if (!tokenId) newErrors.tokenId = "Token Id is required."
        if (!tradeAmount) {
            newErrors.tradeAmount = "Trade Amount is required and must be greater than 0."}
        //  else if (tradeAmount <= 0) {
        //      newErrors.tradeAmount = "Trade Amount must be greater than 0.";
        //  }

        setErrors(newErrors);
    }, [tokenId], [tradeAmount]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let buyBool;
        if (buySell === 'Buy') {
            buyBool = true
        } else {
            buyBool = false
        }

        const data = {
            amount_traded: tradeAmount,
            buy: buyBool,
            token_id: tokenId,
            portfolio_id: 1,
            token_name: 'bitcoin',
            trade_price: 19444,
            user_id: 1
        };

        const createdPortfolio = await dispatch(createPortfolioThunk(data));

        if (createdPortfolio) {
            setErrors([]);
            setShowModal(false);
            history.push("/tokens");
        }
    };

    return (
        <>
            <form className="create-book-form" onSubmit={handleSubmit}>
                <div className="create-book-form-title">Add a Transaction</div>
                <div className="create-book-form-body-separator-top"></div>
                <div className="create-book-modal-body">
                    <label className="create-book-form-label">Token Id</label>
                    <input
                        className="create-book-form-input"
                        type="string"
                        placeholder="TokenId"
                        required
                        value={tokenId}
                        onChange={updateTokenId}
                    />
                    <div className="edit-book-form-error-message">{errors?.tokenId}</div>
                    <label className="create-book-form-label">Buy or Sell?</label>
                    <select
                        className="create-book-form-input"
                        placeholder="Select One"
                        required
                        value={buySell}
                        onChange={updateBuySell}
                    >
                    <option value='buy'> Buy </option>
                    <option value='sell' > Sell </option>
                    </select>
                    <div className="edit-book-form-error-message">{errors?.name}</div>
                    <label className="create-book-form-label">Amount of Token Bought/Sold</label>
                    <input
                        className="create-book-form-input"
                        type="number"
                        placeholder="Amount to Trade"
                        required
                        value={tradeAmount}
                        onChange={updateTradeAmount}
                    />
                    <div className="edit-book-form-error-message">{errors?.tradeAmount}</div>
                </div>
                <div className="create-book-form-body-separator-bottom"></div>

                <div className="create-book-form-button-container">
                    <button
                        className="create-book-form-submit"
                        type="submit"
                        disabled={
                            Object.values(errors).every((x) => x === "") ? false : true
                        }
                    >
                        Submit
                    </button>
                    <button
                        className="create-book-form-cancel"
                        onClick={() => setShowModal(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </>
    );
};

export default CreatePortfolioForm;
