export const UPDATE_CATEGORY_INITIAL_STATE = {
    error: false,
    errorData: {},
    loading: false,
    content: '',
    success: false,
    successData: {}
};

export const UPDATE_CATEGORY_ACTIONS = {
    CONTENT_CHANGE: "CONTENT_CHANGE",
    FETCH_START: "FETCH_START",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR",
    CLEAR: "CLEAR"
}

export const updateCateogyReducer = (state = UPDATE_CATEGORY_INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_CATEGORY_ACTIONS.CONTENT_CHANGE:
            return { ...state, content: action.payload };
        case UPDATE_CATEGORY_ACTIONS.FETCH_START:
            return { ...state, loading: true, error: false };
        case UPDATE_CATEGORY_ACTIONS.FETCH_SUCCESS:
            return { ...state, loading: false, success: true, error: false, successData: action.payload };
        case UPDATE_CATEGORY_ACTIONS.FETCH_ERROR:
            return { ...state, loading: false, error: true, success: false, errorData: action.payload };
        case UPDATE_CATEGORY_ACTIONS.CLEAR:
            return UPDATE_CATEGORY_INITIAL_STATE
        default:
            return state;
    }
}