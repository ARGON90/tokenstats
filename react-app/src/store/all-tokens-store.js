// constants
const GET_ALL_TOKENS = 'tokens/GET_ALL_TOKENS';
const UPDATE_ALL_TOKENS = 'tokens/UPDATE_ALL_TOKENS';

const getAllTokens = (tokens) => ({
    type: GET_ALL_TOKENS,
    tokens
});

const updateAllTokens = (tokens) => ({
    type: GET_ALL_TOKENS,
    tokens
});
// comment for heroku push

export const getAllTokensThunk = () => async (dispatch) => {
    const response = await fetch('/api/tokens/');
    if (response.ok) {
        const data = await response.json();
        dispatch(getAllTokens(data));
        return JSON.stringify(data);
    }
}


export const updateAllTokensThunk = () => async (dispatch) => {
    console.log('UPDATE TOKENS THUNK')
    const response = await fetch('/api/tokens/refresh');
    if (response.ok) {
        console.log("ALL TOKENS OK", response)
        const data = await response.json();
        dispatch(updateAllTokens(data));
        return JSON.stringify(data);
    }
}

const initialState = {}
const tokensReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_ALL_TOKENS: {
            // console.log('ALL TOKENS REDUCER')
            const tokens = action.tokens
            return {
                ...newState,
                ...tokens
            }
        }
        case UPDATE_ALL_TOKENS: {
            // console.log('UPDATE TOKENS REDUCER')
            const tokens = action.tokens
            return {
                ...newState,
                ...tokens
            }
        }

        default:
            return state;
    }
}

export default tokensReducer;
