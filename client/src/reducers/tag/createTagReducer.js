export const CREATE_TAG_INITIAL_STATE = {
    error: false,
    errorData: {},
    loading: false,
    content: '',
    success: false,
    successData: {}
};

export const CREATE_TAG_ACTIONS = {
    CONTENT_CHANGE: "CONTENT_CHANGE",
    FETCH_START: "FETCH_START",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR",
    CLEAR: "CLEAR"
}

export const createTagReducer = (state = CREATE_TAG_INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATE_TAG_ACTIONS.CONTENT_CHANGE:
            return { ...state, content: action.payload };
        case CREATE_TAG_ACTIONS.FETCH_START:
            return { ...state, loading: true, error: false };
        case CREATE_TAG_ACTIONS.FETCH_SUCCESS:
            return { ...state, loading: false, success: true, error: false, successData: action.payload };
        case CREATE_TAG_ACTIONS.FETCH_ERROR:
            return { ...state, loading: false, error: true, success: false, errorData: action.payload };
        case CREATE_TAG_ACTIONS.CLEAR:
            return CREATE_TAG_INITIAL_STATE
        default:
            return state;
    }
}