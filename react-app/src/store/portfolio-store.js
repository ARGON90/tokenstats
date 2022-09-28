// constants
const GET_USER_PORTFOLIO = 'tokens/GET_USER_PORTFOLIO';
// const UPDATE_ALL_TOKENS = 'tokens/UPDATE_ALL_TOKENS';

const getUserPortfolios = (portfolios) => ({
    type: GET_USER_PORTFOLIO,
    portfolios
});

// const updateAllTokens = (tokens) => ({
//     type: GET_ALL_TOKENS,
//     tokens
// });


export const getUserPortfoliosThunk = () => async (dispatch) => {
    console.log('ALL TOKENS THUNK')
    const response = await fetch('/api/portfolios/');
    if (response.ok) {
        console.log("ALL TOKENS OK", response)
        const data = await response.json();
        dispatch(getUserPortfolios(data));
        return JSON.stringify(data);
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
