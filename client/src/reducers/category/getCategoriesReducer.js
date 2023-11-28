export const GET_CATEGORIES_INITIAL_STATE = {
    loading: false,
    categoriesData: [],
    filteredCategoriesData: [],
    error: false,
    errorData: {},
    content: '',
};

export const GET_CATEGORIES_ACTION_TYPES = {
    FETCH_START: "FETCH_START",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR",
    CHANGE_CONTENT: "CHANGE_CONTENT",
    CHANGE_FILTERED_CATEGORIES: "CHANGE_FILTERED_CATEGORIES",
}

const getCategoriesReducer = (state = GET_CATEGORIES_INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CATEGORIES_ACTION_TYPES.FETCH_START:
            return { ...state, loading: true, error: false, };
        case GET_CATEGORIES_ACTION_TYPES.FETCH_SUCCESS:
            return { ...state, loading: false, error: false, categoriesData: action.payload, filteredCategoriesData: action.payload };
        case GET_CATEGORIES_ACTION_TYPES.FETCH_ERROR:
            return { ...state, loading: false, error: true, errorData: action.payload };
        case GET_CATEGORIES_ACTION_TYPES.CHANGE_CONTENT:
            return { ...state, content: action.payload }
        case GET_CATEGORIES_ACTION_TYPES.CHANGE_FILTERED_CATEGORIES:
            return { ...state, filteredCategoriesData: action.payload }
        default:
            return state;
    }
};

export default getCategoriesReducer;