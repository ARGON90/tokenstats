
const GET_USER_HOLDINGS = '/portfolios/GET_USER_HOLDINGS';
// const CREATE_PORTFOLIO = '/portfolios/ADD_PORTFOLIO'
// const EDIT_PORTFOLIO = '/portfolios/EDIT_PORTFOLIO'
// const DELETE_PORTFOLIO = '/portfolios/DELETE_PORTFOLIO'

const getUserHoldings = (holdings) => ({
    type: GET_USER_HOLDINGS,
    holdings
});

// const createPortfolio = (portfolio) => ({
//     type: CREATE_PORTFOLIO,
//     portfolio
// })

// const editPortfolio = (portfolio) => ({
//     type: EDIT_PORTFOLIO,
//     portfolio
// })

// const deletePortfolio = (id) => ({
//     type: DELETE_PORTFOLIO,
//     id
// })


export const getUserHoldingsThunk = () => async (dispatch) => {
    const response = await fetch('/api/holdings/');
    if (response.ok) {
        const data = await response.json();
        dispatch(getUserHoldings(data));
        return JSON.stringify(data);
    }
}

// export const createPortfolioThunk = (data) => async dispatch => {
//     const response = await fetch('/api/portfolios/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data)
//     });
//     if (response.ok) {
//         const portfolio = await response.json();
//         await dispatch(createPortfolio(portfolio));
//         return portfolio;
//     }
// }

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
const holdingsReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_USER_HOLDINGS: {
            const holdings = action.holdings
            return {
                ...newState,
                ...holdings
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

export default holdingsReducer;
