export const DELETE_USER_INITIAL_STATE = {
    error: false,
    errorData: {},
    loading: false,
    success: false,
    successData: {}
};

export const DELETE_USER_ACTIONS = {
    FETCH_START: "FETCH_START",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR",
}

export const deleteUserReducer = (state = DELETE_USER_INITIAL_STATE, action) => {
    switch (action.type) {
        case DELETE_USER_ACTIONS.FETCH_START:
            return { ...state, loading: true, error: false };
        case DELETE_USER_ACTIONS.FETCH_SUCCESS:
            return { ...state, loading: false, success: true, error: false, successData: action.payload };
        case DELETE_USER_ACTIONS.FETCH_ERROR:
            return { ...state, loading: false, error: true, success: false, errorData: action.payload };
        default:
            return state;
    }
}