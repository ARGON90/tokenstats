import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createTradeThunk, getUserTradesThunk } from "../../store/trades-store";

import "./CreateTradeModal.css"


const CreatePortfolioForm = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector((state) => (state?.session?.user))
    const allPortfolios = useSelector((state) => Object.values(state?.portfolios))

    const [errors, setErrors] = useState('');
    const [tokenSelect, setTokenSelect] = useState("");
    const [buySell, setBuySell] = useState("buy");
    const [tradeAmount, setTradeAmount] = useState("");
    const [tradePrice, setTradePrice] = useState("");
    const [userPortfolio, setUserPortfolio] = useState("");

    const updateTokenSelect = (e) => setTokenSelect(e.target.value);
    const updateBuySell = (e) => setBuySell(e.target.value);
    const updateTradeAmount = (e) => setTradeAmount(e.target.value);
    const updateTradePrice = (e) => setTradePrice(e.target.value);
    const updateUserPortfolio = (e) => setUserPortfolio(e.target.value);

    buySell.toLowerCase()

    useEffect(() => {
        const newErrors = {};

        if (!tradeAmount) newErrors.tradeAmount = "Please enter a trade Amount"
        if (!tradePrice) newErrors.tradePrice = "Please enter a trade Price"


        setErrors(newErrors);
        console.log(errors)
    }, [tradeAmount, tradePrice]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let tradeAmountNumber = Number(tradeAmount)
        let total_cost = tradeAmountNumber * tradePrice
        console.log(total_cost, 'TOTALCOST')

        const data = {
            amount_traded: tradeAmountNumber,
            buy: buySell,
            token_id: tokenSelect,
            portfolio_id: userPortfolio,
            token_name: 'defaultName',
            trade_price: tradePrice,
            total_cost: total_cost,
            user_id: userId
        };

        const createdTrade = await dispatch(createTradeThunk(data));

        if (createdTrade) {
            setErrors([]);
            setShowModal(false);
            history.push("/home");
        }
    };

    if (!currentUser) {
        return <div>Loading Create Trade Modal</div>
    }

    const userId = Number(currentUser.id)
    const userPortfolios = allPortfolios.filter(portfolio => portfolio.user_id === userId)


    const tokenList = [
        { name: 'Bitcoin', tokenId: 1 },
        { name: 'Cardano', tokenId: 2 },
        { name: 'Ethereum', tokenId: 3 },
        { name: 'Solana', tokenId: 4 },
    ]

    console.log(userPortfolios, "user ports ")

    return (
        <>
            <form className="create-book-form" onSubmit={handleSubmit}>
                <div className="create-book-form-title">Add a Transaction</div>
                <div className="create-book-form-body-separator-top"></div>
                <div className="create-book-modal-body">

                    <label className="create-book-form-label">Add trade to Portfolio</label>
                    <select
                        className="create-book-form-input"
                        placeholder="Select One"
                        required
                        value={userPortfolio}
                        onChange={updateUserPortfolio}
                    >
                        <option value='select'> Select One </option>
                        {userPortfolios.map((portfolio) =>
                            <option value={portfolio.id}>{portfolio.name}</option>
                        )}
                    </select>
                    <div className="edit-book-form-error-message">{errors?.buySell}</div>

                    <label className="create-book-form-label">Select a Token</label>
                    <select
                        className="create-book-form-input"
                        placeholder="Select One"
                        required
                        value={tokenSelect}
                        onChange={updateTokenSelect}
                    >
                        <option value='select'> Select One </option>
                        {tokenList.map((token) =>
                            <option value={token.tokenId}>{token.name}</option>
                        )}

                    </select>
                    <div className="edit-book-form-error-message">{errors?.tokenSelect}</div>

                    <label className="create-book-form-label">Buy or Sell?</label>
                    <select
                        className="create-book-form-input"
                        placeholder="Select One"
                        required
                        value={buySell}
                        onChange={updateBuySell}
                    >
                        <option value='buy'> Buy </option>
                        <option value='sell'> Sell </option>
                    </select>
                    <div className="edit-book-form-error-message">{errors?.buySell}</div>
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

                    <label className="create-book-form-label">Trade Price of Token</label>
                    <input
                        className="create-book-form-input"
                        type="number"
                        placeholder="Trade Price (in USD)"
                        required
                        value={tradePrice}
                        onChange={updateTradePrice}
                    />
                    <div className="edit-book-form-error-message">{errors?.tradePrice}</div>
                </div>
                <div className="create-book-form-body-separator-bottom"></div>

                <div className="create-book-form-button-container">
                    <button
                        className="create-book-form-submit"
                        type="submit"
                        disabled={Object.values(errors).length}
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
