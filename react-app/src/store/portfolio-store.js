// constants
const GET_USER_PORTFOLIO = '/portfolios/GET_USER_PORTFOLIO';
const CREATE_PORTFOLIO = '/portfolios/ADD_PORTFOLIO'
// const UPDATE_ALL_TOKENS = 'tokens/UPDATE_ALL_TOKENS';

const getUserPortfolios = (portfolios) => ({
    type: GET_USER_PORTFOLIO,
    portfolios
});

const createPortfolio = (portfolio) => ({
    type: CREATE_PORTFOLIO,
    portfolio
})

// const updateAllTokens = (tokens) => ({
//     type: GET_ALL_TOKENS,
//     tokens
// });


export const getUserPortfoliosThunk = () => async (dispatch) => {

    const response = await fetch('/api/portfolios/');
    if (response.ok) {
        console.log("ALL TOKENS OK", response)
        const data = await response.json();
        dispatch(getUserPortfolios(data));
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
        // console.log('RESPONSE OK, BOOK', book)
        await dispatch(createPortfolio(portfolio));
        return portfolio;
    }
}


// export const updateAllTokensThunk = () => async (dispatch) => {
//     console.log('UPDATE TOKENS THUNK')
//     const response = await fetch('/api/tokens/refresh');
//     if (response.ok) {
//         console.log("ALL TOKENS OK", response)
//         const data = await response.json();
//         dispatch(updateAllTokens(data));
//         return JSON.stringify(data);
//     }
// }

const initialState = {}
const portfoliosReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_USER_PORTFOLIO: {
            // console.log('ALL TOKENS REDUCER')
            const portfolios = action.portfolios
            return {
                ...newState,
                ...portfolios
            }
        }

        case CREATE_PORTFOLIO: {
            // console.log('ADD BOOK REDUCER')
            newState = {
                ...state,
                [action.portfolio.id]: action.portfolio
            };
            return newState;
        }


        // case UPDATE_ALL_TOKENS: {
        //     // console.log('UPDATE TOKENS REDUCER')
        //     const tokens = action.tokens
        //     return {
        //         ...newState,
        //         ...tokens
        //     }
        // }

        default:
            return state;
    }
}

export default portfoliosReducer;
