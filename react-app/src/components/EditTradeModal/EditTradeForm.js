import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateTradeThunk } from "../../store/trades-store";
import SearchBar from "../SearchBar";
import "./EditTradeModal.css"


const CreatePortfolioForm = ({ setShowModal, trade }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentUser = useSelector((state) => (state?.session?.user))
    const allPortfolios = useSelector((state) => Object.values(state?.portfolios))
    const allTokens = useSelector((state) => (state?.tokens))
    const allTrades = useSelector((state) => Object.values(state?.trades))


    const [errors, setErrors] = useState('');
    const [tokenSelect, setTokenSelect] = useState(trade.token_id);
    const [buySell, setBuySell] = useState(trade.buy);
    const [tradeAmount, setTradeAmount] = useState(trade.amount_traded);
    const [tradePrice, setTradePrice] = useState(trade.trade_price);
    const [userPortfolio, setUserPortfolio] = useState(trade.portfolio_id);

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
        if (!tradePrice) newErrors.tradePrice = "Trade Price must be a number"
        if (!userPortfolio) newErrors.portfolio = "Please select a portfolio"
        if (!alltokenNames.includes(search)) newErrors.tokenSelect = "Token must be chosen from search results"
        if (!search) newErrors.tokenSelect = "Please enter a token"
        if (!buySell) newErrors.buySell = "Please select a 'buy' or 'sell'"
        if (buySell === 'sell' && userPortfolio && (tokenTotal - (tradeAmount * 2) < 0)) {
            console.log('TOKEN TOTAL', tokenTotal)
            console.log('TRADE AMT', tradeAmount - tokenTotal)
            newErrors.noBalance = `This transaction edit results in a balance of ${tokenTotal - (tradeAmount * 2)} ${name}. Negative balances are not allowed.`
        }
        if (buySell === 'sell' && userPortfolio && tradeAmount > tokenTotal) {

            newErrors.noBalance = `Trade amount is too large. You have ${tokenTotal} ${name}!`
        }

        setErrors(newErrors);
    }, [tradeAmount, tradePrice, userPortfolio, tokenSelect, buySell, search]);

    const alltokenNames = ['The Sandbox', 'Ftx Token', 'Eos', 'Tron', 'Lido Dao', 'Bitcoin Cash', 'Usd Coin', 'Dai', 'Uniswap', 'Chiliz', 'Tezos', 'Polkadot', 'Dogecoin', 'Iota', 'Frax', 'Filecoin', 'Chainlink', 'Ethereum Classic', 'Internet Computer', 'Binance Usd', 'Axie Infinity', 'Vechain', 'Litecoin', 'Near', 'Stellar', 'Cardano', 'Algorand', 'Solana', 'Tether', 'Ethereum', 'Bitcoin', 'Decentraland', 'Aave', 'Flow', 'Okb', 'Leo Token', 'Usdd', 'Kucoin Shares', 'Monero', 'True Usd', 'Bittorrent', 'Apecoin', 'The Graph']


    const handleSubmit = async (e) => {
        e.preventDefault();
        let mounted = true

        if (mounted) {

            let tradeAmountNumber = Number(tradeAmount)
            let total_cost = tradeAmountNumber * tradePrice

            const data = {
                id: trade.id,
                amount_traded: tradeAmountNumber,
                buy: buySell,
                token_id: tokenSelect,
                portfolio_id: userPortfolio,
                token_name: 'defaultName',
                trade_price: tradePrice,
                total_cost: total_cost,
                user_id: userId
            };


            const updatedTrade = await dispatch(updateTradeThunk(data));


            if (updatedTrade) {
                setErrors([]);
                setShowModal(false);
                history.push("/home");
            }
        }
        return () => mounted = false
    };

    if (!currentUser) {
        return <div>Loading Create Trade Modal</div>
    }

    function tradePricePlaceholder() {

        if (!tokenSelect) {
            return "Price in $USD"
        } else {
            const price = allTokens[tokenSelect].price.toFixed(2)
            const name = allTokens[tokenSelect].name
            return `Current price of ${name}: $${price}`
        }
    }

    const userId = Number(currentUser.id)
    const userPortfolios = allPortfolios.filter(portfolio => portfolio.user_id === userId)
    const portfolioTrades = allTrades.filter(trade => trade?.portfolio_id === Number(userPortfolio))
    const tradesByToken = portfolioTrades.filter((trade) => trade?.token_id === tokenSelect)

    let tokenTotal = 0
    if (tradesByToken) {
        for (let i = 0; i < tradesByToken.length; i++) {
            if (tradesByToken[i].buy === 'buy') {
                tokenTotal += tradesByToken[i].amount_traded
            }
            if (tradesByToken[i].buy === 'sell') {
                tokenTotal -= tradesByToken[i].amount_traded
            }
        }
    }

    function amountPlaceholder() {
        if (tokenTotal && tokenSelect) {
            const name = allTokens[tokenSelect]?.name
            return `You currently hold ${tokenTotal.toFixed(2)} ${name}`
        }
        else {
            return "Amount to Trade"
        }
    }


    return (
        <>
            <form className="edit-trade-form" onSubmit={handleSubmit}>
                <div className="edit-trade-form-title">Edit this Transaction</div>
                <div className="edit-trade-form-body-separator-top"></div>
                <div className="edit-trade-modal-body">

                    <SearchBar search={search} setSearch={setSearch} setTokenSelect={setTokenSelect} tokenSelect={tokenSelect} />
                    <div className="edit-trade-form-error-message">{errors?.tokenSelect}</div>

                    <div className="input-separator-div"></div>

                    <label className="create-trade-form-label">Edit trade to Portfolio</label>
                    <select
                        className="create-trade-form-input"
                        placeholder="Select One"

                        value={userPortfolio}
                        onChange={updateUserPortfolio}
                    >
                        <option value='select'> Select One </option>
                        {userPortfolios.map((portfolio) =>
                            <option value={portfolio.id}>{portfolio.name}</option>
                        )}
                    </select>
                    <div className="edit-trade-form-error-message">{errors?.buySell}</div>

                    <div className="input-separator-div"></div>

                    <label className="create-trade-form-label">Buy or Sell?</label>
                    <select
                        className="create-trade-form-input"
                        placeholder="Select One"

                        value={buySell}
                        onChange={updateBuySell}
                    >
                        <option value='buy'> Buy </option>
                        <option value='sell'> Sell </option>
                    </select>
                    <div className="edit-trade-form-error-message">{errors?.buySell}</div>

                    <div className="input-separator-div"></div>

                    <div className="edit-trade-form-error-message">{errors?.buySell}</div>
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
                        placeholder={tradePricePlaceholder}

                        value={tradePrice}
                        onChange={updateTradePrice}
                    />
                    <div className="edit-trade-form-error-message">{errors?.tradePrice}</div>
                    <div className="edit-trade-form-error-message">{errors?.tradePriceZero}</div>

                    <div className="input-separator-div"></div>

                </div>
                <div className="edit-trade-form-body-separator-bottom"></div>


                <div className="edit-trade-button-container">
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
                        className="edit-trade-form-cancel-here"
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
