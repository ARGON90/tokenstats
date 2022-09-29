
const GET_USER_TRADES = '/portfolios/GET_USER_TRADES';
const CREATE_TRADE = '/portfolios/ADD_TRADE'
const EDIT_TRADE = '/portfolios/EDIT_TRADE'
// const DELETE_PORTFOLIO = '/portfolios/DELETE_PORTFOLIO'

const getUserTrades = (trades) => ({
    type: GET_USER_TRADES,
    trades
});

const createTrade = (trade) => ({
    type: CREATE_TRADE,
    trade
})

const editTrade = (trade) => ({
    type: EDIT_TRADE,
    trade
})

// const deletePortfolio = (id) => ({
//     type: DELETE_PORTFOLIO,
//     id
// })


export const getUserTradesThunk = () => async (dispatch) => {
    const response = await fetch('/api/trades/');
    if (response.ok) {
        const data = await response.json();
        dispatch(getUserTrades(data));
        return JSON.stringify(data);
    }
}

export const createTradeThunk = (data) => async dispatch => {
    const response = await fetch('/api/trades/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        const portfolio = await response.json();
        await dispatch(createTrade(portfolio));
        return portfolio;
    }
}

export const updateTradeThunk = (data) => async dispatch => {
    const response = await fetch(`/api/trades/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        const updatedTrade = await response.json();
        await dispatch(editTrade(updatedTrade));
        return updatedTrade;
    };
};

// export const deletePortfolioThunk = (id) => async dispatch => {
//     const response = await fetch(`/api/portfolios/${id}`, {
//         method: 'DELETE'
//     });
//     if (response.ok) {
//         const portfolio = await response.json();
//         await dispatch(deletePortfolio(id));
//         return portfolio;
//     };
// };


const initialState = {}
const tradesReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_USER_TRADES: {
            const trades = action.trades
            return {
                ...newState,
                ...trades
            }
        }
        case CREATE_TRADE: {
            newState = {
                ...state,
                [action.trade.id]: action.trade
            };
            return newState;
        }
        case EDIT_TRADE: {
            newState = {
                ...state,
                [action.trade.id]: action.trade
            };
            return newState;
        }
        // case DELETE_PORTFOLIO: {
        //     delete newState[action.id];
        //     return newState;
        // }
        default:
             return state;
    }
}

export default tradesReducer;
