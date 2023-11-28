export const CREATE_CATEGORY_INITIAL_STATE = {
    error: false,
    errorData: {},
    loading: false,
    content: '',
    success: false,
};

export const CREATE_CATEGORY_ACTIONS = {
    CONTENT_CHANGE: "CONTENT_CHANGE",
    FETCH_START: "FETCH_START",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR",
    CLEAR: "CLEAR"
}

export const createCategoryReducer = (state = CREATE_CATEGORY_INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATE_CATEGORY_ACTIONS.CONTENT_CHANGE:
            return { ...state, content: action.payload };
        case CREATE_CATEGORY_ACTIONS.FETCH_START:
            return { ...state, loading: true, error: false };
        case CREATE_CATEGORY_ACTIONS.FETCH_SUCCESS:
            return { ...state, loading: false, success: true, error: false };
        case CREATE_CATEGORY_ACTIONS.FETCH_ERROR:
            return { ...state, loading: false, error: true, success: false, errorData: action.payload };
        case CREATE_CATEGORY_ACTIONS.CLEAR:
            return CREATE_CATEGORY_INITIAL_STATE
    }
}