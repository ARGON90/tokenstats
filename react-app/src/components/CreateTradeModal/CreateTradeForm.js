import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserPortfoliosThunk } from "../../store/portfolio-store";
import { createTradeThunk, getUserTradesThunk } from "../../store/trades-store";
import SearchBar from "../SearchBar";

import "./CreateTradeModal.css"


const CreatePortfolioForm = ({ setShowModal, userPortfolios }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector((state) => (state?.session?.user))
    // const allPortfolios = useSelector((state) => Object.values(state?.portfolios))
    const allTokens = useSelector((state) => (state?.tokens))
    const allTrades = useSelector((state) => Object.values(state?.trades))

    const [errors, setErrors] = useState('');
    const [tokenSelect, setTokenSelect] = useState('');
    const [buySell, setBuySell] = useState("");
    const [tradeAmount, setTradeAmount] = useState('');
    const [tradePrice, setTradePrice] = useState('');
    const [userPortfolio, setUserPortfolio] = useState("");

    const updateBuySell = (e) => setBuySell(e.target.value);
    const updateTradeAmount = (e) => setTradeAmount(e.target.value);
    const updateTradePrice = (e) => setTradePrice(e.target.value);
    const updateUserPortfolio = (e) => setUserPortfolio(e.target.value);

    buySell.toLowerCase()

    function editorNah() {
        if (tokenSelect && allTokens[tokenSelect]) {
            return allTokens[tokenSelect].name
        }
        return ''
    }
    const [search, setSearch] = useState(editorNah())



    useEffect(() => {
        const name = allTokens[tokenSelect]?.name
        const newErrors = {};

        if (tradeAmount >= 1000000000) newErrors.tradeAmount = "Trade Size must be less than 1 Billion"
        if (tradeAmount <= 0) newErrors.tradeAmount = "Trade size must be greater than 0"
        if (!tradeAmount) newErrors.tradeAmount = "Please enter a trade amount"
        if (tradePrice >= 1000000) newErrors.tradePrice = "Trade Price must be less than 1 Million"
        if (tradePrice <= 0) newErrors.tradePrice = "Trade price must be greater than 0"
        // if (typeof Number(tradePrice) !== typeof(1)) newErrors.tradePrice = "Trade Price must be a number"
        if (!tradePrice) newErrors.tradePrice = "Trade Price must be a number"
        if (!userPortfolio) newErrors.portfolio = "Please select a portfolio"
        if (!alltokenNames.includes(search)) newErrors.tokenSelect = "Token must be chosen from search results"
        if (!search) newErrors.tokenSelect = "Please enter a token"
        if (!buySell) newErrors.buySell = "Please select a 'buy' or 'sell'"

        console.log(typeof tradePrice)
        console.log(typeof Number(tradePrice))

        if (buySell === 'sell' && userPortfolio && tradeAmount > tokenTotal) {
            newErrors.noBalance = `Trade amount is too large. You have ${tokenTotal} ${name}!`
        }

        setErrors(newErrors);
    }, [tradeAmount, tradePrice, userPortfolio, tokenSelect, buySell, search, allTokens]);



    const alltokenNames = ['The Sandbox', 'Ftx Token', 'Eos', 'Tron', 'Lido Dao', 'Bitcoin Cash', 'Usd Coin', 'Dai', 'Uniswap', 'Chiliz', 'Tezos', 'Polkadot', 'Dogecoin', 'Iota', 'Frax', 'Filecoin', 'Chainlink', 'Ethereum Classic', 'Internet Computer', 'Binance Usd', 'Axie Infinity', 'Vechain', 'Litecoin', 'Near', 'Stellar', 'Cardano', 'Algorand', 'Solana', 'Tether', 'Ethereum', 'Bitcoin', 'Decentraland', 'Aave', 'Flow', 'Okb', 'Leo Token', 'Usdd', 'Kucoin Shares', 'Monero', 'True Usd', 'Bittorrent', 'Apecoin', 'The Graph']

    const handleSubmit = async (e) => {
        e.preventDefault();
        let mounted = true
        if (mounted) {

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
            dispatch(getUserTradesThunk())
            dispatch(getUserPortfoliosThunk())

            if (createdTrade) {
                setErrors([]);
                setShowModal(false);
                history.push("/home");
            }
        }
        return () => mounted = false
    };

    if (!currentUser) return <div>Loading Create Trade Modal</div>
    if (!allTokens) return <div>Loading All Tokens</div>

    const userId = Number(currentUser.id)
    // const userPortfolios = allPortfolios.filter(portfolio => portfolio.user_id === userId)
    const portfolioTrades = allTrades.filter(trade => trade?.portfolio_id === Number(userPortfolio))
    const tradesByToken = portfolioTrades.filter((trade) => trade?.token_id === tokenSelect)
    if (!userPortfolios) return null

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
            // console.log(tradesByToken[i].amount_traded)
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
            <form className="create-trade-form" onSubmit={handleSubmit}>
                <div className="create-trade-form-title">Add a Transaction</div>
                <div className="create-trade-form-body-separator-top"></div>
                <div className="create-trade-modal-body">

                    <SearchBar search={search} setSearch={setSearch} setTokenSelect={setTokenSelect} tokenSelect={tokenSelect} />
                    <div className="edit-trade-form-error-message">{errors?.tokenSelect}</div>

                    <div className="input-separator-div"></div>

                    <label className="create-trade-form-label">Add trade to Portfolio</label>
                    <select
                        className="create-trade-form-input"
                        placeholder="Select One"

                        value={userPortfolio}
                        onChange={updateUserPortfolio}

                    >
                        <option value="" disabled={true} > Select Portfolio ... </option>
                        {userPortfolios.map((portfolio) =>
                            <option key={portfolio.id} value={portfolio.id}>{portfolio.name}</option>
                        )}
                    </select>
                    <div className="edit-trade-form-error-message">{errors?.portfolio}</div>

                    <div className="input-separator-div"></div>



                    <label className="create-trade-form-label">Buy or Sell?</label>
                    <select
                        className="create-trade-form-input"
                        placeholder="Select One"

                        value={buySell}
                        onChange={updateBuySell}
                    >
                        <option value="" disabled={true} > Select Buy / Sell ... </option>
                        <option value='buy'> Buy </option>
                        <option value='sell'> Sell </option>
                    </select>
                    <div className="edit-trade-form-error-message">{errors?.buySell}</div>

                    <div className="input-separator-div"></div>

                    <label className="create-trade-form-label">Amount of Token Bought/Sold</label>
                    <input
                        className="create-trade-form-input"
                        type="number"
                        placeholder={amountPlaceholder()}

                        value={tradeAmount}
                        onChange={updateTradeAmount}
                    />
                    <div className="edit-trade-form-error-message">{errors?.tradeAmount}</div>
                    <div className="edit-trade-form-error-message">{errors?.tradeAmountZero}</div>
                    <div className="edit-trade-form-error-message">{errors?.noBalance}</div>

                    <div className="input-separator-div"></div>

                    <label className="create-trade-form-label">Trade Price of Token</label>
                    <input
                        className="create-trade-form-input"
                        type="number"
                        placeholder={tradePricePlaceholder()}

                        value={tradePrice}
                        onChange={updateTradePrice}
                    />
                    <div className="edit-trade-form-error-message">{errors?.tradePrice}</div>
                    <div className="edit-trade-form-error-message">{errors?.tradePriceZero}</div>
                    {/* todo  - decimal type or number type? */}

                    <div className="input-separator-div"></div>

                </div>
                <div className="create-trade-form-body-separator-bottom"></div>

                <div className="create-trade-button-container">
                    {Object.values(errors).length ?
                        <>
                            <button
                                className="create-trade-form-errors"
                                type="submit"
                                disabled={true}
                            >
                                Submit
                            </button>
                        </>
                        :
                        <button
                            className="create-trade-form-submit"
                            type="submit"
                            disabled={Object.values(errors).length}
                        >
                            Submit
                        </button>
                    }

                    <button
                        className="create-trade-form-cancel-here"
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
