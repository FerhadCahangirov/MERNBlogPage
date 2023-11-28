export const DELETE_POST_INITIAL_STATE = {
    error: false,
    errorData: {},
    loading: false,
    success: false,
    successData: {}
};

export const DELETE_POST_ACTIONS = {
    FETCH_START: "FETCH_START",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR",
}

export const deletePostReducer = (state = DELETE_POST_INITIAL_STATE, action) => {
    switch (action.type) {
        case DELETE_POST_ACTIONS.FETCH_START:
            return { ...state, loading: true, error: false };
        case DELETE_POST_ACTIONS.FETCH_SUCCESS:
            return { ...state, loading: false, success: true, error: false, successData: action.payload };
        case DELETE_POST_ACTIONS.FETCH_ERROR:
            return { ...state, loading: false, error: true, success: false, errorData: action.payload };
        default:
            return state;
    }
}