export const GET_USERS_INITIAL_STATE = {
    loading: false,
    usersData: {},
    error: false,
    errorData: {},
    page: 0,
    size: 10,
    content: '',
    paginationList: [], 
};

export const GET_USERS_ACTION_TYPES = {
    FETCH_START: "FETCH_START",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_ERROR: "FETCH_ERROR",
    CHANGE_PAGE: "CHANGE_PAGE",
    CHANGE_SIZE: "CHANGE_SIZE",
    CHANGE_CONTENT: "CHANGE_CONTENT",
    PAGINATION_LIST_CHANGE: "PAGINATION_LIST_CHANGE"
}

export const getUsersReducer = (state = GET_USERS_INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_USERS_ACTION_TYPES.FETCH_START:
            return { ...state, loading: true, error: false, };
        case GET_USERS_ACTION_TYPES.FETCH_SUCCESS:
            return { ...state, loading: false, error: false, usersData: action.payload, };
        case GET_USERS_ACTION_TYPES.FETCH_ERROR:
            return { ...state, loading: false, error: true, errorData: action.payload };
        case GET_USERS_ACTION_TYPES.CHANGE_CONTENT:
            return { ...state, content: action.payload }
        case GET_USERS_ACTION_TYPES.CHANGE_SIZE:
            return { ...state, size: action.payload }
        case GET_USERS_ACTION_TYPES.CHANGE_PAGE:
            return { ...state, page: action.payload }
        case GET_USERS_ACTION_TYPES.PAGINATION_LIST_CHANGE:
            return { ...state, paginationList: action.payload }
        default:
            return state;
    }
};



