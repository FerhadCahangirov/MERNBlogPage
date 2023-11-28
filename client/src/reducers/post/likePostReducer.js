export const LIKE_POST_INITIAL_STATE = {
    loading: false,
    error: false,
    errorData: {},
    success: false,
    successData: {}
};

export const LIKE_POST_ACTION_TYPES = {
    FETCH_START: "FETCH_START",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR",
}

export const likePostReducer = (state = LIKE_POST_INITIAL_STATE, action) => {
    switch (action.type) {
        case LIKE_POST_ACTION_TYPES.FETCH_START:
            return { ...state, loading: true, error: false, success: false };
        case LIKE_POST_ACTION_TYPES.FETCH_SUCCESS:
            return { ...state, loading: false, error: false, success: true, successData: action.payload};
        case LIKE_POST_ACTION_TYPES.FETCH_ERROR:
            return { ...state, loading: false, error: true, errorData: action.payload, success: false };
        default:
            return state;
    }
};
