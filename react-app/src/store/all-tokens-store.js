// constants
const GET_ALL_TOKENS = 'tokens/GET_ALL_TOKENS';

const getAllTokens = (tokens) => ({
  type: GET_ALL_TOKENS,
  tokens
});


export const getAllTokensThunk = () => async (dispatch) => {
    console.log('ALL TOKENS THUNK')
    const response = await fetch('/api/tokens/');
    if (response.ok) {
        console.log("ALL TOKENS OK", response)
        const data = await response.json();
        dispatch(getAllTokens(data));
        return JSON.stringify(data);
    }
}

const initialState = {}
const tokensReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {

        case GET_ALL_TOKENS: {
            // console.log('ALL BOOKS REDUCER')
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
