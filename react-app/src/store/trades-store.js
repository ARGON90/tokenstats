
const GET_USER_TRADES = '/portfolios/GET_USER_TRADES';
const CREATE_TRADE = '/portfolios/ADD_TRADE'
// const EDIT_PORTFOLIO = '/portfolios/EDIT_PORTFOLIO'
// const DELETE_PORTFOLIO = '/portfolios/DELETE_PORTFOLIO'

const getUserTrades = (trades) => ({
    type: GET_USER_TRADES,
    trades
});

const createTrade = (trade) => ({
    type: CREATE_TRADE,
    trade
})

// const editPortfolio = (portfolio) => ({
//     type: EDIT_PORTFOLIO,
//     portfolio
// })

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

export const createPortfolioThunk = (data) => async dispatch => {
    const response = await fetch('/api/portfolios/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        const portfolio = await response.json();
        await dispatch(createPortfolio(portfolio));
        return portfolio;
    }
}

// export const updatePortfolioThunk = (data) => async dispatch => {
//     const response = await fetch(`/api/portfolios/${data.id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data)
//     });
//     if (response.ok) {
//         const updatedPortfolio = await response.json();
//         await dispatch(editPortfolio(updatedPortfolio));
//         return updatedPortfolio;
//     };
// };

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
        // case CREATE_PORTFOLIO: {
        //     newState = {
        //         ...state,
        //         [action.portfolio.id]: action.portfolio
        //     };
        //     return newState;
        // }
        // case EDIT_PORTFOLIO: {
        //     newState = {
        //         ...state,
        //         [action.portfolio.id]: action.portfolio
        //     };
        //     return newState;
        // }
        // case DELETE_PORTFOLIO: {
        //     delete newState[action.id];
        //     return newState;
        // }
        default:
             return state;
    }
}

export default tradesReducer;
