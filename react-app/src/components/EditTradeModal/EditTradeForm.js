import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateTradeThunk } from "../../store/trades-store";


import "./EditTradeModal.css"


const CreatePortfolioForm = ({ setShowModal, trade }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector((state) => (state?.session?.user))
    const allPortfolios = useSelector((state) => Object.values(state?.portfolios))

    const [errors, setErrors] = useState('');
    const [tokenSelect, setTokenSelect] = useState(trade.token_id);
    const [buySell, setBuySell] = useState(trade.buy);
    const [tradeAmount, setTradeAmount] = useState(trade.amount_traded);
    const [tradePrice, setTradePrice] = useState(trade.trade_price);
    const [userPortfolio, setUserPortfolio] = useState(trade.portfolio_id);

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
    }, [tradeAmount, tradePrice]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let tradeAmountNumber = Number(tradeAmount)
        let total_cost = tradeAmountNumber * tradePrice
        console.log(total_cost, 'TOTALCOST')

        const data = {
            id: trade.id,
            amount_traded: tradeAmountNumber,
            buy: buySell,
            token_id: tokenSelect,
            portfolio_id: 1,
            token_name: 'defaultName',
            trade_price: tradePrice,
            total_cost: total_cost,
            user_id: userId
        };


        const updatedTrade = await dispatch(updateTradeThunk(data));

        if (updatedTrade) {
            setErrors([]);
            setShowModal(false);
            history.push("/tokens");
        }
    };

    if (!currentUser) {
        return <div>Loading Create Trade Modal</div>
    }

    const userId = Number(currentUser.id)
    const userPortfolios = allPortfolios.filter(portfolio => portfolio.user_id === userId)


    const tokenList = [
        {name: 'Bitcoin', tokenId: 1},
        {name: 'Cardano', tokenId: 2},
        {name: 'Ethereum', tokenId: 3},
        {name: 'Solana', tokenId: 4},
]

    return (
        <>
            <form className="edit-book-form" onSubmit={handleSubmit}>
                <div className="edit-book-form-title">Edit this Transaction</div>
                <div className="create-book-form-body-separator-top"></div>
                <div className="edit-book-modal-body">

                <label className="create-book-form-label">Edit trade to Portfolio</label>
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
                <div className="edit-book-form-body-separator-bottom"></div>

                <div className="edit-book-form-button-container">
                    <button
                        className="edit-book-form-submit"
                        type="submit"
                        disabled={Object.values(errors).length}
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
