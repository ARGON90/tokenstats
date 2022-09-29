import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateTradeThunk } from "../../store/trades-store";

import "./EditTradeModal.css"


const CreatePortfolioForm = ({ setShowModal, trade }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [errors, setErrors] = useState({
        name: "",
    });
    const [tokenId, setTokenId] = useState(trade.token_id);
    const [buySell, setBuySell] = useState(trade.buy);
    const [tradeAmount, setTradeAmount] = useState(trade.amount_traded);

    const updateTokenId = (e) => setTokenId(e.target.value);
    const updateBuySell = (e) => setBuySell(e.target.value);
    const updateTradeAmount = (e) => setTradeAmount(e.target.value);

    console.log(buySell, "buysell")

    useEffect(() => {
        const newErrors = {};

        if (!tokenId) newErrors.tokenId = "Token Id is required."


        console.log(newErrors)
        setErrors(newErrors);
    }, [tokenId]);

    const handleSubmit = async (e) => {
        e.preventDefault();



        const data = {
            id: trade.id,
            amount_traded: tradeAmount,
            buy: buySell,
            token_id: tokenId,
            portfolio_id: 1,
            token_name: 'bitcoin',
            trade_price: 19460,
            user_id: 1
        };

        const updatedTrade = await dispatch(updateTradeThunk(data));

        if (updatedTrade) {
            setErrors([]);
            setShowModal(false);
            history.push("/tokens");
        }
    };

    return (
        <>
            <form className="edit-book-form" onSubmit={handleSubmit}>
                <div className="edit-book-form-title">Edit this Transaction</div>
                <div className="create-book-form-body-separator-top"></div>
                <div className="edit-book-form-body-separator-top">
                    <label className="edit-book-form-label">Token Id</label>
                    <input
                        className="edit-book-form-input"
                        type="string"
                        placeholder="TokenId"
                        required
                        value={tokenId}
                        onChange={updateTokenId}
                    />
                    <div className="edit-book-form-error-message">{errors?.tokenId}</div>
                    <label className="edit-book-form-label">Buy or Sell?</label>
                    <select
                        className="edit-book-form-input"
                        placeholder="Select One"
                        required
                        value={buySell}
                        onChange={updateBuySell}
                    >
                    <option value='buy'> Buy </option>
                    <option value='sell'> Sell </option>
                    </select>
                    <div className="edit-book-form-error-message">{errors?.name}</div>
                    <label className="edit-book-form-label">Amount of Token Bought/Sold</label>
                    <input
                        className="edit-book-form-input"
                        type="number"
                        placeholder="Amount to Trade"
                        required
                        value={tradeAmount}
                        onChange={updateTradeAmount}
                    />
                    <div className="edit-book-form-error-message">{errors?.tradeAmount}</div>
                </div>
                <div className="edit-book-form-body-separator-bottom"></div>

                <div className="edit-book-form-button-container">
                    <button
                        className="edit-book-form-submit"
                        type="submit"
                        disabled={
                            Object.values(errors).every((x) => x === "") ? false : true
                        }
                    >
                        Submit
                    </button>
                    <button
                        className="edit-book-form-cancel"
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
