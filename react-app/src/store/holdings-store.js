
const GET_USER_HOLDINGS = '/portfolios/GET_USER_HOLDINGS';
const CREATE_HOLDING = '/portfolios/ADD_HOLDING'
const EDIT_HOLDING = '/portfolios/EDIT_HOLDING'
// const DELETE_PORTFOLIO = '/portfolios/DELETE_PORTFOLIO'

const getUserHoldings = (holdings) => ({
    type: GET_USER_HOLDINGS,
    holdings
});

const createHolding = (holding) => ({
    type: CREATE_HOLDING,
    holding
})

const editHolding = (holding) => ({
    type: EDIT_HOLDING,
    holding
})

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

export const createHoldingThunk = (data) => async dispatch => {
    const response = await fetch('/api/portfolios/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        const portfolio = await response.json();
        await dispatch(createHolding(portfolio));
        return portfolio;
    }
}

export const editHoldingThunk = (data) => async dispatch => {
    const response = await fetch(`/api/portfolios/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        const updatedPortfolio = await response.json();
        await dispatch(editHolding(updatedPortfolio));
        return updatedPortfolio;
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
        case CREATE_HOLDING: {
            newState = {
                ...state,
                [action.holding.id]: action.holding
            };
            return newState;
        }
        case EDIT_HOLDING: {
            newState = {
                ...state,
                [action.holding.id]: action.holding
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

export default holdingsReducer;
