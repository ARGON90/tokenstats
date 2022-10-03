import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createTradeThunk } from "../../store/trades-store";
import SearchBar from "../SearchBar";

import "./CreateTradeModal.css"


const CreatePortfolioForm = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector((state) => (state?.session?.user))
    const allPortfolios = useSelector((state) => Object.values(state?.portfolios))
    const allTokens = useSelector((state) => (state?.tokens))
    const allTrades = useSelector((state) => Object.values(state?.trades))




    const [errors, setErrors] = useState('');
    const [tokenSelect, setTokenSelect] = useState("");
    const [buySell, setBuySell] = useState("");
    const [tradeAmount, setTradeAmount] = useState("");
    const [tradePrice, setTradePrice] = useState("");
    const [userPortfolio, setUserPortfolio] = useState("");

    const updateBuySell = (e) => setBuySell(e.target.value);
    const updateTradeAmount = (e) => setTradeAmount(e.target.value);
    const updateTradePrice = (e) => setTradePrice(e.target.value);
    const updateUserPortfolio = (e) => setUserPortfolio(e.target.value);

    buySell.toLowerCase()

    useEffect(() => {
        const name = allTokens[tokenSelect]?.name
        const newErrors = {};

        if (!tradeAmount) newErrors.tradeAmount = "Please enter a trade amount"
        if (tradeAmount <= 0) newErrors.tradeAmountZero = "Trade size must be greater than 0"
        if (!tradePrice) newErrors.tradePrice = "Please enter a trade price"
        if (!tradePrice) newErrors.tradePriceZero = "Trade price must be greater than 0"
        if (!userPortfolio) newErrors.portfolio = "Please select a portfolio"
        if (!tokenSelect) newErrors.tokenSelect = "Please select a token"
        if (!buySell) newErrors.buySell = "Please select a 'buy' or 'sell'"

        if (buySell == 'sell' && userPortfolio && tradeAmount > tokenTotal) {
            newErrors.noBalance = `Trade amount is too large. You have ${tokenTotal} ${name}!`
        }

        setErrors(newErrors);
    }, [tradeAmount, tradePrice, userPortfolio, tokenSelect, buySell]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let tradeAmountNumber = Number(tradeAmount)
        let total_cost = tradeAmountNumber * tradePrice


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
    if (!allTokens) {
        return <div>Loading All Tokens</div>
    }

    const userId = Number(currentUser.id)
    const userPortfolios = allPortfolios.filter(portfolio => portfolio.user_id === userId)
    const portfolioTrades = allTrades.filter(trade => trade?.portfolio_id === Number(userPortfolio))
    const tradesByToken = portfolioTrades.filter((trade) => trade?.token_id === tokenSelect)

    function tradePricePlaceholder() {

        if (!tokenSelect) {
            return "Price in $USD"
        } else {
            const price = allTokens[tokenSelect].price.toFixed(2)
            const name = allTokens[tokenSelect].name
            return `Current price of ${name}: $${price}`
        }
    }

    let tokenTotal = 0
    if (tradesByToken) {
        for (let i = 0; i < tradesByToken.length; i++) {
            console.log(tradesByToken[i].amount_traded)
            if (tradesByToken[i].buy === 'buy') {
                tokenTotal += tradesByToken[i].amount_traded
            }
            if (tradesByToken[i].buy === 'sell') {
                tokenTotal -= tradesByToken[i].amount_traded
            }
        }
    }

    function amountPlaceholder() {
        if (tokenTotal) {
            const name = allTokens[tokenSelect]?.name
            return `You currently hold ${tokenTotal.toFixed(2)} ${name}`
        }
        else {
            return "Amount to Trade"
        }
    }



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
                        <option value="" disabled={true} > Select Portfolio... </option>
                        {userPortfolios.map((portfolio) =>
                            <option value={portfolio.id}>{portfolio.name}</option>
                        )}
                    </select>
                    <div className="edit-book-form-error-message">{errors?.portfolio}</div>

                    <div className='navBarSearch'>
                        <SearchBar setTokenSelect={setTokenSelect} tokenSelect={tokenSelect} />
                    </div>
                    <div className="edit-book-form-error-message">{errors?.tokenSelect}</div>

                    <label className="create-book-form-label">Buy or Sell?</label>
                    <select
                        className="create-book-form-input"
                        placeholder="Select One"
                        required
                        value={buySell}
                        onChange={updateBuySell}
                    >
                        <option value="" disabled={true} > Select Buy / Sell .... </option>
                        <option value='buy'> Buy </option>
                        <option value='sell'> Sell </option>
                    </select>
                    <div className="edit-book-form-error-message">{errors?.buySell}</div>

                    <label className="create-book-form-label">Amount of Token Bought/Sold</label>
                    <input
                        className="create-book-form-input"
                        type="number"
                        placeholder={amountPlaceholder()}
                        required
                        value={tradeAmount}
                        onChange={updateTradeAmount}
                    />
                    <div className="edit-book-form-error-message">{errors?.tradeAmount}</div>
                    <div className="edit-book-form-error-message">{errors?.tradeAmountZero}</div>
                    <div className="edit-book-form-error-message">{errors?.noBalance}</div>

                    <label className="create-book-form-label">Trade Price of Token</label>
                    <input
                        className="create-book-form-input"
                        type="decimal"
                        placeholder={tradePricePlaceholder()}
                        required
                        value={tradePrice}
                        onChange={updateTradePrice}
                    />
                    <div className="edit-book-form-error-message">{errors?.tradePrice}</div>
                    <div className="edit-book-form-error-message">{errors?.tradePriceZero}</div>
                            {/* todo  - decimal type or number type? */}

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
