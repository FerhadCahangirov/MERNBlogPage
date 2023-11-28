export const GET_POST_INITIAL_STATE = {
    loading: false,
    postData: {},
    error: false,
    errorData: {},
};

export const GET_POST_ACTION_TYPES = {
    FETCH_START: "FETCH_START",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR",
}

export const getPostReducer = (state = GET_POST_INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_POST_ACTION_TYPES.FETCH_START:
            return { ...state, loading: true, error: false, };
        case GET_POST_ACTION_TYPES.FETCH_SUCCESS:
            return { ...state, loading: false, error: false, postData: action.payload, };
        case GET_POST_ACTION_TYPES.FETCH_ERROR:
            return { ...state, loading: false, error: true, errorData: action.payload };
        default:
            return state;
    }
};


